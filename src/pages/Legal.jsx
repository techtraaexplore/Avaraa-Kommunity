import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/site.css';
import Footer from '../components/site/Footer.jsx';
import WhatsAppFloat from '../components/site/WhatsAppFloat.jsx';
import { ContentProvider, useContent } from '../context/ContentContext.jsx';

function Page({ kind }) {
  const content = useContent();
  const doc = content[kind] ?? {};

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${doc.title || ''} · Avaraa Kommunity`;
  }, [kind, doc.title]);

  return (
    <>
      <div className="legal">
        <div className="legal-bar">
          <div className="wrap">
            <Link className="logo" to="/" aria-label="Avaraa Kommunity, back to the website">
              <img src="/logo.png" alt="Avaraa Kommunity" width="800" height="266" />
            </Link>
            <Link className="btn sm" to="/">
              Back to site
            </Link>
          </div>
        </div>
        <main className="wrap legal-body">
          <div className="legal-switch" role="navigation" aria-label="Legal pages">
            <Link to="/terms" aria-current={kind === 'terms' ? 'page' : undefined}>
              Terms &amp; Conditions
            </Link>
            <Link to="/privacy" aria-current={kind === 'privacy' ? 'page' : undefined}>
              Privacy Policy
            </Link>
          </div>
          <h1>{doc.title}</h1>
          {doc.updated && <p className="upd">Last updated: {doc.updated}</p>}
          {doc.intro && <p className="intro">{doc.intro}</p>}
          {(doc.sections ?? []).map((s, i) => (
            <div className="legal-sec" key={i}>
              <h2>{s.title}</h2>
              {(s.paragraphs ?? []).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {(s.points ?? []).length > 0 && (
                <ul>
                  {s.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </main>
      </div>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function Legal({ kind }) {
  return (
    <ContentProvider>
      <Page kind={kind} />
    </ContentProvider>
  );
}
