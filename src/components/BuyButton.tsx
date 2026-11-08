import { product, priceLabel } from "@/config/site";

type Props = { label?: string; variant?: "solid" | "ghost"; showPrice?: boolean };

export default function BuyButton({ label = "Acheter sur eBay", variant = "solid", showPrice = false }: Props) {
  return (
    <a
      className={`btn btn-${variant}`}
      href={product.ebayUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}, ${priceLabel}. Vous serez redirigé vers eBay pour le paiement.`}
    >
      <span>{label}</span>
      {showPrice && <span className="btn-price">{priceLabel}</span>}
    </a>
  );
}
