import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import STTSection from '../components/sections/STTSection'
import AISection from '../components/sections/AISection'
import LevelsSection from '../components/sections/LevelsSection'
import SpeedSection from '../components/sections/SpeedSection'
import SecuritySection from '../components/sections/SecuritySection'

gsap.registerPlugin(ScrollTrigger)

export default function Features() {
  const containerRef = useRef(null)

  useEffect(() => {
    // Responsive check: do not run pinned animations on mobile/tablet screens
    if (window.innerWidth <= 768) {
      // Ensure all panels are fully visible and not offset
      gsap.set('.feature-panel', { yPercent: 0, opacity: 1, clearProps: 'all' })
      return
    }

    const panels = gsap.utils.toArray('.feature-panel')
    const dots = gsap.utils.toArray('.nav-dot')
    const labels = gsap.utils.toArray('.nav-dot-label')
    if (panels.length === 0) return

    // Set initial states: panels 1+ are hidden / pushed down
    gsap.set(panels.slice(1), { yPercent: 100, opacity: 0 })
    
    // Highlight the first dot
    gsap.set(dots[0], { scale: 1.5, backgroundColor: 'var(--color-primary)' })
    gsap.set(labels[0], { opacity: 1, x: 0 })

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

      // Timeline panel transition: fade/slide out previous panel
      tl.to(panels[i - 1], {
        yPercent: -30,
        opacity: 0,
        ease: 'power2.inOut',
        duration: 1,
      }, `panel-${i}`)

      // Timeline panel transition: incoming panel
      tl.to(panel, {
        yPercent: 0,
        opacity: 1,
        ease: 'power2.inOut',
        duration: 1,
      }, `panel-${i}`)

      // Animate active/inactive dots & labels
      tl.to(dots[i - 1], {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        duration: 0.3
      }, `panel-${i}-=0.5`)
      
      tl.to(labels[i - 1], {
        opacity: 0,
        x: 10,
        duration: 0.3
      }, `panel-${i}-=0.5`)

      tl.to(dots[i], {
        scale: 1.5,
        backgroundColor: 'var(--color-primary)',
        duration: 0.3
      }, `panel-${i}-=0.5`)

      tl.to(labels[i], {
        opacity: 1,
        x: 0,
        duration: 0.3
      }, `panel-${i}-=0.5`)

      // Add a subtle entrance zoom to the content of the coming panel
      const content = panel.querySelector('.feature-content')
      if (content) {
        tl.fromTo(content,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 },
          `panel-${i}-=0.3`
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main style={{ paddingTop: '80px', overflowX: 'hidden' }}>
      {/* Intro Hero Section */}
      <section style={{ padding: '80px 10vw 40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: 'var(--color-text)', marginBottom: '20px' }}>
          Platform Features
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Explore the powerful tools and capabilities that make Vectrah the most advanced EMR system in the industry.
        </p>
      </section>

      {/* Pinned Scroll Canvas Wrapper */}
      <div ref={containerRef} className="features-scroll-wrapper">
        <div className="feature-panel">
          <STTSection />
        </div>
        <div className="feature-panel">
          <AISection />
        </div>
        <div className="feature-panel">
          <LevelsSection />
        </div>
        <div className="feature-panel">
          <SpeedSection />
        </div>
        <div className="feature-panel">
          <SecuritySection />
        </div>

        {/* Visual Navigation Indicator on the right */}
        <div className="feature-nav-dots">
          {['Voice Dictation', 'AI Co-Pilot', 'Role Levels', 'Speed Engine', 'Security'].map((label, index) => (
            <div key={index} className="nav-dot-wrapper">
              <span className="nav-dot-label">{label}</span>
              <div className="nav-dot" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .features-scroll-wrapper {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: var(--color-bg);
          border-top: 1px solid var(--color-border);
        }

        .feature-panel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          background: var(--color-bg);
          box-sizing: border-box;
        }

        /* Override basic features list padding/min-height */
        .feature-panel .feature-section {
          min-height: 100% !important;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 10vw;
          box-sizing: border-box;
          background: transparent !important;
        }

        .feature-panel .feature-section::before {
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
          pointer-events: none;
          white-space: nowrap;
        }

        .nav-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          transition: background-color 0.3s, transform 0.3s;
        }

        @media (max-width: 768px) {
          .features-scroll-wrapper {
            height: auto !important;
            overflow: visible !important;
          }
          .feature-panel {
            position: relative !important;
            top: auto !important;
            left: auto !important;
            width: 100% !important;
            height: auto !important;
            opacity: 1 !important;
            transform: none !important;
            padding: 40px 0;
          }
          .feature-panel .feature-section {
            min-height: auto !important;
            padding: 40px 6vw !important;
          }
          .feature-nav-dots {
            display: none;
          }
        }
      `}</style>
    </main>
  )
}
