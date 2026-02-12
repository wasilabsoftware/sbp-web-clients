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
