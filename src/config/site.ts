/**
 * Point unique de configuration : modifiez ici le nom, le prix, le lien eBay et les textes clés.
 */
export const site = {
  brand: "Brume",
  tagline: "Toilettage à la vapeur pour chiens et chats",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://brume-boutique.vercel.app",
  locale: "fr_FR",
};

export const product = {
  name: "Brosse à vapeur blanche pour chien et chat",
  shortName: "Brosse à vapeur",
  price: 23.21, // ← à ajuster (annonce eBay consultée : 23,21 € dont frais de Protection acheteurs)
  currency: "EUR",
  ebayUrl: "https://www.ebay.fr/itm/860124886603",
  condition: "Neuf",
  sku: "ebay-860124886603",
  description:
    "Brosse de toilettage à vapeur rechargeable en USB, avec réservoir d'eau intégré, poignée ergonomique et picots de massage. Pour chiens et chats.",
  // Photos dans /public/images : ajoutez ou remplacez-les ici.
  images: [
    { src: "/images/produit-blanc.webp", alt: "Brosse à vapeur blanche pour chien et chat, vue de face avec picots de brossage et poignée" },
    { src: "/images/vapeur-chien.webp", alt: "Brosse à vapeur blanche avec jet de vapeur, utilisée sur un chien au pelage long" },
    { src: "/images/vapeur-chat-chien.webp", alt: "Brosse à vapeur blanche avec vapeur, port USB et réservoir, pour chat et chien" },
  ],

};

export const priceLabel = new Intl.NumberFormat("fr-FR", { style: "currency", currency: product.currency }).format(product.price);

export const benefits = [
  { title: "La vapeur adoucit le brossage", text: "Une fine vapeur accompagne chaque passage pour un toilettage plus doux." },
  { title: "Moins d'électricité statique", text: "Aide à limiter les poils qui s'électrisent et se dressent pendant le brossage." },
  { title: "Les poils détachés partent", text: "Aide à retirer les poils détachés, sur le canapé comme sur le pelage." },
  { title: "Un vrai moment massage", text: "Les picots massent pendant le toilettage : chiens et chats y trouvent souvent leur compte." },
];

export const steps = [
  { title: "Remplissez le réservoir", text: "Le réservoir d'eau est intégré à la brosse." },
  { title: "Rechargez en USB", text: "Un simple câble USB suffit, sans pile à changer." },
  { title: "Brossez", text: "Activez la vapeur et brossez dans le sens du poil." },
  { title: "Nettoyez la brosse", text: "Le système de nettoyage facilite le retrait des poils accumulés." },
];

export const specs = [
  ["Produit", "Brosse de toilettage à vapeur"],
  ["Pour", "Chiens et chats"],
  ["Couleur", "Blanc"],
  ["Matière", "Principalement plastique / ABS"],
  ["Alimentation", "Recharge USB"],
  ["Réservoir", "Réservoir d'eau intégré"],
  ["Prise en main", "Poignée ergonomique"],
  ["Contenu", "1 brosse"],
  ["État", "Neuf"],
];

export const faqs = [
  { q: "Cette brosse convient-elle aux chiens et aux chats ?", a: "Oui, elle est conçue pour le toilettage des chiens et des chats." },
  { q: "Comment fonctionne la vapeur ?", a: "Vous remplissez le réservoir d'eau intégré, rechargez la brosse en USB, puis vous brossez : la vapeur accompagne le geste." },
  { q: "Comment nettoyer la brosse ?", a: "Un système facilite le retrait des poils accumulés après le brossage." },
  { q: "Quelle est l'autonomie et le temps de charge ?", a: "Ces données ne sont pas précisées dans l'annonce. Posez la question au vendeur depuis la page eBay avant d'acheter." },
  { q: "Où se fait le paiement ?", a: "Sur eBay. Ce site présente le produit : le bouton d'achat vous redirige vers l'annonce, où vous finalisez la commande et le paiement." },
  { q: "Quelles sont les conditions de livraison et de retour ?", a: "Elles sont affichées sur l'annonce eBay et peuvent évoluer. Consultez-les avant de valider votre achat." },
];

/**
 * Avis d'acheteurs d'un ARTICLE SIMILAIRE (AliExpress), cités tels quels et présentés comme tels sur le site.
 * Quand vous aurez de vrais avis eBay sur votre annonce, remplacez ce tableau (et le texte de la section).
 */
export const reviews = [
  { name: "a***w", date: "déc. 2025", rating: 5, text: "Comme pinceau ordinaire, il est tout simplement excellent ! Le chien reste calme et apprécie d'être brossé. Mon chien trouve la vapeur inhabituelle et s'effraie un peu, même si elle est douce." },
  { name: "Acheteur AliExpress", date: "déc. 2025", rating: 5, text: "Une bonne surprise. J'ai un Akita américain et la brosse est vraiment utile. Une protection rigide pour les poils de la brosse faciliterait le rangement." },
  { name: "E***a", date: "avr. 2026", rating: 4, text: "C'est incroyable la façon dont il élimine les poils et la qualité de la fonction vapeur." },
  { name: "M***l", date: "janv. 2026", rating: 5, text: "C'est parfait pour un berger allemand. Excellent produit." },
];
