import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import LaptopModel from './LaptopModel'
import Particles from './Particles'
import SceneLighting from './SceneLighting'

export default function Scene({ scrollProgress }) {
  return (
    <div id="webgl-canvas-wrapper">
      <Canvas
        camera={{ fov: 45, position: [0, 0.5, 4], near: 0.01, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        style={{ background: '#050810' }}
        onCreated={({ gl }) => {
          const handleVisibility = () => {
            if (document.hidden) gl.setAnimationLoop(null)
            else gl.setAnimationLoop(null) // R3F manages its own loop; just pause expensive work
          }
          document.addEventListener('visibilitychange', handleVisibility)
        }}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          <LaptopModel scrollProgress={scrollProgress} />
          <Particles />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
