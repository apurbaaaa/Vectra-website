import { useEffect } from 'react'
import { gsap } from 'gsap'

export default function Pricing() {
  useEffect(() => {
    // Entrance animation
    gsap.fromTo('.pricing-anim', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
    )
  }, [])

  return (
    <main style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)' }}>
      <section style={{ width: '100%', maxWidth: '800px', padding: '40px 20px', textAlign: 'center' }}>
        <div className="pricing-anim">
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '24px' }}>
            Pricing
          </h1>
          <div className="coming-soon-badge">
            Rolling Out Soon
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--color-text-muted)', marginTop: '24px', maxWidth: '500px', margin: '24px auto 0' }}>
            We're finalizing our plans to give you the best possible value. Stay tuned for updates!
          </p>
        </div>
      </section>

      <style>{`
        .coming-soon-badge {
          display: inline-block;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 10px;
        }

        :root[data-theme="dark"] .coming-soon-badge {
          color: var(--color-primary);
        }
      `}</style>
    </main>
  )
}
