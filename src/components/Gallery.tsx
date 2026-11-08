"use client";
import Image from "next/image";
import { useState } from "react";
import { product } from "@/config/site";

export default function Gallery() {
  const [i, setI] = useState(0);
  const cur = product.images[i];
  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image key={cur.src} src={cur.src} alt={cur.alt} fill priority={i === 0} sizes="(max-width: 900px) 100vw, 50vw"
          unoptimized={cur.src.endsWith(".svg")} style={{ objectFit: "cover" }} />
      </div>
      <ul className="thumbs" aria-label="Photos du produit">
        {product.images.map((img, n) => (
          <li key={img.src}>
            <button type="button" onClick={() => setI(n)} aria-label={`Voir la photo ${n + 1}`} aria-current={n === i}>
              <Image src={img.src} alt={`Miniature ${n + 1} : ${img.alt}`} width={96} height={96} unoptimized={img.src.endsWith(".svg")} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
