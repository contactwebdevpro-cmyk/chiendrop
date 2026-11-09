import { site } from "@/config/site";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="wrap section legal">
      <a href="/" title="Retour à l'accueil" className="textlink">← Retour à {site.brand}</a>
      <h1>{title}</h1>
      {children}
    </main>
  );
}
