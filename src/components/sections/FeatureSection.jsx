export default function FeatureSection({ id, label, headline, body, stat, statLabel, bullets }) {
  return (
    <section id={id} className="feature-section">
      <div className="feature-content">
        <span className="feature-label">{label}</span>
        <h2 className="feature-headline">{headline}</h2>
        <p className="feature-body">{body}</p>
        <div className="feature-stat">
          {stat}
          <span>{statLabel}</span>
        </div>
        <ul className="feature-bullets">
          {bullets.map((b, i) => (
            <li key={i} className="feature-bullet">{b}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
