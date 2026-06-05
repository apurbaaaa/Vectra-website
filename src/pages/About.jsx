import { useEffect } from 'react'

export default function About() {
  return (
    <main>
      {/* 1. Page Hero */}
      <section style={{
        minHeight: '60vh', display: 'flex', alignItems: 'center',
        padding: '120px 10vw 80px',
        background: 'radial-gradient(ellipse at 30% 50%, rgba(0,200,255,0.06) 0%, transparent 60%)'
      }}>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>Home / About</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, color: 'var(--color-text)', marginBottom: '24px' }}>
            "Built by clinicians.<br />Designed for care."
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', color: 'var(--color-text-muted)', maxWidth: '600px', lineHeight: 1.6 }}>
            Vectrah was founded with a single belief: that technology should disappear into the workflow, not disrupt it.
          </p>
        </div>
      </section>

      {/* 2. The Problem We Solve */}
      <section style={{ padding: '80px 10vw', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
        <div>
          <blockquote style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontStyle: 'italic', color: 'var(--color-primary)', lineHeight: 1.3, margin: 0 }}>
            "Doctors spend 2 hours on paperwork for every 1 hour with patients."
          </blockquote>
        </div>
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
            We believe this ratio is unacceptable. Vectrah inverts this dynamic. By leveraging voice-first interactions and AI-assisted workflows, our platform drastically reduces administrative overhead.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
            EMRs should feel invisible. Clinical staff deserve tools that match the speed of real medicine, allowing them to focus entirely on the patient.
          </p>
        </div>
      </section>

      {/* 3. Product Deep-Dive (3x2 card grid) */}
      <section style={{ padding: '80px 10vw' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text)', textAlign: 'center', marginBottom: '60px' }}>Core Capabilities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {[
            { icon: '🎙️', title: 'Speech-to-Text', desc: 'Real-time dictation, 98.7% medical vocabulary accuracy' },
            { icon: '🤖', title: 'AI Co-Pilot', desc: 'ICD coding, drug alerts, differential diagnosis' },
            { icon: '🔀', title: 'Level Switching', desc: 'Doctor, Nurse, Admin, Lab — tailored per role' },
            { icon: '⚡', title: '2-Minute Setup', desc: 'Fastest EMR onboarding in the industry' },
            { icon: '🔒', title: 'HIPAA Security', desc: 'AES-256, zero-trust, SOC 2 Type II' },
            { icon: '☁️', title: 'Cloud-Native', desc: '99.99% uptime SLA, any device, auto-updated' },
          ].map((card, i) => (
            <div key={i} className="about-card">
              <div style={{ fontSize: '2rem', marginBottom: '20px' }}>{card.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-text)', marginBottom: '12px' }}>{card.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Mission Statement */}
      <section style={{ padding: '100px 10vw', textAlign: 'center' }}>
        <blockquote style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.35,
          color: 'var(--color-text)', maxWidth: 800, margin: '0 auto'
        }}>
          "We believe every minute saved on documentation is a minute returned to patient care.
          That is the Vectrah mission."
        </blockquote>
      </section>

      {/* 5. Team Section */}
      <section style={{ padding: '80px 10vw' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text)', marginBottom: '16px' }}>The team behind Vectrah</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            A group of developers, physicians, and UX researchers committed to reshaping clinical software.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
          {[
            { initials: 'AS', name: 'Dr. Aanya Sharma', role: 'Chief Medical Officer & Co-founder', bio: '12 years of clinical practice. Grew frustrated with legacy EMRs and decided to build a better one.' },
            { initials: 'RM', name: 'Rohan Mehta', role: 'CEO & Co-founder', bio: 'Former healthcare IT lead who has scaled SaaS products for hospital networks across South Asia.' },
            { initials: 'PN', name: 'Priya Nair', role: 'Head of AI/ML', bio: 'NLP specialist for medical text, focused on making AI feel native to clinical workflows.' },
            { initials: 'CV', name: 'Carlos Vidal', role: 'Lead Full-Stack Engineer', bio: 'Architect of the Vectrah platform core. 8 years building HIPAA-compliant cloud systems.' },
            { initials: 'LH', name: 'Dr. Lena Hoffmann', role: 'Clinical UX Researcher', bio: 'Bridges the gap between clinical thinking and software design.' },
            { initials: 'TA', name: 'Tariq Al-Rashid', role: 'DevOps & Security Lead', bio: "Responsible for Vectrah's zero-trust infrastructure and SOC 2 compliance." },
          ].map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-avatar">{member.initials}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--color-text)', marginBottom: '4px' }}>{member.name}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '16px', fontWeight: 600 }}>{member.role}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Timeline */}
      <section style={{ padding: '80px 10vw' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text)', textAlign: 'center', marginBottom: '60px' }}>Our Journey</h2>
        <div className="timeline">
          {[
            { year: '2022', desc: 'Vectrah founded in Kathmandu' },
            { year: '2023', desc: 'Beta launched with 12 pilot clinics' },
            { year: '2024', desc: 'AI co-pilot released; 200+ active clinics' },
            { year: '2025', desc: 'SOC 2 Type II certification; 500+ clinics' },
            { year: '2026', desc: 'v3.0 launched with real-time STT and level switching' },
          ].map((item, i) => (
            <div key={i} className="timeline-item">
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Contact / Partnership CTA */}
      <section style={{ padding: '80px 10vw', textAlign: 'center', background: 'radial-gradient(ellipse at center, rgba(123,92,250,0.08) 0%, transparent 70%)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text)', marginBottom: '20px' }}>Partner with Vectrah</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '40px' }}>
          Interested in enterprise pricing or a custom deployment?
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:hello@vectrah.io" className="btn-primary">hello@vectrah.io</a>
          <a href="#" className="btn-ghost">Schedule a Call →</a>
        </div>
      </section>

      <style>{`
        .about-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .about-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,200,255,0.1);
        }

        .team-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          padding: 32px;
          text-align: center;
          transition: transform 0.25s, background 0.25s;
        }
        .team-card:hover {
          transform: translateY(-5px);
          border-color: var(--color-primary);
        }
        .team-avatar {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
        }

        .timeline {
          max-width: 600px;
          margin: 0 auto;
        }
        .timeline-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 40px;
          position: relative;
        }
        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 104px;
          top: 24px;
          bottom: -40px;
          width: 2px;
          background: var(--color-border);
        }
        .timeline-year {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--color-primary);
          width: 80px;
          flex-shrink: 0;
          padding-top: 2px;
        }
        .timeline-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-accent);
          margin: 8px 24px 0;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }
        .timeline-desc {
          font-family: var(--font-body);
          font-size: 1.05rem;
          color: var(--color-text-muted);
          line-height: 1.5;
        }
      `}</style>
    </main>
  )
}
