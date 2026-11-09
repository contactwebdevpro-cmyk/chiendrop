import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, product, shop, legal, priceLabel } from "@/config/site";

export const metadata: Metadata = { title: "Conditions générales de vente", alternates: { canonical: "/cgv" } };

export default function Page() {
  const seller = [legal.publisher, legal.status, legal.siret && `SIRET ${legal.siret}`, legal.address, legal.email].filter(Boolean).join(", ");
  const countries = shop.countries.map((c) => c.name).join(", ");
  const arts: [string, string][] = [
    ["1. Vendeur", `Le site ${site.url} est exploité par : ${seller || "voir les mentions légales"}.`],
    ["2. Produit et prix", `Le produit vendu est : ${product.name} (${product.condition.toLowerCase()}). Prix : ${priceLabel} TTC l'unité. ${shop.shippingPrice > 0 ? `Frais de livraison : ${shop.shippingPrice.toFixed(2).replace(".", ",")} € par commande.` : "Livraison offerte."}${legal.vatNote ? " " + legal.vatNote + "." : ""} Le prix applicable est celui affiché au moment de la commande.`],
    ["3. Commande", "La commande est conclue lorsque le client valide le paiement via PayPal, après avoir accepté les présentes conditions. Cette validation constitue une commande avec obligation de paiement. Une confirmation est envoyée par e-mail."],
    ["4. Paiement", "Le paiement est effectué en ligne et immédiatement via PayPal. Le vendeur n'a pas accès aux données bancaires du client et ne les conserve pas."],
    ["5. Livraison", `Livraison en ${countries} à l'adresse indiquée par le client. Délai indicatif : ${shop.deliveryDelay} à compter de la commande. En l'absence d'indication contraire, le produit est livré au plus tard 30 jours après la commande. Le client vérifie le colis à la réception et signale toute anomalie par e-mail.`],
    ["6. Droit de rétractation", `Le client consommateur dispose de 14 jours à compter de la réception du produit pour se rétracter sans motif, en notifiant sa décision de façon claire par e-mail${legal.email ? " à " + legal.email : ""}. Le produit doit être renvoyé dans les 14 jours suivant cette notification, en bon état. Les frais de retour sont à la charge du client. Le vendeur rembourse le client, y compris les frais de livraison standard, au plus tard 14 jours après avoir reçu la notification, et peut différer le remboursement jusqu'à réception du produit.`],
    ["7. Garanties légales", "Le vendeur est tenu de la garantie légale de conformité (articles L.217-3 et suivants du Code de la consommation, 2 ans à compter de la délivrance) et de la garantie des vices cachés (articles 1641 et suivants du Code civil). Le client peut contacter le vendeur par e-mail pour les faire valoir."],
    ["8. Données personnelles", "Les données collectées servent à traiter et livrer la commande. Pour en savoir plus, consultez la politique de confidentialité."],
    ["9. Médiation", legal.mediator ? `En cas de litige non résolu par une réclamation écrite au vendeur, le client consommateur peut recourir gratuitement au médiateur de la consommation : ${legal.mediator}${legal.mediatorUrl ? " (" + legal.mediatorUrl + ")" : ""}.` : "Le client consommateur peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu."],
    ["10. Droit applicable", "Les présentes conditions sont soumises au droit français."],
  ];
  return (
    <LegalPage title="Conditions générales de vente">
      {arts.map(([t, p]) => (<section key={t}><h2>{t}</h2><p>{p}</p></section>))}
    </LegalPage>
  );
}
