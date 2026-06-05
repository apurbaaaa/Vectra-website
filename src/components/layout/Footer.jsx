import { Link } from 'react-router-dom'

export default function Footer() {
  const productLinks = [
    { label: 'Features', path: '/#features' },
    { label: 'Pricing', path: '/#pricing' },
    { label: 'Security', path: '/#security' },
    { label: 'Changelog', path: '/#changelog' },
  ]

  const companyLinks = [
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/#blog' },
    { label: 'Careers', path: '/#careers' },
    { label: 'Press', path: '/#press' },
  ]

  const legalLinks = [
    { label: 'Privacy Policy', path: '/#privacy' },
    { label: 'Terms', path: '/#terms' },
    { label: 'HIPAA Compliance', path: '/#hipaa' },
    { label: 'Cookie Policy', path: '/#cookies' },
  ]

  return (
    <>
      <footer id="site-footer" className="footer">
        <div className="footer__inner">
          <div className="footer__grid">
            {/* Brand Column */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">Vectrah</Link>
              <p className="footer__tagline">AI-powered EMR for modern clinics</p>
            </div>

            {/* Product Column */}
            <div className="footer__column">
              <h4 className="footer__heading">Product</h4>
              <nav className="footer__links" role="navigation" aria-label="Product">
                {productLinks.map((link) => (
                  <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
                ))}
              </nav>
            </div>

            {/* Company Column */}
            <div className="footer__column">
              <h4 className="footer__heading">Company</h4>
              <nav className="footer__links" role="navigation" aria-label="Company">
                {companyLinks.map((link) => (
                  <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
                ))}
              </nav>
            </div>

            {/* Legal Column */}
            <div className="footer__column">
              <h4 className="footer__heading">Legal</h4>
              <nav className="footer__links" role="navigation" aria-label="Legal">
                {legalLinks.map((link) => (
                  <Link key={link.label} to={link.path} className="footer__link">{link.label}</Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer__bottom">
            <p className="footer__copyright">© 2025 Vectrah. All rights reserved.</p>
            <div className="footer__socials">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Twitter/X">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .footer {
          background: var(--color-surface);
          border-top: 1px solid var(--color-border);
          padding: 80px 40px 40px;
          position: relative;
          z-index: 10;
        }

        .footer__inner {
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 60px;
        }

        .footer__logo {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--color-primary);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: inline-block;
          margin-bottom: 12px;
        }

        .footer__tagline {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          max-width: 240px;
        }

        .footer__heading {
          font-family: var(--font-display);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-text);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
        }

        .footer__links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer__link {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer__link:hover {
          color: var(--color-text);
        }

        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 32px;
          border-top: 1px solid var(--color-border);
        }

        .footer__copyright {
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }

        .footer__socials {
          display: flex;
          gap: 16px;
        }

        .footer__social {
          color: var(--color-text-muted);
          transition: color 0.3s ease, transform 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .footer__social:hover {
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .footer { padding: 60px 20px 32px; }
          .footer__grid {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .footer__brand { grid-column: 1 / -1; }
          .footer__bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .footer__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
