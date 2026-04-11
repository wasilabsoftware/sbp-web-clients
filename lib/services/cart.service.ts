import type { ServerCart, ServerCartItem } from "@/types/cart";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(data.error || `Error ${res.status}`);
  }
  return res.json();
}

export async function getCart(sessionId: string): Promise<ServerCart> {
  const res = await fetch(`${getApiUrl()}/api/v1/cart/${sessionId}`);
  return handleResponse<ServerCart>(res);
}

export async function addItem(
  sessionId: string,
  variantId: string,
  quantity: string,
  specialInstructions?: string
): Promise<ServerCartItem> {
  const res = await fetch(`${getApiUrl()}/api/v1/cart/${sessionId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      variantId,
      quantity,
      ...(specialInstructions && { specialInstructions }),
    }),
  });
  return handleResponse<ServerCartItem>(res);
}

export async function updateItem(
  itemId: string,
  quantity: string,
  specialInstructions?: string
): Promise<ServerCartItem> {
  const res = await fetch(`${getApiUrl()}/api/v1/cart/items/${itemId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quantity,
      ...(specialInstructions !== undefined && { specialInstructions }),
    }),
  });
  return handleResponse<ServerCartItem>(res);
}

export async function removeItem(itemId: string): Promise<void> {
  const res = await fetch(`${getApiUrl()}/api/v1/cart/items/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: "Error de conexión" }));
    throw new Error(data.error || `Error ${res.status}`);
  }
}
