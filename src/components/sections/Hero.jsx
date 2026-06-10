import ParticleBackground from '../ui/ParticleBackground'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 6vw 0 6vw', overflow: 'hidden', background: 'transparent' }}>
      <ParticleBackground />
      <div id="hero-headline" style={{ position: 'relative', zIndex: 2, maxWidth: 680, width: '100%' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.65rem, 1.8vw, 0.8rem)', letterSpacing: '0.15em',
          textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
          Electronic Medical Records — Reimagined
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.05, color: 'var(--color-text)', marginBottom: 24,
          wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          The Future of<br />
          <span style={{ color: 'var(--color-primary)' }}>Clinical Documentation</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.95rem, 2.5vw, 1.15rem)', lineHeight: 1.7,
          color: 'var(--color-text-muted)', maxWidth: 480, marginBottom: 40 }}>
          AI-powered, voice-first EMR built for the way doctors actually work. Setup in under 2 minutes.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/coming-soon" className="btn-primary">Start Free Trial</Link>
          <Link to="/contact" className="btn-ghost">Contact Us</Link>
        </div>
        {/* Scroll indicator */}
        <div className="hero-scroll-indicator" style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--color-text-muted)', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
          <div className="scroll-chevron" />
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
