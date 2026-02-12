# Niubiz Payment Integration — Frontend Guide

## API Base URL

```
Staging:    https://your-api.workers.dev
Production: https://api.superberriesperu.com
```

---

## Payment Flow (3 steps)

```
Frontend                          API                           Niubiz
   |                               |                              |
   |  1. POST /payments/session    |                              |
   |  { orderId }                  |---> getSecurityToken() ----->|
   |                               |<--- token ------------------|
   |                               |---> getSessionToken() ----->|
   |                               |<--- sessionKey -------------|
   |<-- { sessionToken, ...}       |                              |
   |                               |                              |
   |  2. Load checkout.js          |                              |
   |     Render card form          |                              |
   |     User enters card data ----|----------------------------->|
   |<-- transactionToken ---------|-------------------------------|
   |                               |                              |
   |  3. POST /payments/authorize  |                              |
   |  { orderId, transactionToken }|---> authorizePayment() ---->|
   |                               |<--- result -----------------|
   |<-- { success, payment }       |                              |
```

---

## Step 0: Create an Order

Before starting the payment flow, you need an order.

### POST /api/v1/orders

**Request:**
```json
POST /api/v1/orders
Content-Type: application/json

{
  "customerId": "uuid-of-customer",
  "subtotalAmount": "75.00",
  "deliveryFee": "10.00",
  "totalAmount": "85.00",
  "deliveryAddress": "Av. Javier Prado 123, San Isidro",
  "deliveryDistrictId": 1,
  "deliveryDate": "2025-01-20T10:00:00Z",
  "orderSource": "web",
  "items": [
    {
      "productId": "uuid-of-product",
      "variantId": "uuid-of-variant",
      "productName": "Fresas Frescas Premium",
      "productSku": "FRESA-FRESCA-1KG",
      "quantity": "2.5",
      "unitPrice": "20.00",
      "totalPrice": "50.00",
      "specialInstructions": "Sin semillas por favor"
    },
    {
      "productId": "uuid-of-product-2",
      "variantId": "uuid-of-variant-2",
      "productName": "Arándanos Frescos",
      "productSku": "ARANDANO-250G",
      "quantity": "1",
      "unitPrice": "25.00",
      "totalPrice": "25.00"
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customerId` | UUID | Yes | Customer ID |
| `subtotalAmount` | string (decimal) | Yes | Subtotal without delivery |
| `deliveryFee` | string (decimal) | No (default `"10.00"`) | Delivery fee |
| `totalAmount` | string (decimal) | Yes | Total to charge |
| `deliveryAddress` | string (min 10) | Yes | Delivery address |
| `deliveryDistrictId` | number | No | District ID |
| `deliveryDate` | ISO datetime | No | Desired delivery date |
| `orderSource` | `"web"` `"whatsapp"` `"instagram"` `"facebook"` `"phone"` | No (default `"web"`) | Order origin |
| `items` | array (min 1) | Yes | Order items |
| `items[].productId` | UUID | Yes | Product ID |
| `items[].variantId` | UUID | Yes | Product variant ID |
| `items[].productName` | string | Yes | Product name |
| `items[].productSku` | string | Yes | Product SKU |
| `items[].quantity` | string (decimal) | Yes | Quantity (kg or units) |
| `items[].unitPrice` | string (decimal) | Yes | Unit price in soles |
| `items[].totalPrice` | string (decimal) | Yes | Line total |
| `items[].specialInstructions` | string | No | Special notes |

**Response (201):**
```json
{
  "id": "generated-uuid",
  "orderNumber": "SBP1707840123ABCDEFG",
  "orderStatus": "pending",
  "paymentStatus": "pending",
  "totalAmount": "85.00",
  "subtotal": "75.00",
  "deliveryFee": "10.00",
  "deliveryAddress": "Av. Javier Prado 123, San Isidro",
  "createdAt": "2025-01-15T15:00:00.000Z"
}
```

> Save the returned `id` — you'll need it for the payment session.

### Full checkout flow (TypeScript)

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// 1. Create the order
async function createOrder(cart: CartData): Promise<string> {
  const res = await fetch(`${API_URL}/api/v1/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customerId: cart.customerId,
      subtotalAmount: cart.subtotal.toFixed(2),
      deliveryFee: cart.deliveryFee.toFixed(2),
      totalAmount: cart.total.toFixed(2),
      deliveryAddress: cart.address,
      deliveryDistrictId: cart.districtId,
      orderSource: 'web',
      items: cart.items.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        productName: item.productName,
        productSku: item.productSku,
        quantity: item.quantity.toFixed(2),
        unitPrice: item.unitPrice.toFixed(2),
        totalPrice: (item.quantity * item.unitPrice).toFixed(2),
      })),
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error creating order');
  }

  const order = await res.json();
  return order.id; // Use this for payment
}

// 2. Then start payment with the orderId
async function checkout(cart: CartData) {
  const orderId = await createOrder(cart);
  await startPayment(orderId); // from payment flow below
}
```

---

## Payment Endpoints

### 1. GET /api/v1/payments/config

Returns public configuration needed to set up the payment form. Call this once on page load.

**Request:**
```
GET /api/v1/payments/config
```

**Response:**
```json
{
  "merchantId": "456879852",
  "checkoutJsUrl": "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true",
  "environment": "sandbox"
}
```

---

### 2. POST /api/v1/payments/session

Creates a payment session for an order. Call this when the user clicks "Pay Now".

**Request:**
```json
POST /api/v1/payments/session
Content-Type: application/json

{
  "orderId": "uuid-of-the-order",
  "channel": "web"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `orderId` | UUID string | Yes | The order to pay |
| `channel` | `"web"` or `"mobile"` | No (default: `"web"`) | Payment channel |

**Response (200):**
```json
{
  "sessionToken": "eyJhbGciOiJSUzI1NiJ9...",
  "merchantId": "456879852",
  "checkoutJsUrl": "https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true",
  "purchaseNumber": "123456789012",
  "amount": "85.50",
  "orderId": "uuid-of-the-order",
  "orderNumber": "SBP1234567890ABCDEFG"
}
```

**Errors:**
- `404` — Order not found
- `400` — Order already paid
- `502` — Niubiz communication error

---

### 3. POST /api/v1/payments/authorize

Authorizes (charges) the card after checkout.js returns a `transactionToken`.

**Request:**
```json
POST /api/v1/payments/authorize
Content-Type: application/json

{
  "orderId": "uuid-of-the-order",
  "transactionToken": "token-from-checkout-js"
}
```

**Response (200) — Approved:**
```json
{
  "success": true,
  "actionCode": "000",
  "actionDescription": "Aprobada y completada",
  "order": {
    "id": "uuid",
    "orderNumber": "SBP1234567890ABCDEFG",
    "status": "paid",
    "totalAmount": "85.50"
  },
  "payment": {
    "transactionId": "990000012345",
    "authorizationCode": "123456",
    "cardBrand": "VISA",
    "cardMasked": "455170******8059"
  }
}
```

**Response (200) — Denied:**
```json
{
  "success": false,
  "actionCode": "116",
  "actionDescription": "Fondos insuficientes",
  "order": {
    "id": "uuid",
    "orderNumber": "SBP1234567890ABCDEFG",
    "status": "failed",
    "totalAmount": "85.50"
  },
  "payment": null
}
```

---

## Frontend Implementation (React/Next.js)

### Step 1: Load checkout.js dynamically

```typescript
function loadCheckoutScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load checkout.js'));
    document.head.appendChild(script);
  });
}
```

### Step 2: Full checkout flow

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PaymentSession {
  sessionToken: string;
  merchantId: string;
  checkoutJsUrl: string;
  purchaseNumber: string;
  amount: string;
  orderId: string;
  orderNumber: string;
}

async function startPayment(orderId: string) {
  // 1. Create session
  const res = await fetch(`${API_URL}/api/v1/payments/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, channel: 'web' }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Error creating payment session');
  }

  const session: PaymentSession = await res.json();

  // 2. Load checkout.js
  await loadCheckoutScript(session.checkoutJsUrl);

  // 3. Open Niubiz payment form
  openNiubizForm(session);
}

function openNiubizForm(session: PaymentSession) {
  const config = {
    sessiontoken: session.sessionToken,
    channel: 'web',
    merchantid: session.merchantId,
    purchasenumber: session.purchaseNumber,
    amount: session.amount,
    expirationminutes: '20',
    timeouturl: `${window.location.origin}/checkout/timeout`,
    merchantlogo: 'https://your-logo-url.com/logo.png',
    formbuttoncolor: '#28a745',
    action: `${window.location.origin}/checkout/result?orderId=${session.orderId}`,
    complete: function (params: { transactionToken: string }) {
      // 4. Authorize the payment
      authorizePayment(session.orderId, params.transactionToken);
    },
  };

  // @ts-ignore - VisanetCheckout is loaded from checkout.js
  VisanetCheckout.configure(config);
  // @ts-ignore
  VisanetCheckout.open();
}

async function authorizePayment(orderId: string, transactionToken: string) {
  const res = await fetch(`${API_URL}/api/v1/payments/authorize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId, transactionToken }),
  });

  const result = await res.json();

  if (result.success) {
    // Payment approved - show success page
    window.location.href = `/checkout/success?order=${result.order.orderNumber}`;
  } else {
    // Payment denied - show error
    alert(`Pago rechazado: ${result.actionDescription} (${result.actionCode})`);
  }
}
```

### Step 3: React component example

```tsx
'use client';
import { useState } from 'react';

export function PayButton({ orderId }: { orderId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setLoading(true);
    setError(null);
    try {
      await startPayment(orderId);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handlePay} disabled={loading}>
        {loading ? 'Procesando...' : 'Pagar con tarjeta'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
```

---

## React Native / Expo (WebView)

For mobile, load the Niubiz payment form inside a WebView:

```tsx
import { WebView } from 'react-native-webview';

function PaymentWebView({ session }: { session: PaymentSession }) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="${session.checkoutJsUrl}"></script>
    </head>
    <body>
      <script>
        VisanetCheckout.configure({
          sessiontoken: '${session.sessionToken}',
          channel: 'mobile',
          merchantid: '${session.merchantId}',
          purchasenumber: '${session.purchaseNumber}',
          amount: '${session.amount}',
          expirationminutes: '20',
          complete: function(params) {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'payment_complete',
              transactionToken: params.transactionToken
            }));
          }
        });
        VisanetCheckout.open();
      </script>
    </body>
    </html>
  `;

  function handleMessage(event: any) {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'payment_complete') {
      // Call POST /api/v1/payments/authorize with data.transactionToken
    }
  }

  return (
    <WebView
      source={{ html }}
      onMessage={handleMessage}
      javaScriptEnabled
    />
  );
}
```

---

## Test Cards (Sandbox)

### Approved

| Brand | Number | Exp | CVV |
|-------|--------|-----|-----|
| VISA | `4551708161768059` | 03/2028 | 111 |
| VISA | `4474118355632240` | 03/2028 | 111 |
| MasterCard | `5160030000000317` | 03/2028 | 111 |
| AMEX | `371064649323968` | 03/2028 | 111 |

### Denied

| Brand | Number | Exp | CVV | Reason |
|-------|--------|-----|-----|--------|
| VISA | `4041650444437904` | 03/2028 | 111 | Insufficient funds (116) |
| VISA | `4539676788512233` | 03/2028 | 111 | Contact issuer (191) |
| MasterCard | `5106248239975235` | 03/2028 | 111 | Fraud (670) |

### Test emails (anti-fraud)
- `accept@sastest.com` — Approved without authentication
- `review@sastest.com` — Triggers Verified by Visa
- `reject@sastest.com` — Denied by fraud system

---

## Action Codes Reference

| Code | Meaning |
|------|---------|
| `000` | Approved |
| `116` | Insufficient funds |
| `129` | Invalid CVV |
| `191` | Contact card issuer |
| `670` | Fraud detected |

---

## Common Issues

| Issue | Solution |
|-------|---------|
| `checkout.js` not loading | Check `checkoutJsUrl` from `/payments/config`. Ensure no CSP blocking. |
| `VisanetCheckout is not defined` | Script hasn't loaded yet. Await `loadCheckoutScript()` before calling. |
| Session expired | Sessions expire after ~20 min. Create a new one with `/payments/session`. |
| `SECURITY_TOKEN_FAILED` | Backend credentials issue. Check `NIUBIZ_USER` / `NIUBIZ_PASSWORD` secrets. |
| Form renders but payment fails | Verify `amount` matches between session and authorize calls. |
