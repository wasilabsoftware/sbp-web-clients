"use client";

import { useState } from "react";
import {
  MessageCircle,
  Send,
  ShoppingBag,
  Building2,
  UtensilsCrossed,
  Globe,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactTypes = [
  { value: "pedido", label: "Quiero hacer un pedido", icon: ShoppingBag },
  { value: "b2b", label: "Soy empresa (B2B)", icon: Building2 },
  { value: "horeca", label: "Restaurante / Hotel (HORECA)", icon: UtensilsCrossed },
  { value: "export", label: "Exportación", icon: Globe },
  { value: "otro", label: "Otra consulta", icon: HelpCircle },
];

export function ContactForm() {
  const [tipo, setTipo] = useState("");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  // B2B fields
  const [empresa, setEmpresa] = useState("");
  const [ruc, setRuc] = useState("");
  const [colaboradores, setColaboradores] = useState("");
  // HORECA fields
  const [tipoNegocio, setTipoNegocio] = useState("");
  const [volumen, setVolumen] = useState("");
  // Export fields
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [products, setProducts] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let whatsappMessage = `Hola, me contacto desde la web.\n\n`;
    whatsappMessage += `*Nombre:* ${nombre}\n`;
    if (email) whatsappMessage += `*Email:* ${email}\n`;
    if (telefono) whatsappMessage += `*Teléfono:* ${telefono}\n`;

    switch (tipo) {
      case "pedido":
        whatsappMessage += `\n*Motivo:* Quiero hacer un pedido\n`;
        break;
      case "b2b":
        whatsappMessage += `\n*Motivo:* Consulta B2B\n`;
        if (empresa) whatsappMessage += `*Empresa:* ${empresa}\n`;
        if (ruc) whatsappMessage += `*RUC:* ${ruc}\n`;
        if (colaboradores) whatsappMessage += `*Colaboradores:* ${colaboradores}\n`;
        break;
      case "horeca":
        whatsappMessage += `\n*Motivo:* Consulta HORECA\n`;
        if (tipoNegocio) whatsappMessage += `*Tipo de negocio:* ${tipoNegocio}\n`;
        if (volumen) whatsappMessage += `*Volumen estimado:* ${volumen}\n`;
        break;
      case "export":
        whatsappMessage += `\n*Motivo:* Export inquiry\n`;
        if (company) whatsappMessage += `*Company:* ${company}\n`;
        if (country) whatsappMessage += `*Country:* ${country}\n`;
        if (products) whatsappMessage += `*Products:* ${products}\n`;
        break;
      default:
        whatsappMessage += `\n*Motivo:* Consulta general\n`;
    }

    if (mensaje) whatsappMessage += `\n*Mensaje:* ${mensaje}`;

    const encoded = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/51952805608?text=${encoded}`, "_blank");
  };

  const inputClass =
    "w-full h-12 px-4 rounded-xl border border-border-subtle bg-bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red/20 focus:border-berry-red transition-colors";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Contact Type Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-text-primary">
          ¿Cómo podemos ayudarte?
        </label>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {contactTypes.map((ct) => (
            <button
              key={ct.value}
              type="button"
              onClick={() => setTipo(ct.value)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition-colors ${
                tipo === ct.value
                  ? "border-berry-red bg-berry-red-light"
                  : "border-border-subtle hover:border-berry-red/30"
              }`}
            >
              <ct.icon
                className={`w-5 h-5 ${
                  tipo === ct.value ? "text-berry-red" : "text-text-tertiary"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  tipo === ct.value ? "text-berry-red" : "text-text-secondary"
                }`}
              >
                {ct.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Common Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-primary">Nombre *</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre completo"
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-text-primary">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-primary">Teléfono</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+51 999 999 999"
          className={inputClass}
        />
      </div>

      {/* B2B Fields */}
      {tipo === "b2b" && (
        <div className="flex flex-col gap-4 p-4 bg-bg-muted rounded-xl">
          <p className="text-sm font-semibold text-text-primary">Datos de la empresa</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
              placeholder="Nombre de la empresa"
              className={inputClass}
            />
            <input
              type="text"
              value={ruc}
              onChange={(e) => setRuc(e.target.value)}
              placeholder="RUC"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            value={colaboradores}
            onChange={(e) => setColaboradores(e.target.value)}
            placeholder="Número de colaboradores"
            className={inputClass}
          />
        </div>
      )}

      {/* HORECA Fields */}
      {tipo === "horeca" && (
        <div className="flex flex-col gap-4 p-4 bg-bg-muted rounded-xl">
          <p className="text-sm font-semibold text-text-primary">Datos del negocio</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              value={tipoNegocio}
              onChange={(e) => setTipoNegocio(e.target.value)}
              placeholder="Tipo (restaurante, hotel, café, etc.)"
              className={inputClass}
            />
            <input
              type="text"
              value={volumen}
              onChange={(e) => setVolumen(e.target.value)}
              placeholder="Volumen estimado semanal"
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Export Fields */}
      {tipo === "export" && (
        <div className="flex flex-col gap-4 p-4 bg-bg-muted rounded-xl">
          <p className="text-sm font-semibold text-text-primary">Company Information</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className={inputClass}
            />
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              className={inputClass}
            />
          </div>
          <input
            type="text"
            value={products}
            onChange={(e) => setProducts(e.target.value)}
            placeholder="Products of interest"
            className={inputClass}
          />
        </div>
      )}

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-text-primary">Mensaje</label>
        <textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Cuéntanos más sobre lo que necesitas..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-bg-surface text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-berry-red/20 focus:border-berry-red transition-colors resize-none"
        />
      </div>

      {/* Submit */}
      <div className="flex flex-col lg:flex-row gap-3">
        <Button
          variant="whatsapp"
          size="lg"
          type="submit"
          className="w-full lg:w-auto h-[52px] justify-center"
        >
          <MessageCircle className="w-5 h-5" />
          Enviar por WhatsApp
        </Button>
      </div>
    </form>
  );
}
