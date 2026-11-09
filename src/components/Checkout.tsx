"use client";
import { useEffect, useRef, useState } from "react";
import { product, shop } from "@/config/site";

declare global { interface Window { paypal?: any } } // eslint-disable-line @typescript-eslint/no-explicit-any

const euro = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: product.currency }).format(n);
const empty = { quantity: 1, firstName: "", lastName: "", email: "", phone: "", line1: "", line2: "", postalCode: "", city: "", country: shop.countries[0].code, cgv: false };
type Form = typeof empty;

function validate(x: Form) {
  const e: Record<string, string> = {};
  if (!x.firstName.trim()) e.firstName = "Prénom requis";
  if (!x.lastName.trim()) e.lastName = "Nom requis";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x.email.trim())) e.email = "E-mail invalide";
  if (!x.line1.trim()) e.line1 = "Adresse requise";
  if (x.country === "FR" ? !/^\d{5}$/.test(x.postalCode.trim()) : !x.postalCode.trim()) e.postalCode = "Code postal invalide";
  if (!x.city.trim()) e.city = "Ville requise";
  if (!x.cgv) e.cgv = "Acceptation des CGV requise";
  return e;
}

export default function Checkout() {
  const [f, setF] = useState<Form>(empty);
  const [showErr, setShowErr] = useState(false);
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const cur = useRef(f);
  cur.current = f;
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const errs = validate(f);
  const total = product.price * f.quantity + shop.shippingPrice;

  useEffect(() => {
    if (!clientId) return;
    if (window.paypal) { setReady(true); return; }
    const s = document.createElement("script");
    s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=${product.currency}&locale=fr_FR&components=buttons`;
    s.async = true;
    s.onload = () => setReady(true);
    s.onerror = () => setMsg("Le module de paiement n'a pas pu se charger. Désactivez votre bloqueur de publicités puis rechargez la page.");
    document.body.appendChild(s);
  }, [clientId]);

  useEffect(() => {
    if (!ready || !box.current || !window.paypal) return;
    const post = async (url: string, extra: object) => {
      const { cgv, ...order } = cur.current; // eslint-disable-line @typescript-eslint/no-unused-vars
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...order, ...extra }) });
      return { ok: r.ok, data: await r.json().catch(() => ({})) };
    };
    const btn = window.paypal.Buttons({
      style: { layout: "vertical", shape: "pill", label: "pay" },
      onClick: (_d: unknown, a: { resolve: () => Promise<void>; reject: () => Promise<void> }) => {
        if (Object.keys(validate(cur.current)).length) { setShowErr(true); setMsg("Complétez les champs signalés pour continuer."); return a.reject(); }
        setMsg(""); return a.resolve();
      },
      createOrder: async () => {
        const { ok, data } = await post("/api/paypal/create-order", {});
        if (!ok || !data.id) throw new Error(data.error || "Erreur");
        return data.id as string;
      },
      onApprove: async (d: { orderID: string }) => {
        const { ok, data } = await post("/api/paypal/capture-order", { orderID: d.orderID });
        if (!ok) { setMsg(data.error || "Le paiement n'a pas pu être finalisé."); return; }
        setDone(cur.current.email);
      },
      onCancel: () => setMsg("Paiement annulé : aucun montant n'a été débité."),
      onError: () => setMsg("Le paiement n'a pas abouti. Réessayez ou contactez-nous."),
    });
    btn.render(box.current);
    return () => { btn.close?.(); };
  }, [ready]);

  const set = (k: keyof Form, v: string | number | boolean) => setF((p) => ({ ...p, [k]: v }) as Form);
  const input = (k: keyof Form, label: string, auto: string, type = "text") => (
    <label className={`fld${showErr && errs[k] ? " bad" : ""}`}>
      {label}
      <input type={type} value={String(f[k])} autoComplete={auto} aria-invalid={showErr && !!errs[k]} onChange={(e) => set(k, e.target.value)} />
      {showErr && errs[k] && <small role="alert">{errs[k]}</small>}
    </label>
  );

  if (done) return (
    <div className="order-done" role="status">
      <h3>Merci, votre paiement est confirmé</h3>
      <p>Un e-mail de confirmation est envoyé à {done}. Pensez à vérifier vos courriers indésirables. Livraison estimée : {shop.deliveryDelay}.</p>
    </div>
  );

  return (
    <div className="checkout">
      <div className="co-form">
        <div className="fld-row">{input("firstName", "Prénom", "given-name")}{input("lastName", "Nom", "family-name")}</div>
        <div className="fld-row">{input("email", "E-mail", "email", "email")}{input("phone", "Téléphone (facultatif)", "tel", "tel")}</div>
        {input("line1", "Adresse de livraison", "address-line1")}
        {input("line2", "Complément d'adresse (facultatif)", "address-line2")}
        <div className="fld-row">{input("postalCode", "Code postal", "postal-code")}{input("city", "Ville", "address-level2")}</div>
        <p className="note">Livraison en {shop.countries.map((c) => c.name).join(", ")} uniquement.</p>
      </div>
      <aside className="co-sum" aria-label="Récapitulatif">
        <h3>Votre commande</h3>
        <label className="fld">Quantité
          <select value={f.quantity} onChange={(e) => set("quantity", Number(e.target.value))}>
            {Array.from({ length: shop.maxQuantity }, (_, i) => i + 1).map((n) => (<option key={n} value={n}>{n}</option>))}
          </select>
        </label>
        <dl className="sum">
          <div><dt>{f.quantity} × brosse à vapeur</dt><dd>{euro(product.price * f.quantity)}</dd></div>
          <div><dt>Livraison</dt><dd>{shop.shippingPrice > 0 ? euro(shop.shippingPrice) : "Offerte"}</dd></div>
          <div className="tot"><dt>Total TTC</dt><dd>{euro(total)}</dd></div>
        </dl>
        <label className={`chk${showErr && errs.cgv ? " bad" : ""}`}>
          <input type="checkbox" checked={f.cgv} onChange={(e) => set("cgv", e.target.checked)} />
          <span>J&apos;ai lu et j&apos;accepte les <a href="/cgv" target="_blank" rel="noopener" title="Conditions générales de vente">conditions générales de vente</a>.</span>
        </label>
        <p className="note">En cliquant sur le bouton PayPal, vous passez une commande avec obligation de paiement.</p>
        {clientId ? <div ref={box} className="pp" /> : <p className="note">Le paiement en ligne sera disponible très prochainement.</p>}
        {msg && <p className="co-msg" role="alert">{msg}</p>}
      </aside>
    </div>
  );
}
