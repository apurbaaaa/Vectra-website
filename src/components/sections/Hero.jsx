export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 10vw' }}>
      <div id="hero-headline" style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
          Electronic Medical Records — Reimagined
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.05, color: 'var(--color-text)', marginBottom: 24 }}>
          The Future of<br />
          <span style={{ color: 'var(--color-primary)' }}>Clinical Documentation</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', lineHeight: 1.7,
          color: 'var(--color-text-muted)', maxWidth: 480, marginBottom: 40 }}>
          AI-powered, voice-first EMR built for the way doctors actually work. Setup in under 2 minutes.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#cta" className="btn-primary">Start Free Trial</a>
          <a href="#cta" className="btn-ghost">Watch Demo →</a>
        </div>
        {/* Scroll indicator */}
        <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--color-text-muted)', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
          <div className="scroll-chevron" />
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
