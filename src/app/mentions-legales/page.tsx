import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { site, legal } from "@/config/site";

export const metadata: Metadata = { title: "Mentions légales", alternates: { canonical: "/mentions-legales" } };

export default function Page() {
  const rows = [["Éditeur", legal.publisher], ["Statut", legal.status], ["SIRET", legal.siret], ["Adresse", legal.address], ["Contact", legal.email]].filter(([, v]) => v);
  const arts: [string, string][] = [
    ["Directeur de la publication", legal.publisher || "Voir l'éditeur ci-dessus."],
    ["Hébergement", "Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis."],
    ["Avis affichés", "Les avis de la page d'accueil proviennent d'acheteurs d'un article similaire vendu sur une autre plateforme. Ils ne concernent pas directement ce produit."],
    ["Propriété intellectuelle", `Les textes, images et éléments de ${site.brand} sont protégés. Toute reproduction sans autorisation est interdite.`],
  ];
  return (
    <LegalPage title="Mentions légales">
      {rows.length > 0 && <section><h2>Éditeur du site</h2><dl className="specs legal-dl">{rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl></section>}
      {arts.map(([t, p]) => (<section key={t}><h2>{t}</h2><p>{p}</p></section>))}
    </LegalPage>
  );
}
