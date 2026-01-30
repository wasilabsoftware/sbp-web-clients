# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Super Berries Peru - Development Rules
## Next.js App Router | E-commerce Architecture

---

## Build and Development Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Production build (detects RSC errors)
npm run start        # Run production server
npm run lint         # Run ESLint
npm run type-check   # tsc --noEmit

# Database (Prisma)
npx prisma studio    # View data
npx prisma db push   # Sync schema
npx prisma generate  # Regenerate client
```

---

## Project Architecture

**Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Zod, Zustand, Prisma

### Folder Structure

```
src/
├── app/
│   ├── (shop)/                    # Public shop routes
│   │   ├── page.tsx               # Home
│   │   ├── productos/
│   │   │   ├── page.tsx           # Catalog
│   │   │   └── [slug]/page.tsx    # Product detail
│   │   ├── carrito/page.tsx
│   │   └── checkout/
│   │       ├── page.tsx
│   │       └── confirmacion/page.tsx
│   │
│   ├── (portal)/                  # Customer portal (auth required)
│   │   ├── layout.tsx             # Auth guard wrapper
│   │   ├── mi-cuenta/
│   │   │   ├── page.tsx           # Dashboard
│   │   │   ├── pedidos/page.tsx
│   │   │   ├── direcciones/page.tsx
│   │   │   └── perfil/page.tsx
│   │   └── pedido/[id]/page.tsx
│   │
│   ├── (auth)/                    # Authentication
│   │   ├── login/page.tsx
│   │   ├── registro/page.tsx
│   │   └── recuperar/page.tsx
│   │
│   ├── api/                       # API Routes (webhooks & integrations)
│   │   ├── webhooks/
│   │   │   ├── payment/route.ts   # Payment gateway webhook
│   │   │   └── shipping/route.ts  # Courier webhook
│   │   └── revalidate/route.ts    # On-demand revalidation
│   │
│   ├── layout.tsx                 # Root layout
│   ├── not-found.tsx
│   └── error.tsx
│
├── components/
│   ├── ui/                        # Primitives (Button, Input, Modal)
│   ├── shop/                      # Shop components
│   ├── portal/                    # Portal components
│   └── shared/                    # Header, Footer, etc.
│
├── lib/
│   ├── actions/                   # Server Actions
│   │   ├── cart.actions.ts
│   │   ├── checkout.actions.ts
│   │   ├── auth.actions.ts
│   │   └── customer.actions.ts
│   ├── db/                        # Database queries
│   ├── services/                  # External integrations
│   │   ├── payment.service.ts
│   │   └── email.service.ts
│   ├── validations/               # Zod schemas
│   ├── utils/
│   └── auth.ts
│
├── hooks/
│   ├── useCart.ts                 # Cart state (Zustand)
│   ├── useAuth.ts
│   └── useToast.ts
│
├── types/
│   ├── product.ts
│   ├── order.ts
│   ├── customer.ts
│   └── index.ts
│
└── styles/
    └── globals.css
```

---

## Server Actions vs API Routes

| Use Case | Use | Reason |
|----------|-----|--------|
| Add to cart | Server Action | Internal mutation, form submission |
| Update profile | Server Action | Mutation with revalidation |
| Create order | Server Action | Transaction with redirect |
| Payment webhook | API Route | External request, verify signature |
| Shipping webhook | API Route | External request |
| On-demand revalidation | API Route | External trigger with secret |
| Auth callbacks (OAuth) | API Route | External redirects |

**Golden Rule:**
- **Server Actions** → User interacts with YOUR app
- **API Routes** → EXTERNAL services call your app

---

## Server Actions Pattern

```typescript
// lib/actions/cart.actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

type ActionResult<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function addToCart(
  prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  try {
    // 1. Validate input with Zod
    // 2. Get/create cart
    // 3. Execute logic
    // 4. Revalidate cache
    revalidatePath('/carrito');
    return { success: true, data: undefined };
  } catch (error) {
    console.error('addToCart error:', error);
    return { success: false, error: 'Error al agregar producto' };
  }
}
```

Usage in components:
```tsx
'use client';
import { useActionState } from 'react';
import { addToCart } from '@/lib/actions/cart.actions';

const [state, formAction, pending] = useActionState(addToCart, { success: false, error: '' });
```

---

## API Routes Pattern (Webhooks)

```typescript
// app/api/webhooks/payment/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Get raw body for signature verification
    const body = await request.text();
    const signature = headers().get('x-payment-signature');

    // 2. Verify authenticity (CRITICAL)
    const isValid = verifyWebhookSignature(body, signature);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // 3. Parse and process
    // 4. Return 200 OK (important for webhooks)
    return NextResponse.json({ received: true });
  } catch (error) {
    // Return 200 to avoid infinite retries (log for debug)
    return NextResponse.json({ received: true, error: 'Processing error' });
  }
}

export const runtime = 'nodejs';
```

---

## Cart Architecture (Hybrid Guest + Logged)

- **Guest users:** localStorage via Zustand persist
- **Logged users:** Server-side DB with `syncWithServer()` on login
- Use Zustand store in `hooks/useCart.ts`

---

## Data Fetching Pattern

Use `unstable_cache` for catalog data:

```typescript
// lib/db/products.ts
import { unstable_cache } from 'next/cache';

export const getProducts = unstable_cache(
  async (filters?: { category?: string }) => {
    return db.product.findMany({ ... });
  },
  ['products'],
  { revalidate: 60 * 5, tags: ['products'] }
);
```

---

## Strict Rules

### NEVER
1. Expose API keys in client (only `NEXT_PUBLIC_*` for public ones)
2. Trust client data without server validation
3. Use `'use client'` on full pages (only on components that need it)
4. Fetch in client components for initial data (use RSC)
5. Store sensitive data in localStorage (tokens, cards)
6. Process payments without verifying webhook signature
7. Hardcode prices in frontend

### ALWAYS
1. Validate with Zod in Server Actions and API Routes
2. Use `revalidatePath/revalidateTag` after mutations
3. Handle loading and error states in UI
4. Implement rate limiting on public endpoints
5. Sanitize inputs shown in UI
6. Use transactions for multi-table operations (orders)
7. Log errors with useful context

---

## Environment Variables

```bash
# .env.local (DO NOT COMMIT)

# Database
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="..."
AUTH_URL="http://localhost:3000"

# Payment Gateway
PAYMENT_API_URL="https://api.pasarela.com"
PAYMENT_API_KEY="sk_live_..."
PAYMENT_SECRET="whsec_..."

# Public
NEXT_PUBLIC_URL="http://localhost:3000"
NEXT_PUBLIC_PAYMENT_PUBLIC_KEY="pk_live_..."

# Revalidation
REVALIDATE_SECRET="..."

# Email
SMTP_HOST="..."
SMTP_USER="..."
SMTP_PASS="..."
EMAIL_FROM="hola@superberriesperu.com"
```

---

## Implementation Response Template

```markdown
## Implementación: [Feature]

**Tipo:** Server Action | API Route | Component | Page

**Archivos:**
- `lib/actions/[name].actions.ts`
- `components/[scope]/[Component].tsx`

**Validación:** [Zod Schema]

**Flujo:**
1. Usuario hace X
2. Se ejecuta Y
3. Se revalida Z

**Consideraciones de seguridad:**
- [Puntos relevantes]
```

---

## References

- [Next.js App Router Docs](https://nextjs.org/docs/app)
- [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Data Fetching Patterns](https://nextjs.org/docs/app/building-your-application/data-fetching/patterns)
