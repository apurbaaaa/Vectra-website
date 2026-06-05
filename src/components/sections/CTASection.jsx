export default function CTASection() {
  return (
    <section id="cta" style={{
      minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #0f1a2e 0%, #050810 70%)',
      padding: '40px 10vw', textAlign: 'center'
    }}>
      <div id="cta-content">
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
          Join 500+ clinics already using Vectrah
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 700, color: 'var(--color-text)', marginBottom: 20, lineHeight: 1.1 }}>
          Ready to transform your practice?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: 40 }}>
          Start free. No credit card required. Full access for 30 days.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" className="btn-primary">Start Free Trial</a>
          <a href="#" className="btn-ghost">Book a Demo →</a>
        </div>
      </div>
    </section>
  )
}
