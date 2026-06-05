import { useState, lazy, Suspense } from 'react'
const Scene = lazy(() => import('../components/three/Scene'))
import { useWebGLFallback } from '../hooks/useWebGLFallback'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import Hero from '../components/sections/Hero'
import STTSection from '../components/sections/STTSection'
import AISection from '../components/sections/AISection'
import LevelsSection from '../components/sections/LevelsSection'
import SpeedSection from '../components/sections/SpeedSection'
import SecuritySection from '../components/sections/SecuritySection'
import CTASection from '../components/sections/CTASection'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const { supported } = useWebGLFallback()

  useScrollAnimation(setScrollProgress)

  return (
    <main>
      {supported
        ? <Suspense fallback={null}><Scene scrollProgress={scrollProgress} /></Suspense>
        : <video
            autoPlay muted loop playsInline
            style={{ position: 'fixed', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 0, opacity: 0.3 }}
            src="/video/emr-demo.mp4"
          />
      }
      <div id="page-content">
        <Hero />
        <STTSection />
        <AISection />
        <LevelsSection />
        <SpeedSection />
        <SecuritySection />
        <CTASection />
      </div>
    </main>
  )
}
