import {useEffect, useRef, useState} from "react";

const navItems = [
    {key: "home", label: "Accueil", emoji: "🏠"},
    {key: "quiz", label: "QCM", emoji: "📝"},
    {key: "subjects", label: "Sujets", emoji: "📚"},
    {key: "corrections", label: "Corrections", emoji: "✅"},
];

export default function Header({onNavigate, activePage = "home"}) {
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pillStyle, setPillStyle] = useState({width: 0, left: 0, opacity: 0});

    const navRef = useRef(null);
    const btnRefs = useRef({});

    /* Scroll listener */
    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Déplace la pill vers le bouton actif */
    useEffect(() => {
        const btn = btnRefs.current[activePage];
        const nav = navRef.current;
        if (!btn || !nav) return;

        const btnRect = btn.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();

        setPillStyle({
            width: btnRect.width,
            left: btnRect.left - navRect.left,
            opacity: 1,
        });
    }, [activePage, mounted]);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --cream: #fdf6ec;
          --peach: #f5c5a3;
          --rose:  #e8a598;
          --sage:  #a8c5b0;
          --lavender: #c5b8e8;
          --sand:  #e8d5b0;
          --text:  #3d2e2e;
          --muted: #8a7060;
        }

        .hdr {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .hdr.scrolled {
          background: rgba(253,246,236,0.82);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 2px 24px rgba(61,46,46,0.07);
          border-bottom: 1px solid rgba(245,197,163,0.3);
        }
        .hdr:not(.scrolled) {
          background: transparent;
        }

        .hdr-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 2rem;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        /* ── Logo ── */
        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          flex-shrink: 0;
          opacity: 0;
          transform: translateX(-16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .hdr-logo.mounted { opacity: 1; transform: translateX(0); }

        .hdr-logo-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, var(--peach), var(--lavender));
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem;
          box-shadow: 0 3px 12px rgba(197,184,232,0.4);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hdr-logo:hover .hdr-logo-icon {
          transform: rotate(-6deg) scale(1.08);
          box-shadow: 0 6px 18px rgba(197,184,232,0.5);
        }
        .hdr-logo-text { display: flex; flex-direction: column; line-height: 1.1; }
        .hdr-logo-main {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 700; color: var(--text);
        }
        .hdr-logo-sub {
          font-size: 0.68rem; font-weight: 400; color: var(--muted);
          letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* ── Nav wrapper (position: relative pour la pill) ── */
        .hdr-nav {
          position: relative;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ── Pill glissante ── */
        .nav-pill {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          height: 36px;
          background: white;
          border-radius: 50px;
          box-shadow: 0 2px 12px rgba(61,46,46,0.08), 0 1px 3px rgba(61,46,46,0.05);
          pointer-events: none;
          transition: left 0.35s cubic-bezier(.34,1.56,.64,1),
                      width 0.35s cubic-bezier(.34,1.56,.64,1),
                      opacity 0.2s ease;
        }

        /* Trait dégradé sous la pill */
        .nav-pill::after {
          content: '';
          position: absolute;
          bottom: 5px; left: 50%;
          transform: translateX(-50%);
          width: 18px; height: 2px;
          background: linear-gradient(90deg, var(--rose), var(--lavender));
          border-radius: 2px;
          transition: width 0.35s ease;
        }

        /* ── Boutons ── */
        .nav-btn {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          border: none; background: transparent;
          border-radius: 50px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.88rem; font-weight: 400;
          color: var(--muted);
          cursor: pointer;
          transition: color 0.2s ease, font-weight 0.1s ease;
          white-space: nowrap;
          opacity: 0; transform: translateY(-10px);
          animation: navIn 0.45s cubic-bezier(.22,.8,.36,1) forwards;
        }
        @keyframes navIn { to { opacity: 1; transform: translateY(0); } }

        .nav-btn:hover  { color: var(--text); }
        .nav-btn.active { color: var(--text); font-weight: 500; }

        .nav-emoji { font-size: 0.85rem; opacity: 0.8; }

        /* ── Responsive ── */
        @media (max-width: 520px) {
          .hdr-inner  { padding: 0 1rem; }
          .hdr-logo-sub { display: none; }
          .nav-emoji  { display: none; }
          .nav-btn    { padding: 8px 12px; font-size: 0.82rem; }
        }
      `}</style>

            <header className={`hdr ${scrolled ? "scrolled" : ""}`}>
                <div className="hdr-inner">

                    {/* Logo */}
                    <div
                        className={`hdr-logo ${mounted ? "mounted" : ""}`}
                        onClick={() => onNavigate("home")}
                        role="button" tabIndex={0}
                    >
                        <div className="hdr-logo-icon">🌸</div>
                        <div className="hdr-logo-text">
                            <span className="hdr-logo-main">Océane</span>
                            <span className="hdr-logo-sub">Espace révisions</span>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="hdr-nav" ref={navRef}>

                        {/* Pill glissante */}
                        <div className="nav-pill" style={pillStyle}/>

                        {navItems.map(({key, label, emoji}, i) => (
                            <button
                                key={key}
                                ref={el => (btnRefs.current[key] = el)}
                                className={`nav-btn ${activePage === key ? "active" : ""}`}
                                style={{animationDelay: `${i * 0.07 + 0.1}s`}}
                                onClick={() => onNavigate(key)}
                            >
                                <span className="nav-emoji">{emoji}</span>
                                {label}
                            </button>
                        ))}
                    </nav>

                </div>
            </header>
        </>
    );
}
