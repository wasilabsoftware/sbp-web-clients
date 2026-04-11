import type {
  CreateOrderPayload,
  CreateOrderResponse,
  ApiOrdersResponse,
  ApiOrderDetail,
  ApiOrderTracking,
} from "@/types/order";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

function authHeaders(token: string): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function createOrder(
  payload: CreateOrderPayload
): Promise<CreateOrderResponse> {
  const res = await fetch(`${getApiUrl()}/api/v1/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(data.error || "Error al crear la orden");
  }

  return res.json();
}

export async function getOrders(
  token: string,
  params: {
    customerId: string;
    status?: string;
    page?: number;
    limit?: number;
    dateFrom?: string;
    dateTo?: string;
  }
): Promise<ApiOrdersResponse> {
  const searchParams = new URLSearchParams();
  searchParams.set("customerId", params.customerId);
  if (params.status) searchParams.set("status", params.status);
  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.dateFrom) searchParams.set("dateFrom", params.dateFrom);
  if (params.dateTo) searchParams.set("dateTo", params.dateTo);

  const res = await fetch(
    `${getApiUrl()}/api/v1/orders?${searchParams.toString()}`,
    { headers: authHeaders(token) }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(data.error || "Error al obtener los pedidos");
  }

  return res.json();
}

export async function getOrderById(
  token: string,
  orderId: string
): Promise<ApiOrderDetail> {
  const res = await fetch(`${getApiUrl()}/api/v1/orders/${orderId}`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(data.error || "Error al obtener el pedido");
  }

  return res.json();
}

export async function getOrderTracking(
  orderId: string
): Promise<ApiOrderTracking> {
  const res = await fetch(`${getApiUrl()}/api/v1/orders/${orderId}/tracking`);

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(data.error || "Error al obtener el tracking");
  }

  return res.json();
}
