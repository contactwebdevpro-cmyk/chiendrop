import { site, product, priceLabel, specs } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.brand}

> Vitrine de présentation de la ${product.name.toLowerCase()}. ${product.description}

## Produit
- Nom : ${product.name}
- Prix indicatif : ${priceLabel} (voir l'annonce pour le prix à jour)
- État : ${product.condition}
- Achat et paiement : sur eBay, ${product.ebayUrl}

## Caractéristiques
${specs.map(([k, v]) => `- ${k} : ${v}`).join("\n")}

## Liens
- Page produit : ${site.url}/
- Sitemap : ${site.url}/sitemap.xml
- Annonce eBay : ${product.ebayUrl}

## Précisions
- Ce site ne vend pas en direct : le bouton d'achat renvoie vers l'annonce eBay.
- Les avis affichés viennent d'acheteurs d'un article similaire vendu sur une autre plateforme, pas de clients de la boutique.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
