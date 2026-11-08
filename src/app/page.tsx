import { site, product, priceLabel, steps, specs, faqs, reviews, features, heroPoints, trustItems, guide } from "@/config/site";
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
    { "@context": "https://schema.org", "@type": "Organization", name: site.brand, url: site.url, logo: new URL("/apple-icon.png", site.url).toString(), description: site.tagline },
    { "@context": "https://schema.org", "@type": "WebSite", name: site.brand, url: site.url, inLanguage: "fr-FR" },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ];

  return (
    <>
      <a href="#contenu" className="skip" title="Aller au contenu principal">Aller au contenu</a>
      <div className="announce"><span>Produit neuf</span><span>Paiement sécurisé sur eBay</span><span>Recharge USB</span></div>
      <header className="top">
        <div className="wrap top-in">
          <a href="#" className="logo" title="Retour en haut de la page" aria-label={`${site.brand}, accueil`}>
            <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true"><ellipse cx="14" cy="19" rx="6.5" ry="5.5" fill="currentColor"/><circle cx="5.5" cy="12" r="2.6" fill="currentColor"/><circle cx="10.5" cy="6.5" r="2.6" fill="currentColor"/><circle cx="17.5" cy="6.5" r="2.6" fill="currentColor"/><circle cx="22.5" cy="12" r="2.6" fill="currentColor"/></svg>
            {site.brand}
          </a>
          <nav aria-label="Navigation principale" className="nav">
            <a href="#fonctionnement" title="Voir le fonctionnement de la brosse">Fonctionnement</a><a href="#details" title="Voir les caractéristiques">Détails</a><a href="#faq" title="Lire les questions fréquentes">FAQ</a>
          </nav>
          <BuyButton label="Acheter" />
        </div>
      </header>

      <main id="contenu">
        <section className="hero wrap">
          <div className="hero-copy">
            <p className="kicker">Des poils partout, un pelage qui s&apos;électrise, une brosse que l&apos;animal évite ?</p>
            <h1>Brosse à vapeur chien et chat : les poils détachés restent sur la brosse.</h1>
            <p className="lead">Brosse à vapeur rechargeable pour chien et chat, avec réservoir d&apos;eau intégré et poignée ergonomique.</p>
            <ul className="points">
              {heroPoints.map((t) => (<li key={t}><svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#2F7A5E"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}</li>))}
            </ul>
            <div className="buy">
              <p className="price" aria-label={`Prix ${priceLabel}`}>{priceLabel}<small>{product.condition}</small></p>
              <BuyButton label="Acheter maintenant" showPrice />
              <a className="textlink" href="#fonctionnement" title="Voir comment fonctionne la brosse à vapeur">Voir comment ça marche</a>
              <p className="note">Paiement sécurisé finalisé sur eBay, via l&apos;annonce du produit.</p>
            </div>
          </div>
          <Steam />
          <Gallery />
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee-track">{[0, 1].map((k) => (<ul key={k}>{["Vapeur douce", "Recharge USB", "Réservoir intégré", "Poignée ergonomique", "Picots de massage", "Chiens et chats"].map((t) => (<li key={t}>{t}</li>))}</ul>))}</div></div>

        <section className="wrap section" aria-label="Les points forts">
          {features.map((f, i) => (
            <article className={`row${i % 2 ? " flip" : ""}`} key={f.title}>
              <Pic n={f.image} sizes="(max-width: 900px) 100vw, 50vw" />
              <div data-reveal><h2>{f.title}</h2><p>{f.text}</p></div>
            </article>
          ))}
        </section>

        {product.video && (
          <section className="wrap section" aria-labelledby="h-video">
            <h2 data-reveal id="h-video">La brosse en action</h2>
            <video className="video" src={product.video} poster={product.images[1].src} controls muted loop playsInline preload="none" />
          </section>
        )}

        <section id="fonctionnement" className="wrap section" aria-labelledby="h-how">
          <h2 data-reveal id="h-how">Utiliser la brosse à vapeur en quatre gestes</h2>
          <ol className="steps">
            {steps.map((s, i) => (<li data-reveal style={{ "--i": i } as React.CSSProperties} key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>))}
          </ol>
        </section>

        <section id="details" className="band alt" aria-labelledby="h-spec">
          <div className="wrap split">
            <div>
              <h2 data-reveal id="h-spec">Caractéristiques de la brosse à vapeur</h2>
              <dl className="specs">
                {specs.map(([k, v]) => (<div key={k}><dt>{k}</dt><dd>{v}</dd></div>))}
              </dl>
            </div>
            <div className="stack"><Pic n={0} sizes="(max-width: 900px) 100vw, 40vw" /></div>
          </div>
        </section>

        <section id="avis" className="wrap section" aria-labelledby="h-rev">
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

        <section className="wrap section" aria-labelledby="h-guide">
          <h2 data-reveal id="h-guide">Bien brosser son chien ou son chat</h2>
          <div className="guide-grid">
            {guide.map((g) => (<div data-reveal key={g.title}><h3>{g.title}</h3><p>{g.text}</p></div>))}
          </div>
        </section>

        <section id="faq" className="wrap section faq" aria-labelledby="h-faq">
          <h2 data-reveal id="h-faq">Questions fréquentes sur la brosse à vapeur</h2>
          {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
        </section>

        <section className="wrap section" aria-labelledby="h-trust">
          <h2 data-reveal id="h-trust">Acheter en confiance</h2>
          <ul className="trust">
            {trustItems.map((t, i) => (
              <li data-reveal style={{ "--i": i } as React.CSSProperties} key={t.title}>
                <svg className="ico" width="28" height="28" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.8"/><path d="M7.5 12.5l3 3L16.5 9" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <h3>{t.title}</h3><p>{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="final">
          <div className="wrap final-in" data-reveal>
            <h2>Un pelage plus facile à brosser dès cette semaine.</h2>
            <BuyButton label="Acheter sur eBay" variant="ghost" showPrice />
          </div>
        </section>
      </main>

      <footer className="foot wrap">
        <nav aria-label="Liens du pied de page" className="foot-nav">
          <a href="#fonctionnement" title="Fonctionnement de la brosse à vapeur">Fonctionnement</a>
          <a href="#details" title="Caractéristiques de la brosse">Caractéristiques</a>
          <a href="#avis" title="Avis d'acheteurs d'une brosse similaire">Avis</a>
          <a href="#faq" title="Questions fréquentes">FAQ</a>
          <a href={product.ebayUrl} target="_blank" rel="noopener noreferrer" title="Annonce eBay de la brosse à vapeur">Annonce eBay</a>
        </nav>
        <p><strong>{site.brand}</strong> : vitrine de présentation. La vente, le paiement et la livraison sont assurés via l&apos;annonce eBay.</p>
        <p>© {new Date().getFullYear()} {site.brand}</p>
      </footer>

      <div className="sticky"><span>{priceLabel}</span><BuyButton label="Acheter" /></div>
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
