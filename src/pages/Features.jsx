import STTSection from '../components/sections/STTSection'
import AISection from '../components/sections/AISection'
import LevelsSection from '../components/sections/LevelsSection'
import SpeedSection from '../components/sections/SpeedSection'
import SecuritySection from '../components/sections/SecuritySection'

export default function Features() {
  return (
    <main style={{ paddingTop: '80px', paddingBottom: '0px' }}>
      <section style={{ padding: '80px 10vw', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '20px' }}>
          Platform Features
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Explore the powerful tools and capabilities that make Vectrah the most advanced EMR system in the industry.
        </p>
      </section>

      <div id="features-content">
        <STTSection />
        <AISection />
        <LevelsSection />
        <SpeedSection />
        <SecuritySection />
      </div>

      <style>{`
        #features-content .feature-section {
          min-height: auto;
          padding-top: 60px;
          padding-bottom: 60px;
        }
        #features-content .feature-section::before {
          display: none;
        }
      `}</style>
    </main>
  )
}
