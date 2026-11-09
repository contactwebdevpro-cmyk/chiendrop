import { site, product, priceLabel, specs } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.brand}

> Boutique en ligne : la ${product.name.toLowerCase()}. ${product.description}

## Produit
- Nom : ${product.name}
- Prix indicatif : ${priceLabel} TTC
- État : ${product.condition}
- Achat : commande directe sur ce site, paiement par PayPal

## Caractéristiques
${specs.map(([k, v]) => `- ${k} : ${v}`).join("\n")}

## Liens
- Page produit : ${site.url}/
- Sitemap : ${site.url}/sitemap.xml
- Conditions générales de vente : ${site.url}/cgv

## Précisions
- Livraison en France ; 14 jours pour se rétracter (voir les CGV).
- Les avis affichés viennent d'acheteurs d'un article similaire vendu sur une autre plateforme, pas de clients de la boutique.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
