import { site, product, priceLabel, benefits, steps, specs, faqs, reviews } from "@/config/site";
import BuyButton from "@/components/BuyButton";
import Gallery from "@/components/Gallery";
import Pic from "@/components/Pic";
import Motion from "@/components/Motion";
import Steam from "@/components/Steam";

export default function Home() {
  const jsonLd = [
    {
      "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description,
      image: product.images.map((i) => new URL(i.src, site.url).toString()), sku: product.sku,
      brand: { "@type": "Brand", name: site.brand }, itemCondition: "https://schema.org/NewCondition",
      offers: { "@type": "Offer", url: product.ebayUrl, priceCurrency: product.currency, price: product.price.toFixed(2), availability: "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition" },
    },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  return (
    <>
      <a href="#contenu" className="skip">Aller au contenu</a>
      <header className="top">
        <div className="wrap top-in">
          <a href="#" className="logo" aria-label={`${site.brand}, accueil`}>
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><circle cx="9" cy="17" r="7" fill="currentColor"/><circle cx="17" cy="11" r="8" fill="currentColor" opacity=".7"/><circle cx="20" cy="18" r="6" fill="currentColor" opacity=".45"/></svg>
            {site.brand}
          </a>
          <nav aria-label="Navigation principale" className="nav">
            <a href="#fonctionnement">Fonctionnement</a><a href="#details">Détails</a><a href="#faq">FAQ</a>
          </nav>
          <BuyButton label="Acheter" />
        </div>
      </header>

      <main id="contenu">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="kicker">{site.tagline}</p>
            <h1>La brosse qui calme le poil, à la vapeur.</h1>
            <p className="lead">
              {product.description} Elle aide à retirer les poils détachés et à réduire l&apos;électricité statique pendant le brossage.
            </p>
            <div className="buy">
              <p className="price" aria-label={`Prix ${priceLabel}`}>{priceLabel}<small>{product.condition}</small></p>
              <BuyButton label="Acheter maintenant" showPrice />
              <p className="note">Paiement sécurisé finalisé sur eBay, via l&apos;annonce du produit.</p>
            </div>
          </div>
          <Steam />
          <Gallery />
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1].map((k) => (<ul key={k}>{["Vapeur douce", "Recharge USB", "Réservoir intégré", "Poignée ergonomique", "Picots de massage", "Chiens et chats"].map((t) => (<li key={t}>{t}</li>))}</ul>))}</div></div>

        <section className="band" aria-labelledby="h-benefits">
          <div className="wrap">
            <h2 data-reveal id="h-benefits">Ce que la vapeur change au toilettage</h2>
            <ul className="benefits">
              {benefits.map((b, i) => (<li data-reveal style={{ "--i": i } as React.CSSProperties} key={b.title}><h3>{b.title}</h3><p>{b.text}</p></li>))}
            </ul>
          </div>
        </section>

        <section id="fonctionnement" className="wrap section" aria-labelledby="h-how">
          <h2 data-reveal id="h-how">Quatre gestes, aucune pile</h2>
          <ol className="steps">
            {steps.map((s, i) => (<li data-reveal style={{ "--i": i } as React.CSSProperties} key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>))}
          </ol>
        </section>

        <section className="wrap section" aria-labelledby="h-use">
          <h2 data-reveal id="h-use">Pour les chiens, pour les chats</h2>
          <div className="duo">
            <Pic n={1} sizes="(max-width: 900px) 100vw, 50vw" /><Pic n={2} sizes="(max-width: 900px) 100vw, 50vw" />
          </div>
          <p className="lead narrow">Le même geste, sur tous les pelages : la poignée ergonomique garde la main détendue, les picots massent à chaque passage.</p>
        </section>

        <section id="details" className="band alt" aria-labelledby="h-spec">
          <div className="wrap split">
            <div>
              <h2 data-reveal id="h-spec">Les caractéristiques</h2>
              <dl className="specs">
                {specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
            </div>
            <div className="stack"><Pic n={0} sizes="(max-width: 900px) 100vw, 40vw" /></div>
          </div>
        </section>

        <section className="wrap section" aria-labelledby="h-rev">
          <h2 data-reveal id="h-rev">Ce que disent des acheteurs d&apos;une brosse similaire</h2>
          <p className="note rev-src">Ces avis proviennent d&apos;acheteurs d&apos;un article similaire sur AliExpress. Ce ne sont pas des clients de cette boutique ni de notre annonce eBay.</p>
          <ul className="reviews">
            {reviews.map((r, i) => (
              <li data-reveal style={{ "--i": i } as React.CSSProperties} key={r.text}>
                <p className="rev-rate" aria-label={`Note ${r.rating} sur 5`}>{r.rating}/5</p>
                <blockquote>{r.text}</blockquote>
                <p className="note">{r.name}, {r.date}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap section" aria-labelledby="h-trust">
          <h2 data-reveal id="h-trust">Acheter en confiance</h2>
          <ul className="trust">
            <li data-reveal style={{ "--i": 0 } as React.CSSProperties}><h3>Produit neuf</h3><p>Une brosse neuve, une unité incluse.</p></li>
            <li data-reveal style={{ "--i": 1 } as React.CSSProperties}><h3>Paiement sur eBay</h3><p>Vous réglez directement sur eBay, jamais sur ce site.</p></li>
            <li data-reveal style={{ "--i": 2 } as React.CSSProperties}><h3>Garantie client eBay</h3><p>Remboursement possible si vous ne recevez pas l&apos;objet commandé, selon les conditions eBay.</p></li>
          </ul>
        </section>

        <section id="faq" className="wrap section faq" aria-labelledby="h-faq">
          <h2 data-reveal id="h-faq">Questions fréquentes</h2>
          {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
        </section>

        <section className="final">
          <div className="wrap final-in" data-reveal>
            <h2>Un pelage plus facile à brosser dès cette semaine.</h2>
            <BuyButton label="Acheter sur eBay" variant="ghost" showPrice />
          </div>
        </section>
      </main>

      <footer className="foot wrap">
        <p><strong>{site.brand}</strong> : vitrine de présentation. La vente, le paiement et la livraison sont assurés via l&apos;annonce eBay.</p>
        <p>© {new Date().getFullYear()} {site.brand}</p>
      </footer>

      <div className="sticky"><span>{priceLabel}</span><BuyButton label="Acheter" /></div>
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
