import FeatureSection from './FeatureSection'
export default function SpeedSection() {
  return (
    <section id="section-speed" className="feature-section">
      <div className="feature-content">
        <span className="feature-label">Fast Onboarding</span>
        <h2 className="feature-headline">Up and running in under 2 minutes.</h2>
        <p className="feature-body">
          No lengthy training sessions. No IT headaches. Vectrah's guided setup has your clinic fully operational in minutes. Healthcare professionals report going live faster than any EMR they've used before.
        </p>
        <div className="feature-stat">
          <span id="stat-minutes">0.0</span> min
          <span>average onboarding time</span>
        </div>
        <ul className="feature-bullets">
          {['Zero-config setup', 'Role detection wizard', 'Import from existing EMR', 'Live support on day 1'].map((b, i) => (
            <li key={i} className="feature-bullet">{b}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
