import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, legal } from "@/config/site";

export const metadata: Metadata = { title: "Politique de confidentialité", alternates: { canonical: "/confidentialite" } };

export default function Page() {
  const contact = legal.email || "l'adresse indiquée dans les mentions légales";
  const arts: [string, string][] = [
    ["Responsable du traitement", `${legal.publisher || site.brand}${legal.address ? ", " + legal.address : ""}. Contact : ${contact}.`],
    ["Données collectées", "Pour une commande : nom, prénom, e-mail, adresse de livraison, téléphone (facultatif) et informations de paiement traitées par PayPal. Une mesure d'audience anonyme (Vercel Analytics) est utilisée."],
    ["Finalités et base légale", "Traiter et livrer votre commande, vous envoyer la confirmation et assurer le service après-vente (exécution du contrat), et respecter nos obligations comptables et légales."],
    ["Destinataires", "PayPal (paiement), notre prestataire d'envoi d'e-mails, le transporteur chargé de la livraison, et notre hébergeur Vercel. Vos données ne sont pas vendues."],
    ["Durée de conservation", "Le temps nécessaire à la commande et au service après-vente, puis pendant les durées légales de conservation des pièces comptables."],
    ["Vos droits", `Vous pouvez demander l'accès, la rectification, l'effacement ou la limitation de vos données, et vous opposer à leur traitement, en écrivant à ${contact}. Vous pouvez aussi saisir la CNIL (cnil.fr).`],
  ];
  return (
    <LegalPage title="Politique de confidentialité">
      {arts.map(([t, p]) => (<section key={t}><h2>{t}</h2><p>{p}</p></section>))}
    </LegalPage>
  );
}
