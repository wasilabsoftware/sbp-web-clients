import type { District } from "@/types/district";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl(): string {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }
  return API_URL;
}

export async function getDistricts(): Promise<District[]> {
  const res = await fetch(`${getApiUrl()}/api/v1/districts`);

  if (!res.ok) {
    throw new Error("Error al obtener los distritos");
  }

  return res.json();
}
