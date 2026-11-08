import type { Metadata } from "next";
import { site, product, legal } from "@/config/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/mentions-legales" },
};

export default function Legal() {
  const rows = [["Éditeur", legal.publisher], ["Statut", legal.status], ["SIRET", legal.siret], ["Adresse", legal.address], ["Contact", legal.email]].filter(([, v]) => v);
  return (
    <main className="wrap section legal">
      <a href="/" title="Retour à l'accueil" className="textlink">← Retour à {site.brand}</a>
      <h1>Mentions légales</h1>
      {rows.length > 0 && (
        <section>
          <h2>Éditeur du site</h2>
          <dl className="specs legal-dl">{rows.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}</dl>
        </section>
      )}
      <section>
        <h2>Nature du site</h2>
        <p>{site.brand} est une vitrine de présentation de la {product.name.toLowerCase()}. Le site ne vend pas en direct : la commande, le paiement et la livraison sont assurés par le vendeur sur eBay, selon les conditions de l&apos;annonce.</p>
      </section>
      <section>
        <h2>Avis affichés</h2>
        <p>Les avis présentés sur la page d&apos;accueil proviennent d&apos;acheteurs d&apos;un article similaire vendu sur une autre plateforme. Ils ne concernent pas directement ce produit ni cette boutique.</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
      </section>
      <section>
        <h2>Données personnelles</h2>
        <p>Ce site ne comporte aucun formulaire ni compte client. Une mesure d&apos;audience anonyme (Vercel Analytics) est utilisée. Le paiement et les données de commande sont traités par eBay, selon sa propre politique de confidentialité.</p>
      </section>
    </main>
  );
}
