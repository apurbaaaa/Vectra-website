import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Responsive check: do not run pinned animations on mobile/tablet screens
    if (window.innerWidth <= 768) {
      // Ensure all panels are fully visible and not offset
      gsap.set('.about-panel', { yPercent: 0, opacity: 1, clearProps: 'all' })
      return
    }

    const panels = gsap.utils.toArray('.about-panel')
    const dots = gsap.utils.toArray('.nav-dot')
    const labels = gsap.utils.toArray('.nav-dot-label')
    if (panels.length === 0) return

    // Set initial states: panels 1+ are hidden / pushed down
    gsap.set(panels.slice(1), { yPercent: 100, opacity: 0 })
    
    // Highlight the first dot, and ensure others are styled as inactive
    if (dots.length > 0) {
      gsap.set(dots[0], { scale: 1.5, backgroundColor: 'var(--color-primary)', opacity: 1 })
      gsap.set(dots.slice(1), { scale: 1, backgroundColor: 'var(--color-text-subtle)', opacity: 0.4 })
      gsap.set(labels[0], { opacity: 1, x: 0 })
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        start: 'top top',
        end: () => `+=${window.innerHeight * panels.length}`,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    })

    // Slide up panels sequentially and animate dot indicators
    panels.forEach((panel, i) => {
      if (i === 0) return

      const timeOffset = i * 2

      // Timeline panel transition: fade/slide out previous panel
      tl.to(panels[i - 1], {
        yPercent: -30,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 1,
      }, timeOffset)

      // Timeline panel transition: incoming panel
      tl.to(panel, {
        yPercent: 0,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1,
      }, timeOffset)

      // Animate active/inactive dots & labels
      if (dots.length > 0) {
        tl.to(dots[i - 1], {
          scale: 1,
          backgroundColor: 'var(--color-text-subtle)',
          opacity: 0.4,
          duration: 0.3
        }, timeOffset)
        
        tl.to(labels[i - 1], {
          opacity: 0,
          x: 10,
          duration: 0.3
        }, timeOffset)

        tl.to(dots[i], {
          scale: 1.5,
          backgroundColor: 'var(--color-primary)',
          opacity: 1,
          duration: 0.3
        }, timeOffset + 0.5)

        tl.to(labels[i], {
          opacity: 1,
          x: 0,
          duration: 0.3
        }, timeOffset + 0.5)
      }

      // Add a subtle entrance zoom to the content of the coming panel
      const content = panel.querySelector('.about-content')
      if (content) {
        tl.fromTo(content,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
          timeOffset + 0.4
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main style={{ paddingTop: '80px', overflowX: 'hidden' }}>
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

      {/* Pinned Scroll Canvas Wrapper */}
      <div ref={containerRef} className="about-scroll-wrapper">
        
        {/* 2. The Problem We Solve */}
        <div className="about-panel">
          <section className="about-content" style={{ padding: '0 10vw', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
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
        </div>

        {/* 3. Product Deep-Dive (3x2 card grid) */}
        <div className="about-panel">
          <section className="about-content" style={{ padding: '0 10vw', width: '100%' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text)', textAlign: 'center', marginBottom: '60px' }}>Core Capabilities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {[
                { title: 'Speech-to-Text', desc: 'Real-time dictation, 98.7% medical vocabulary accuracy' },
                { title: 'AI Co-Pilot', desc: 'ICD coding, drug alerts, differential diagnosis' },
                { title: 'Level Switching', desc: 'Doctor, Nurse, Admin, Lab — tailored per role' },
                { title: '2-Minute Setup', desc: 'Fastest EMR onboarding in the industry' },
                { title: 'HIPAA Security', desc: 'AES-256, zero-trust, SOC 2 Type II' },
                { title: 'Cloud-Native', desc: '99.99% uptime SLA, any device, auto-updated' },
              ].map((card, i) => (
                <div key={i} className="about-card">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: 'var(--color-text)', marginBottom: '12px' }}>{card.title}</h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 4. Mission Statement */}
        <div className="about-panel">
          <section className="about-content" style={{ padding: '0 10vw', width: '100%', textAlign: 'center' }}>
            <blockquote style={{
              fontFamily: 'var(--font-display)', fontStyle: 'italic',
              fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.35,
              color: 'var(--color-text)', maxWidth: 800, margin: '0 auto'
            }}>
              "We believe every minute saved on documentation is a minute returned to patient care.
              That is the Vectrah mission."
            </blockquote>
          </section>
        </div>

        {/* 5. Team Section */}
        <div className="about-panel">
          <section className="about-content" style={{ padding: '0 10vw', width: '100%' }}>
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
        </div>

        {/* 6. Contact / Partnership CTA */}
        <div className="about-panel">
          <section className="about-content" style={{ padding: '0 10vw', width: '100%', textAlign: 'center' }}>
            <div style={{ padding: '80px', borderRadius: 'var(--radius-lg)', background: 'radial-gradient(ellipse at center, rgba(123,92,250,0.08) 0%, transparent 70%)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--color-text)', marginBottom: '20px' }}>Partner with Vectrah</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '40px' }}>
                Interested in enterprise pricing or a custom deployment?
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="mailto:hello@vectrah.io" className="btn-primary">hello@vectrah.io</a>
                <a href="#" className="btn-ghost">Schedule a Call →</a>
              </div>
            </div>
          </section>
        </div>

        {/* Visual Navigation Indicator on the right */}
        <div className="feature-nav-dots">
          {['The Problem', 'Capabilities', 'Mission', 'Our Team', 'Partner'].map((label, index) => (
            <div key={index} className="nav-dot-wrapper">
              <span className="nav-dot-label">{label}</span>
              <div className="nav-dot" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .about-scroll-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: var(--color-bg);
          border-top: 1px solid var(--color-border);
        }

        .about-panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          background: var(--color-bg);
          box-sizing: border-box;
          overflow-y: auto; /* allows scrolling if content is too tall on small desktop */
        }
        
        .about-panel::-webkit-scrollbar {
          display: none;
        }

        /* Right Navigation Dots */
        .feature-nav-dots {
          position: absolute;
          right: 4vw;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 100;
          pointer-events: none;
        }

        .nav-dot-wrapper {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }

        .nav-dot-label {
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--color-text);
          opacity: 0;
          transform: translateX(10px);
          transition: opacity 0.3s, transform 0.3s;
          white-space: nowrap;
        }

        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          transition: background-color 0.3s, transform 0.3s;
        }

        .about-card {
          background: rgba(13, 17, 23, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: background 0.25s;
        }
        :root[data-theme="light"] .about-card {
          background: rgba(255, 255, 255, 0.7);
        }

        .team-card {
          background: var(--color-surface);
          border-radius: var(--radius-md);
          padding: 32px;
          text-align: center;
          transition: background 0.25s;
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

        @media (max-width: 768px) {
          .about-scroll-wrapper {
            height: auto !important;
            overflow: visible !important;
          }
          .about-panel {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            height: auto !important;
            opacity: 1 !important;
            transform: none !important;
            padding: 60px 0;
            overflow-y: visible;
          }
          .feature-nav-dots {
            display: none;
          }
        }
      `}</style>
    </main>
  )
}
