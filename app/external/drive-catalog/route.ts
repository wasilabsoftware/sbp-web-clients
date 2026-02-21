import { redirect } from "next/navigation";

export async function GET() {
  const response = await fetch(
    "https://sbpapi.wasilabsoftware.com/api/v1/config/EXTERNAL_CATALOG",
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    return new Response("Failed to fetch from external API", {
      status: response.status,
    });
  }

  const data: { value: string } = await response.json();

  redirect(data.value);
}
