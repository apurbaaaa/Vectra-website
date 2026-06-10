import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location])
  const navLinks = [
    { label: 'Features', path: '/features' },
    { label: 'About', path: '/about' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact', path: '/contact' },
  ]

  return (
    <>
      <header id="site-header" className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <Link to="/" className="header__logo">
            <img src="/Logo/logonobg.png" alt="Vectrah" style={{ height: '200px', width: 'auto', display: 'block' }} />
          </Link>

          <nav className="header__nav" id="main-nav" role="navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`header__link ${location.pathname === link.path ? 'header__link--active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/#demo" className="header__cta" id="header-cta">
              Request Demo
            </Link>
          </div>

          <button
            className={`header__hamburger ${mobileOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'mobile-drawer--open' : ''}`} id="mobile-drawer">
        <nav className="mobile-drawer__nav" role="navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="mobile-drawer__link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/#demo"
            className="mobile-drawer__cta"
            onClick={() => setMobileOpen(false)}
          >
            Request Demo
          </Link>
        </nav>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0 40px;
          height: 72px;
          display: flex;
          align-items: center;
          transition: background 0.4s var(--transition), backdrop-filter 0.4s var(--transition);
          background: var(--color-header-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: none;
        }

        .header--scrolled {
          background: var(--color-header-scrolled);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: none;
        }

        .header__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .header__logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .header__nav {
          display: flex;
          gap: 32px;
        }

        .header__link {
          font-family: var(--font-body);
          font-size: 0.9rem;
          font-weight: 400;
          color: var(--color-text-muted);
          text-decoration: none;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
          position: relative;
        }

        .header__link:hover,
        .header__link--active {
          color: var(--color-accent);
        }

        .header__link--active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-primary);
          border-radius: 1px;
        }

        .header__cta {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-bg);
          background: var(--color-primary);
          text-decoration: none;
          padding: 10px 24px;
          border-radius: 100px;
          letter-spacing: 0.02em;
          transition: all 0.3s var(--transition);
          position: relative;
          overflow: hidden;
        }

        .header__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          z-index: 1001;
        }

        .header__hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-text);
          border-radius: 1px;
          transition: all 0.3s ease;
        }

        .header__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }
        .header__hamburger--open span:nth-child(2) {
          opacity: 0;
        }
        .header__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 300px;
          height: 100vh;
          background: var(--color-header-bg);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 999;
          transform: translateX(100%);
          transition: transform 0.4s var(--transition);
          padding: 100px 40px 40px;
          border-left: 1px solid var(--color-border);
        }

        .mobile-drawer--open {
          transform: translateX(0);
        }

        .mobile-drawer__nav {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .mobile-drawer__link {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 500;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .mobile-drawer__link:hover {
          color: var(--color-text);
        }

        .mobile-drawer__cta {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--color-bg);
          background: var(--color-primary);
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 100px;
          text-align: center;
          margin-top: 16px;
          transition: all 0.3s var(--transition);
        }

        @media (max-width: 768px) {
          .header { padding: 0 20px; }
          .header__nav { display: none; }
          .header__cta { display: none; }
          .header__hamburger { display: flex; }
        }
      `}</style>
    </>
  )
}
