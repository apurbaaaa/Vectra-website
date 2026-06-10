import { useEffect } from 'react'

export default function ComingSoon() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-transition" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 20px',
      background: 'var(--color-bg)',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          color: 'var(--color-text)',
          marginBottom: '20px'
        }}>
          Rolling Out Soon
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.2rem',
          color: 'var(--color-text-muted)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          We're currently preparing this feature for early access. Check back soon or contact us for more information!
        </p>
      </div>
    </div>
  )
}
