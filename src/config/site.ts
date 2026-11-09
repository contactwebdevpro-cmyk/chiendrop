/**
 * Point unique de configuration : modifiez ici le nom, le prix, les frais de livraison, les mentions légales et les textes clés.
 */
export const site = {
  brand: "Patte Douce",
  tagline: "Toilettage à la vapeur pour chiens et chats",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pattedouce.vercel.app",
  locale: "fr_FR",
};

/** Vente directe : à vérifier et ajuster avant la mise en ligne. */
export const shop = {
  shippingPrice: 0, // frais de port TTC par commande (0 = livraison offerte)
  deliveryDelay: "5 à 10 jours ouvrés", // délai annoncé au client (à confirmer)
  countries: [{ code: "FR", name: "France" }],
  maxQuantity: 5,
};

export const product = {
  name: "Brosse à vapeur blanche pour chien et chat",
  shortName: "Brosse à vapeur",
  price: 23.21, // prix TTC unitaire (à ajuster)
  currency: "EUR",
  condition: "Neuf",
  sku: "brosse-vapeur-blanche",
  // Vidéo de démonstration (optionnelle) : ajoutez public/videos/demo.mp4 puis mettez "/videos/demo.mp4"
  video: "" as string,
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
  { q: "Quelle est l'autonomie et le temps de charge ?", a: "Ces données ne sont pas précisées dans notre fiche produit. Si c'est important pour vous, écrivez-nous avant de commander (adresse dans les mentions légales)." },
  { q: "Où se fait le paiement ?", a: "Directement sur ce site, avec PayPal (votre compte PayPal ou, selon les cas, votre carte bancaire). Nous ne voyons ni ne stockons vos données bancaires." },
  { q: "Quelles sont les conditions de livraison et de retour ?", a: "Livraison en France sous 5 à 10 jours ouvrés. Vous disposez de 14 jours après réception pour vous rétracter : tout est détaillé dans les conditions générales de vente." },
  { q: "Mon animal risque-t-il d'avoir peur de la vapeur ?", a: "La vapeur est douce, mais certains animaux la trouvent inhabituelle au début, comme le note un acheteur d'une brosse similaire. Laissez-le renifler la brosse, commencez par quelques passages et récompensez-le." },
];

/**
 * Avis d'acheteurs d'un ARTICLE SIMILAIRE (AliExpress), cités tels quels et présentés comme tels sur le site.
 * Quand vous aurez de vrais avis de clients, remplacez ce tableau (et le texte de la section).
 */
export const reviews = [
  { name: "a***w", date: "déc. 2025", rating: 5, text: "Comme pinceau ordinaire, il est tout simplement excellent ! Le chien reste calme et apprécie d'être brossé. Mon chien trouve la vapeur inhabituelle et s'effraie un peu, même si elle est douce." },
  { name: "Acheteur", date: "déc. 2025", rating: 5, text: "Une bonne surprise. J'ai un Akita américain et la brosse est vraiment utile. Une protection rigide pour les poils de la brosse faciliterait le rangement." },
  { name: "E***a", date: "avr. 2026", rating: 4, text: "C'est incroyable la façon dont il élimine les poils et la qualité de la fonction vapeur." },
  { name: "M***l", date: "janv. 2026", rating: 5, text: "C'est parfait pour un berger allemand. Excellent produit." },
];

export const heroPoints = [
  "Aide à retirer les poils détachés",
  "Aide à limiter l'électricité statique",
  "Rechargeable en USB, réservoir d'eau intégré",
];

export const features = [
  { title: "La vapeur de la brosse adoucit chaque passage", text: "Une fine vapeur accompagne chaque passage de brosse. Elle aide aussi à réduire l'électricité statique du pelage pendant le brossage.", image: 1 },
  { title: "Brosse rechargeable en USB, réservoir d'eau intégré", text: "Remplissez le réservoir d'eau intégré, rechargez la brosse en USB : aucune pile à acheter. La poignée ergonomique garde la main détendue.", image: 2 },
  { title: "Brosse anti-poils : les poils détachés restent sur la brosse", text: "Les picots aident à retirer les poils détachés et massent pendant le toilettage. Le système de nettoyage facilite le retrait des poils accumulés.", image: 0 },
];

export const trustItems = [
  { title: "Produit neuf", text: "Une brosse neuve, une unité incluse." },
  { title: "Paiement sécurisé PayPal", text: "Vous payez avec PayPal : nous ne voyons ni ne stockons vos données bancaires." },
  { title: "Protection des achats PayPal", text: "Selon les conditions de PayPal, vous pouvez être remboursé si l'article n'arrive pas ou ne correspond pas." },
  { title: "Livraison et rétractation", text: "Livraison sous 5 à 10 jours ouvrés et 14 jours pour vous rétracter : voir les CGV." },
];

export const guide = [
  { title: "Pourquoi brosser régulièrement", text: "Le brossage retire les poils morts avant qu'ils ne se déposent sur les meubles et les vêtements. Il permet aussi de repérer plus tôt un nœud ou une peau irritée, et c'est un moment calme à partager avec son animal." },
  { title: "Choisir sa brosse de toilettage", text: "Selon la longueur du poil et la sensibilité de l'animal, une brosse à picots, un peigne, une brosse démêlante ou une brosse anti-poils conviennent mieux. Une brosse à vapeur ajoute un peu d'humidité qui aide à calmer l'électricité statique pendant le brossage." },
  { title: "Habituer son animal à la vapeur", text: "Laissez d'abord votre chien ou votre chat renifler la brosse éteinte, puis brossez quelques secondes et récompensez-le. Allongez la durée petit à petit, sans insister si l'animal s'agite." },
  { title: "Entretenir la brosse", text: "Retirez les poils accumulés après chaque séance grâce au système de nettoyage. Rechargez la brosse en USB quand c'est nécessaire et videz le réservoir si vous ne l'utilisez pas pendant un moment." },
];

/** Mentions légales : renseignez ce que vous voulez afficher (seuls les champs remplis apparaissent). */
export const legal = {
  publisher: "", // Nom et prénom (ou raison sociale)
  status: "", // ex. « Micro-entrepreneur »
  siret: "",
  address: "", // adresse de domiciliation
  email: "", // e-mail de contact et de service client
  vatNote: "", // ex. « TVA non applicable, article 293 B du CGI » (micro-entreprise en franchise)
  mediator: "", // nom du médiateur de la consommation
  mediatorUrl: "", // site du médiateur
};

/** Profils sociaux (affichés dans le pied de page et dans les données structurées). Ex. : { name: "TikTok", url: "https://www.tiktok.com/@pattedouce" } */
export const social: { name: string; url: string }[] = [];
