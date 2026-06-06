import { useState, lazy, Suspense, useEffect } from 'react'
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
  const [sceneVisible, setSceneVisible] = useState(false)
  const { supported } = useWebGLFallback()

  useScrollAnimation(setScrollProgress, setSceneVisible)

  return (
    <main>
      {supported
        ? (
            <div style={{
              opacity: sceneVisible ? 1 : 0,
              transition: 'opacity 0.8s ease',
              pointerEvents: sceneVisible ? 'auto' : 'none',
            }}>
              <Suspense fallback={null}><Scene scrollProgress={scrollProgress} sceneVisible={sceneVisible} /></Suspense>
            </div>
          )
        : <video
            autoPlay muted loop playsInline
            style={{ position: 'fixed', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 0, opacity: 0.3 }}
            src="/video/emr-demo.mp4"
          />
      }
      <div id="page-content">
        <Hero />
        <div id="features-wrapper">
          <STTSection />
          <AISection />
          <LevelsSection />
          <SpeedSection />
          <SecuritySection />
        </div>
        <CTASection />
      </div>
    </main>
  )
}
