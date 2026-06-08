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
      p += Math.random() * 8
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(reveal, 500)
      }
      setProgress(Math.min(Math.round(p), 100))
    }, 100)

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
      <div style={styles.logoContainer}>
        <img src="/Logo/logonobg.png" alt="Vectrah" style={styles.logoImage} />
      </div>
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
    background: 'var(--color-loading-bg)',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '20px',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: '200px',
    width: 'auto',
    display: 'block',
  },
  track: {
    width: '260px', height: '2px',
    background: 'var(--color-loading-track)',
    borderRadius: '2px', overflow: 'hidden',
  },
  fill: {
    height: '100%', width: '0%',
    background: 'var(--color-loading-logo)',
    borderRadius: '2px',
    transition: 'width 0.15s ease',
  },
  pct: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.8rem', color: 'var(--color-loading-text)',
    letterSpacing: '0.1em',
  },
  label: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '0.75rem', color: 'var(--color-loading-text)',
    letterSpacing: '0.05em',
  }
}
