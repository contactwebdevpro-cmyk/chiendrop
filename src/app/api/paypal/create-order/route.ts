import { product, site } from "@/config/site";
import { parseOrder, paypal, totals } from "@/lib/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const o = parseOrder(await req.json().catch(() => null));
  if (!o) return Response.json({ error: "Informations invalides." }, { status: 400 });
  const t = totals(o.quantity), cur = product.currency;
  try {
    const order = await paypal("/v2/checkout/orders", {
      intent: "CAPTURE",
      purchase_units: [{
        description: product.name.slice(0, 120),
        amount: { currency_code: cur, value: t.total, breakdown: { item_total: { currency_code: cur, value: t.item }, shipping: { currency_code: cur, value: t.ship } } },
        items: [{ name: product.name.slice(0, 120), quantity: String(o.quantity), unit_amount: { currency_code: cur, value: t.unit }, category: "PHYSICAL_GOODS" }],
        shipping: { type: "SHIPPING", name: { full_name: `${o.firstName} ${o.lastName}` }, address: { address_line_1: o.line1, ...(o.line2 ? { address_line_2: o.line2 } : {}), admin_area_2: o.city, postal_code: o.postalCode, country_code: o.country } },
      }],
      application_context: { brand_name: site.brand, locale: "fr-FR", shipping_preference: "SET_PROVIDED_ADDRESS", user_action: "PAY_NOW" },
    });
    return Response.json({ id: order.id });
  } catch (e) {
    console.error("create-order :", e);
    return Response.json({ error: "Paiement momentanément indisponible." }, { status: 502 });
  }
}
