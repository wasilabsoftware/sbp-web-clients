export interface PaymentConfig {
  merchantId: string;
  checkoutJsUrl: string;
  environment: string;
}

export interface PaymentSession {
  sessionToken: string;
  action: string;
  merchantId: string;
  checkoutJsUrl: string;
  purchaseNumber: string;
  amount: string;
  orderId: string;
  orderNumber: string;
}

export interface AuthorizeResponse {
  success: boolean;
  actionCode: string;
  actionDescription: string;
  order: {
    id: string;
    orderNumber: string;
    status: string;
    totalAmount: string;
  };
  payment?: {
    transactionId: string;
    authorizationCode: string;
    cardBrand: string;
    cardMasked: string;
  };
}

export type CheckoutState =
  | "loading"
  | "ready"
  | "paying"
  | "authorizing"
  | "success"
  | "error";

// ─── Izipay (Lyra Krypton / api.micuentaweb.pe) ─────────────────────────────
// SDK uses kr-payment-form.min.js loaded from staticBase. Browser obtains a
// `formToken` from our backend and hands it to KR.setFormConfig + KR.attachForm.
// See api/docs/izipay/MAIN.md.

/** What the backend returns from POST /api/v1/izipay/session. */
export interface IzipaySession {
  formToken: string;
  publicKey: string;
  staticBase: string;
  language: string;
  orderId: string;
  orderNumber: string;
  amount: string;
}

/** What the SDK passes to KR.onSubmit when the user submits the form. */
export interface KrPaymentData {
  rawClientAnswer: string;
  hash: string;
  clientAnswer: {
    orderStatus: string;
    orderDetails: { orderId: string; orderCurrency: string; orderTotalAmount: number };
    transactions: Array<{ uuid: string; [k: string]: unknown }>;
    [k: string]: unknown;
  };
}

/** Body we POST to /api/v1/izipay/validate after KR.onSubmit fires. */
export interface IzipayCallbackBody {
  "kr-answer": string;
  "kr-hash": string;
}

/** What /api/v1/izipay/validate returns. */
export interface IzipayValidateResponse {
  success: boolean;
  orderStatus: string;
  detailedErrorCode: string | null;
  messageUser: string;
  order: { id: string; orderNumber: string; paymentStatus: string } | null;
  payment: {
    transactionUuid: string;
    paymentMethodType: string | null;
    amount: string;
  } | null;
}

/** Minimal typing for KRGlue, loaded dynamically from kr-payment-form.min.js. */
export interface KRInstance {
  setFormConfig: (config: Record<string, unknown>) => Promise<unknown>;
  attachForm: (selector: string) => Promise<{ KR: KRInstance; result: { formId: string } }>;
  showForm: (formId: string) => Promise<unknown>;
  onSubmit: (cb: (data: KrPaymentData) => boolean | Promise<boolean>) => void;
  closePopin: () => void;
}

declare global {
  interface Window {
    KR?: KRInstance;
  }
}
