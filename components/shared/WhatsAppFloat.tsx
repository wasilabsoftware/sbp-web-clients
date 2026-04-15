"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/51952805608?text=Hola%2C%20quiero%20hacer%20un%20pedido"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 lg:bottom-8 z-50 flex items-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all group"
    >
      <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6" />
      <span className="hidden lg:inline text-sm font-semibold">
        WhatsApp
      </span>
    </a>
  );
}
