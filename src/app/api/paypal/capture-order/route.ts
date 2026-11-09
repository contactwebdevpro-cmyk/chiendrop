import { product, shop, site } from "@/config/site";
import { esc, parseOrder, paypal, sendMail } from "@/lib/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const o = parseOrder(body);
  const orderID = typeof body?.orderID === "string" ? body.orderID : "";
  if (!o || !/^[A-Za-z0-9-]{10,40}$/.test(orderID)) return Response.json({ error: "Requête invalide." }, { status: 400 });
  try {
    const cap = await paypal(`/v2/checkout/orders/${orderID}/capture`);
    const unit = cap.purchase_units?.[0];
    const capture = unit?.payments?.captures?.[0];
    // Rien n'est envoyé tant que le paiement n'est pas confirmé par PayPal.
    if (cap.status !== "COMPLETED" || capture?.status !== "COMPLETED") return Response.json({ error: "Paiement non confirmé." }, { status: 402 });
    const a = unit.shipping?.address ?? {};
    const amount = `${capture.amount.value} ${capture.amount.currency_code}`;
    const addr = [a.address_line_1, a.address_line_2, `${a.postal_code ?? ""} ${a.admin_area_2 ?? ""}`.trim(), a.country_code].filter(Boolean).join("<br>");
    const row = (k: string, v: string) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${k}</td><td style="padding:4px 0"><b>${v}</b></td></tr>`;
    const html = `<h2>Nouvelle commande payée</h2><table>${row("Montant reçu", esc(amount))}${row("Quantité", String(o.quantity))}${row("Client", esc(`${o.firstName} ${o.lastName}`))}${row("E-mail", esc(o.email))}${row("Téléphone", esc(o.phone || "non renseigné"))}${row("Adresse de livraison", addr.split("<br>").map(esc).join("<br>"))}${row("Commande PayPal", esc(orderID))}${row("Transaction", esc(capture.id))}</table>`;
    const owner = await sendMail(process.env.ORDER_NOTIFY_EMAIL ?? "", `Nouvelle commande ${site.brand} : ${amount}`, html, o.email);
    await sendMail(o.email, `Votre commande ${site.brand} est confirmée`, `<p>Bonjour ${esc(o.firstName)},</p><p>Merci pour votre commande de ${o.quantity} × ${esc(product.name)} (${esc(amount)}).</p><p>Livraison à : <br>${addr.split("<br>").map(esc).join("<br>")}</p><p>Délai de livraison estimé : ${esc(shop.deliveryDelay)}. Vous disposez de 14 jours après réception pour vous rétracter (voir les CGV : ${site.url}/cgv). Référence : ${esc(orderID)}.</p>`);
    if (!owner) console.error("ALERTE : paiement reçu mais e-mail propriétaire non envoyé. Commande PayPal", orderID);
    return Response.json({ ok: true });
  } catch (e) {
    console.error("capture-order :", e);
    return Response.json({ error: "Le paiement n'a pas pu être finalisé. Vérifiez votre compte PayPal avant de réessayer, ou contactez-nous." }, { status: 502 });
  }
}
