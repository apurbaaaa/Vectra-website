import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef()
  const fillRef    = useRef()
  const pctRef     = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate asset loading progress
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(reveal, 500)
      }
      setProgress(Math.min(Math.round(p), 100))
    }, 120)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (fillRef.current) fillRef.current.style.width = progress + '%'
    if (pctRef.current) pctRef.current.textContent = progress + '%'
  }, [progress])

  function reveal() {
    const tl = gsap.timeline({ onComplete: () => {
      if (overlayRef.current) overlayRef.current.style.display = 'none'
      onComplete?.()
    }})
    tl.to(overlayRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.9,
      ease: 'power3.inOut'
    })
  }

  return (
    <div ref={overlayRef} style={styles.overlay}>
      <div style={styles.logo}>Vectrah</div>
      <div style={styles.track}>
        <div ref={fillRef} style={styles.fill} />
      </div>
      <div ref={pctRef} style={styles.pct}>0%</div>
      <div style={styles.label}>Initializing experience…</div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed', inset: 0, zIndex: 9999,
    background: '#050810',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '20px',
  },
  logo: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '2.2rem', fontWeight: 700,
    letterSpacing: '0.3em', color: '#00c8ff',
    textTransform: 'uppercase',
  },
  track: {
    width: '260px', height: '2px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '2px', overflow: 'hidden',
  },
  fill: {
    height: '100%', width: '0%',
    background: '#00c8ff',
    borderRadius: '2px',
    transition: 'width 0.15s ease',
  },
  pct: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)',
    letterSpacing: '0.1em',
  },
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)',
    letterSpacing: '0.05em',
  }
}
