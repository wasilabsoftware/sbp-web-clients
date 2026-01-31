import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Super Berries Perú - Producto";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Mock products data - same as in page.tsx
const products: Record<string, { name: string; price: number; image: string }> = {
  "fresas-premium": {
    name: "Fresas Premium",
    price: 18.9,
    image: "https://images.unsplash.com/photo-1525604155062-d5b01d84ad81?w=600&q=80",
  },
  "arandanos-frescos": {
    name: "Arándanos Frescos",
    price: 24.9,
    image: "https://images.unsplash.com/photo-1758820609344-b01c8c6b3406?w=600&q=80",
  },
  "moras-silvestres": {
    name: "Moras Silvestres",
    price: 19.9,
    image: "https://images.unsplash.com/photo-1723746546836-85e9857c5d19?w=600&q=80",
  },
  "aguaymanto": {
    name: "Aguaymanto",
    price: 15.9,
    image: "https://images.unsplash.com/photo-1698747789735-011173b068f2?w=600&q=80",
  },
};

export default async function Image({ params }: { params: { slug: string } }) {
  const product = products[params.slug];

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#dc2626",
            color: "white",
            fontSize: 48,
            fontWeight: "bold",
          }}
        >
          Super Berries Perú
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        {/* Product Image */}
        <div
          style={{
            display: "flex",
            width: "50%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Product Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
            padding: "60px",
            backgroundColor: "#ffffff",
          }}
        >
          {/* Brand Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "#fee2e2",
                borderRadius: "9999px",
                padding: "8px 16px",
              }}
            >
              <span
                style={{
                  color: "#dc2626",
                  fontSize: "18px",
                  fontWeight: 600,
                }}
              >
                Berries Premium
              </span>
            </div>
          </div>

          {/* Product Name */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "bold",
              color: "#1f2937",
              margin: "0 0 24px 0",
              lineHeight: 1.1,
            }}
          >
            {product.name}
          </h1>

          {/* Price */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <span
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                color: "#dc2626",
              }}
            >
              S/ {product.price.toFixed(2)}
            </span>
          </div>

          {/* Brand Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "auto",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "#dc2626",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ color: "white", fontSize: "24px", fontWeight: "bold" }}>
                S
              </span>
            </div>
            <span
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#374151",
              }}
            >
              Super Berries Perú
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
