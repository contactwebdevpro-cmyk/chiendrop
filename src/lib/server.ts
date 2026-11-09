import { product, shop, site } from "@/config/site";

const cents = (n: number) => Math.round(n * 100);
const fmt = (c: number) => (c / 100).toFixed(2);

export function totals(q: number) {
  const unit = cents(product.price), item = unit * q, ship = cents(shop.shippingPrice);
  return { unit: fmt(unit), item: fmt(item), ship: fmt(ship), total: fmt(item + ship) };
}

const s = (v: unknown, max = 100) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function parseOrder(b: unknown) {
  if (!b || typeof b !== "object") return null;
  const x = b as Record<string, unknown>;
  const o = { quantity: Number(x.quantity), firstName: s(x.firstName, 60), lastName: s(x.lastName, 60), email: s(x.email, 120), phone: s(x.phone, 25), line1: s(x.line1), line2: s(x.line2), postalCode: s(x.postalCode, 10), city: s(x.city, 60), country: s(x.country, 2) };
  if (!Number.isInteger(o.quantity) || o.quantity < 1 || o.quantity > shop.maxQuantity) return null;
  if (!o.firstName || !o.lastName || !o.line1 || !o.city) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.email)) return null;
  if (!shop.countries.some((c) => c.code === o.country)) return null;
  if (o.country === "FR" && !/^\d{5}$/.test(o.postalCode)) return null;
  return o;
}
export type Order = NonNullable<ReturnType<typeof parseOrder>>;

const API = process.env.PAYPAL_ENV === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";

async function accessToken() {
  const id = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID, secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!id || !secret) throw new Error("PayPal non configuré");
  const r = await fetch(`${API}/v1/oauth2/token`, { method: "POST", headers: { Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"), "Content-Type": "application/x-www-form-urlencoded" }, body: "grant_type=client_credentials", cache: "no-store" });
  if (!r.ok) throw new Error("Authentification PayPal refusée");
  return (await r.json()).access_token as string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function paypal(path: string, body?: unknown): Promise<any> {
  const token = await accessToken();
  const r = await fetch(`${API}${path}`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(body ?? {}), cache: "no-store" });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(JSON.stringify(d).slice(0, 300));
  return d;
}

export const esc = (v: string) => v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function sendMail(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key || !to) { console.error("E-mail non envoyé : RESEND_API_KEY ou destinataire manquant"); return false; }
  const r = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: process.env.ORDER_FROM_EMAIL || `${site.brand} <onboarding@resend.dev>`, to: [to], subject, html, reply_to: replyTo }) });
  if (!r.ok) console.error("Resend :", r.status, await r.text());
  return r.ok;
}
