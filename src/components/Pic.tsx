import Image from "next/image";
import { product } from "@/config/site";

export default function Pic({ n, sizes = "(max-width: 900px) 100vw, 33vw" }: { n: number; sizes?: string }) {
  const img = product.images[n];
  return (
    <div className="pic" data-reveal>
      <Image src={img.src} alt={img.alt} fill sizes={sizes} unoptimized={img.src.endsWith(".svg")} style={{ objectFit: "cover" }} />
    </div>
  );
}
