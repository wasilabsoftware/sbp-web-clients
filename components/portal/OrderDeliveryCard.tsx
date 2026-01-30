import { MapPin, User, Phone } from "lucide-react";
import { Order } from "@/types/order";

interface OrderDeliveryCardProps {
  order: Order;
}

export function OrderDeliveryCard({ order }: OrderDeliveryCardProps) {
  const handleCall = () => {
    window.open(`tel:${order.customer.phone.replace(/\s/g, "")}`, "_self");
  };

  return (
    <div className="bg-bg-surface rounded-xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col gap-5">
        {/* Delivery Address Header */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-berry-red-light flex items-center justify-center">
            <MapPin className="w-[22px] h-[22px] text-berry-red" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-base font-semibold text-text-primary">
              Dirección de entrega
            </span>
            <span className="text-[13px] font-medium text-berry-green">
              {order.shippingType}
            </span>
          </div>
        </div>

        {/* Address */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {order.address.fullAddress}
        </p>

        {/* Divider */}
        <div className="h-px bg-border-subtle w-full" />

        {/* Customer Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-bg-muted flex items-center justify-center">
            <User className="w-[22px] h-[22px] text-text-secondary" />
          </div>
          <div className="flex flex-col gap-0.5 flex-1">
            <span className="text-[15px] font-semibold text-text-primary">
              {order.customer.name}
            </span>
            <span className="text-[13px] font-medium text-text-tertiary">
              {order.customer.phone}
            </span>
          </div>
          <button
            onClick={handleCall}
            className="w-11 h-11 rounded-full bg-whatsapp flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            <Phone className="w-5 h-5 text-text-inverse" />
          </button>
        </div>
      </div>
    </div>
  );
}
