import { product, priceLabel } from "@/config/site";

type Props = { label?: string; variant?: "solid" | "ghost"; showPrice?: boolean };

export default function BuyButton({ label = "Acheter", variant = "solid", showPrice = false }: Props) {
  return (
    <a className={`btn btn-${variant}`} href="#commander" title={`${label} : ${product.name}`} aria-label={`${label}, ${priceLabel}. Aller au formulaire de commande.`}>
      <span>{label}</span>
      {showPrice && <span className="btn-price">{priceLabel}</span>}
    </a>
  );
}
