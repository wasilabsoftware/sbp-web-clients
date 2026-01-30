import Image from "next/image";
import { OrderProduct } from "@/types/order";

interface OrderProductsTableProps {
  products: OrderProduct[];
}

export function OrderProductsTable({ products }: OrderProductsTableProps) {
  return (
    <div className="bg-bg-surface rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5">
        <h3 className="text-lg font-semibold text-text-primary">
          Productos del pedido
        </h3>
        <span className="text-sm font-medium text-text-tertiary">
          {products.length} {products.length === 1 ? "artículo" : "artículos"}
        </span>
      </div>

      {/* Table Header */}
      <div className="flex items-center bg-bg-muted px-7 py-3">
        <span className="text-xs font-semibold text-text-tertiary flex-1">
          Producto
        </span>
        <span className="text-xs font-semibold text-text-tertiary w-[100px] text-center">
          Cantidad
        </span>
        <span className="text-xs font-semibold text-text-tertiary w-[120px] text-right">
          Precio Unit.
        </span>
        <span className="text-xs font-semibold text-text-tertiary w-[120px] text-right">
          Total
        </span>
      </div>

      {/* Product Rows */}
      {products.map((product, index) => (
        <div key={product.id}>
          <div className="flex items-center px-7 py-4">
            {/* Product Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold text-text-primary">
                  {product.name}
                </span>
                <span className="text-[13px] text-text-tertiary">
                  {product.description}
                </span>
              </div>
            </div>

            {/* Quantity */}
            <span className="text-[15px] font-medium text-text-primary w-[100px] text-center">
              {product.quantity}
            </span>

            {/* Unit Price */}
            <span className="text-[15px] font-medium text-text-secondary w-[120px] text-right">
              S/ {product.unitPrice.toFixed(2)}
            </span>

            {/* Total */}
            <span className="text-[15px] font-semibold text-text-primary w-[120px] text-right">
              S/ {product.total.toFixed(2)}
            </span>
          </div>

          {/* Divider (except last item) */}
          {index < products.length - 1 && (
            <div className="h-px bg-border-subtle mx-7" />
          )}
        </div>
      ))}
    </div>
  );
}
