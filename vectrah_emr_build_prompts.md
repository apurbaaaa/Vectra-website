# Vectrah EMR — Promotional Website Build Prompts (Vite + React)
> A high-end, scroll-driven, WebGL-powered single-page promotional website for Vectrah's EMR software.
> The project is already initialized with `npm create vite@latest` using the **React** template.
> Distribute these prompts sequentially in Antigravity. Each prompt is a self-contained build phase.

---

## ⚙️ Project Context (Read Before All Prompts)

**Company:** Vectrah
**Product:** AI-powered Electronic Medical Record (EMR) software
**Audience:** Healthcare professionals — doctors, clinic admins, hospital IT
**Brand Tone:** Modern, trustworthy, cutting-edge, clinical-clean with premium tech feel
**Framework:** Vite + React (already initialized — do NOT re-scaffold)

**Core Libraries to install (across prompts):**
```
three @react-three/fiber @react-three/drei gsap react-router-dom
```

**Key Features to showcase (in scroll order):**
1. Speech-to-Text (STT) — real-time clinical dictation
2. AI Clinical Co-Pilot — ICD coding, drug alerts, differential diagnosis
3. Level Switching — Doctor / Nurse / Admin / Lab roles
4. Under 2 Minutes onboarding
5. HIPAA-compliant, AES-256 security

**Brand Design Tokens:**
```
--color-bg:         #050810
--color-surface:    #0d1117
--color-primary:    #00c8ff   (cyan)
--color-accent:     #7b5cfa   (purple)
--color-text:       #e8edf5
--color-text-muted: #6b7a99
--font-display:     'Syne'    (Google Fonts)
--font-body:        'DM Sans' (Google Fonts)
```

---

---

## PROMPT 1 — Project Structure, Routing & Global Styles

```
The Vite + React project is already initialized. Do NOT run `npm create vite` again.

### Task
Set up the complete project structure, install dependencies, configure routing, and establish the global design system.

### 1. Install Dependencies
Run in terminal:
```bash
npm install three @react-three/fiber @react-three/drei gsap react-router-dom
```

### 2. Final Folder Structure
Restructure `src/` to:
```
src/
  main.jsx
  App.jsx
  index.css               ← global styles + CSS variables
  pages/
    Home.jsx              ← main scroll experience
    About.jsx             ← about page
  components/
    layout/
      Header.jsx
      Footer.jsx
    three/
      Scene.jsx           ← R3F Canvas + laptop model
      LaptopModel.jsx     ← the 3D laptop mesh
      Particles.jsx       ← background particle field
      ScreenMaterial.jsx  ← VideoTexture for laptop screen
    sections/
      Hero.jsx
      FeatureSection.jsx  ← reusable scroll section
      STTSection.jsx
      AISection.jsx
      LevelsSection.jsx
      SpeedSection.jsx
      SecuritySection.jsx
      CTASection.jsx
    ui/
      LoadingScreen.jsx
      ScrollProgress.jsx
      CustomCursor.jsx
  hooks/
    useScrollAnimation.js
    useWebGLFallback.js
  styles/
    variables.css
    animations.css
    components.css
  assets/
    models/               ← laptop.glb goes here
    video/                ← emr-demo.mp4 goes here
```

### 3. Global CSS (`src/index.css`)
Replace the default Vite CSS entirely with:

```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --color-bg:         #050810;
  --color-surface:    #0d1117;
  --color-primary:    #00c8ff;
  --color-accent:     #7b5cfa;
  --color-text:       #e8edf5;
  --color-text-muted: #6b7a99;
  --color-border:     rgba(255,255,255,0.07);
  --font-display:     'Syne', sans-serif;
  --font-body:        'DM Sans', sans-serif;
  --radius-sm:        8px;
  --radius-md:        12px;
  --radius-lg:        20px;
  --transition:       cubic-bezier(0.16, 1, 0.3, 1);
  --max-width:        1200px;
}

html { scroll-behavior: smooth; }

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  line-height: 1.6;
  overflow-x: hidden;
  cursor: none; /* custom cursor will replace */
}

/* WebGL Canvas — fixed full-screen behind everything */
#webgl-canvas-wrapper {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

/* All page content sits above the canvas */
#page-content {
  position: relative;
  z-index: 10;
}

/* Scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb { background: var(--color-primary); border-radius: 2px; }

/* Noise overlay for premium texture */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.022;
  pointer-events: none;
  z-index: 9998;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

### 4. React Router Setup (`src/App.jsx`)
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'
import CustomCursor from './components/ui/CustomCursor'
import ScrollProgress from './components/ui/ScrollProgress'
import { useState } from 'react'

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <BrowserRouter>
      <CustomCursor />
      <ScrollProgress />
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      {isLoaded && (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </>
      )}
    </BrowserRouter>
  )
}
```

### 5. Header Component (`src/components/layout/Header.jsx`)
```jsx
// Fixed top nav with:
// - Logo: "Vectrah" styled with font-display, color primary, letter-spacing 0.1em
// - Nav links: Features · About · Pricing · Contact (using React Router <Link>)
// - CTA button: "Request Demo" — pill shape, bg primary color, hover sweep effect
// - On scroll past 80px: add class "scrolled" → backdrop-filter: blur(16px), semi-transparent bg
// - Mobile: hamburger → slide-in drawer from right
// - Active link styling via useLocation() hook
```
Implement this fully with useState for mobile menu, useEffect for scroll listener.

### 6. Footer Component (`src/components/layout/Footer.jsx`)
```jsx
// Four column layout:
// Col 1: Logo + tagline "AI-powered EMR for modern clinics"
// Col 2: Product — Features, Pricing, Security, Changelog
// Col 3: Company — About, Blog, Careers, Press
// Col 4: Legal — Privacy Policy, Terms, HIPAA Compliance, Cookie Policy
// Bottom bar: © 2025 Vectrah. All rights reserved. | Social icons: LinkedIn, Twitter/X, GitHub
// Style: dark surface bg, subtle top border, generous padding
```

### 7. Home page stub (`src/pages/Home.jsx`)
```jsx
// For now just return:
export default function Home() {
  return (
    <main>
      {/* Three.js canvas will be added in Prompt 2 */}
      {/* Sections will be added in Prompts 3-5 */}
      <div style={{ height: '500vh' }} />
    </main>
  )
}
```

### 8. About page stub (`src/pages/About.jsx`)
```jsx
export default function About() {
  return <main><h1 style={{color:'white',padding:'200px 40px'}}>About — coming in Prompt 6</h1></main>
}
```

### Deliverable
All files created, `npm run dev` starts without errors, routing works between `/` and `/about`, header and footer render correctly.
```

---

---

## PROMPT 2 — React Three Fiber Scene (Laptop Model + Environment)

```
The Vite React project structure from Prompt 1 is complete. Now build the Three.js scene using React Three Fiber.

### Task
Implement the WebGL 3D scene as a React component using `@react-three/fiber` and `@react-three/drei`.

### 1. Scene Wrapper (`src/components/three/Scene.jsx`)
This component renders a full-screen fixed `<Canvas>` behind all page content.

```jsx
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
```

### 2. Laptop Model (`src/components/three/LaptopModel.jsx`)
```jsx
import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { gsap } from 'gsap'
import ScreenMaterial from './ScreenMaterial'

// Camera keyframes for scroll animation
const CAMERA_START = { x: 0, y: 0.5,  z: 4.0 }
const CAMERA_END   = { x: 0, y: 0.08, z: 0.28 }

export default function LaptopModel({ scrollProgress }) {
  const { camera } = useThree()
  const laptopRef = useRef()
  const idleRef = useRef({ active: true })

  // Load the GLTF model
  const { scene, nodes } = useGLTF('/models/laptop.glb')

  useEffect(() => {
    // Center and scale the model
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const scale = 1.5 / size.y
    scene.position.sub(center.multiplyScalar(scale))
    scene.scale.setScalar(scale)
    scene.rotation.x = -0.05
    // Enable shadows on all meshes
    scene.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  useFrame(({ clock }) => {
    if (!laptopRef.current) return
    // Idle float animation — only when not scrolled
    if (idleRef.current.active) {
      laptopRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.03
      laptopRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.04
    }
    // Camera interpolation based on scrollProgress (0 → 1)
    if (scrollProgress !== undefined) {
      const p = scrollProgress
      camera.position.x = CAMERA_START.x + (CAMERA_END.x - CAMERA_START.x) * p
      camera.position.y = CAMERA_START.y + (CAMERA_END.y - CAMERA_START.y) * p
      camera.position.z = CAMERA_START.z + (CAMERA_END.z - CAMERA_START.z) * p
      // Pause idle when scrolling
      idleRef.current.active = p < 0.05
    }
    camera.lookAt(0, 0, 0)
  })

  // Find the screen mesh by name — adjust "Screen" to match your actual .glb mesh name
  const screenMesh = nodes?.Screen || nodes?.screen || nodes?.Display

  return (
    <group ref={laptopRef}>
      <primitive object={scene} />
      {screenMesh && <ScreenMaterial mesh={screenMesh} />}
    </group>
  )
}

useGLTF.preload('/models/laptop.glb')
```

### 3. Screen Material with VideoTexture (`src/components/three/ScreenMaterial.jsx`)
```jsx
import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function ScreenMaterial({ mesh }) {
  const videoRef = useRef()

  useEffect(() => {
    const video = document.createElement('video')
    video.src = '/video/emr-demo.mp4'
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.crossOrigin = 'anonymous'
    videoRef.current = video

    const texture = new THREE.VideoTexture(video)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.flipY = false

    if (mesh.material) {
      mesh.material.map = texture
      mesh.material.emissiveMap = texture
      mesh.material.emissive = new THREE.Color(0xffffff)
      mesh.material.emissiveIntensity = 0.55
      mesh.material.needsUpdate = true
    }

    // Start playing after first user interaction (autoplay policy)
    const startVideo = () => { video.play(); document.removeEventListener('scroll', startVideo) }
    document.addEventListener('scroll', startVideo, { once: true })

    return () => { video.pause(); video.src = '' }
  }, [mesh])

  return null
}
```

### 4. Particles (`src/components/three/Particles.jsx`)
```jsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 200 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 3 + Math.random() * 2
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame(() => { if (ref.current) ref.current.rotation.y += 0.0002 })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#4488ff" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}
```

### 5. Scene Lighting (`src/components/three/SceneLighting.jsx`)
```jsx
export default function SceneLighting() {
  return (
    <>
      <ambientLight color={0x304080} intensity={0.4} />
      <directionalLight
        color={0xffffff} intensity={1.2}
        position={[3, 4, 3]} castShadow
        shadow-mapSize={[2048, 2048]}
      />
      {/* Brand cyan rim light — left */}
      <pointLight color="#00c8ff" intensity={0.8} position={[-2, 1, 2]} />
      {/* Brand purple fill — back right */}
      <pointLight color="#7b5cfa" intensity={0.5} position={[2, -1, -1]} />
    </>
  )
}
```

### 6. WebGL Fallback Hook (`src/hooks/useWebGLFallback.js`)
```js
import { useState, useEffect } from 'react'

export function useWebGLFallback() {
  const [supported, setSupported] = useState(true)
  const [lowPerf, setLowPerf] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setSupported(false)
    } catch { setSupported(false) }

    // Check mobile
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)
    if (isMobile) setSupported(false)

    // FPS check after 3 seconds
    let frames = 0
    let start = performance.now()
    const count = () => {
      frames++
      if (performance.now() - start < 3000) requestAnimationFrame(count)
      else if (frames / 3 < 30) setLowPerf(true)
    }
    requestAnimationFrame(count)
  }, [])

  return { supported, lowPerf }
}
```

### 7. Connect Scene to Home page
Update `src/pages/Home.jsx`:
```jsx
import { useState } from 'react'
import Scene from '../components/three/Scene'
import { useWebGLFallback } from '../hooks/useWebGLFallback'

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const { supported } = useWebGLFallback()

  return (
    <main>
      {supported && <Scene scrollProgress={scrollProgress} />}
      {!supported && (
        <div id="fallback-bg" style={{
          position: 'fixed', inset: 0, zIndex: 0,
          background: 'linear-gradient(135deg, #050810 0%, #0d1a2e 50%, #050810 100%)'
        }} />
      )}
      <div id="page-content">
        {/* Sections added in Prompts 3-5 */}
        <div style={{ height: '500vh' }} />
      </div>
    </main>
  )
}
```

### Note on laptop.glb
Place a Draco-compressed `.glb` file at `public/models/laptop.glb`.
The screen mesh inside the GLB **must be named** `Screen`, `screen`, or `Display`.
If you don't have the file yet, the Suspense fallback will silently wait — the rest of the site still renders.

### Deliverable
`npm run dev` runs without errors. The R3F canvas renders in the background with lighting, particles visible. Console shows no Three.js or R3F errors.
```

---

---

## PROMPT 3 — Loading Screen & Reveal Animation

```
Prompts 1 and 2 are complete. Now build the loading screen and site reveal experience.

### Task
Implement `src/components/ui/LoadingScreen.jsx` and the intro reveal animation using GSAP.

### LoadingScreen Component
```jsx
// src/components/ui/LoadingScreen.jsx
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({ onComplete }) {
  const overlayRef = useRef()
  const fillRef    = useRef()
  const pctRef     = useRef()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate asset loading progress
    // In production, tie this to THREE.LoadingManager or asset fetch promises
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
    const tl = gsap.timeline({ onComplete })
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
    background: 'linear-gradient(90deg, #00c8ff, #7b5cfa)',
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
```

### Scroll Progress Bar (`src/components/ui/ScrollProgress.jsx`)
```jsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef()

  useEffect(() => {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (barRef.current) {
          barRef.current.style.width = (self.progress * 100) + '%'
        }
      }
    })
  }, [])

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '2px', zIndex: 9997, pointerEvents: 'none',
      background: 'rgba(255,255,255,0.05)'
    }}>
      <div ref={barRef} style={{
        height: '100%', width: '0%',
        background: 'linear-gradient(90deg, #00c8ff, #7b5cfa)',
        transition: 'width 0.05s linear'
      }} />
    </div>
  )
}
```

### Custom Cursor (`src/components/ui/CustomCursor.jsx`)
```jsx
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef()
  const ringRef  = useRef()

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovered')
    const onLeave = () => ring.classList.remove('hovered')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    animate()

    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', width: 8, height: 8,
        background: '#00c8ff', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99999,
        top: 0, left: 0,
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: 40, height: 40,
        border: '1.5px solid rgba(0,200,255,0.5)',
        borderRadius: '50%', pointerEvents: 'none',
        zIndex: 99998, top: 0, left: 0,
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }} className="cursor-ring" />
      <style>{`
        .cursor-ring.hovered {
          width: 56px !important; height: 56px !important;
          border-color: rgba(123,92,250,0.7) !important;
          margin: -8px; /* compensate for size change */
        }
      `}</style>
    </>
  )
}
```

### Deliverable
Loading screen appears on page load, animates to 100%, fades out, then the main site content is revealed. Scroll progress bar and custom cursor both work.
```

---

---

## PROMPT 4 — GSAP ScrollTrigger: Camera Zoom + Section Reveals

```
Prompts 1–3 are complete. Now wire up all scroll-driven animations.

### Task
Implement `src/hooks/useScrollAnimation.js` and integrate GSAP ScrollTrigger throughout the Home page.

### 1. Scroll Animation Hook (`src/hooks/useScrollAnimation.js`)
```js
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(onProgressUpdate) {
  useEffect(() => {
    // Master scroll trigger: drives camera zoom via scrollProgress state
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom+=250% top',
      scrub: 1.5,
      onUpdate: (self) => {
        onProgressUpdate?.(self.progress)
      }
    })

    // Section text reveal — applied to all .feature-section elements
    gsap.utils.toArray('.feature-section').forEach((section) => {
      const content = section.querySelector('.feature-content')
      if (!content) return

      gsap.fromTo(content,
        { opacity: 0, y: 45, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 62%',
            end: 'bottom 38%',
            toggleActions: 'play reverse play reverse',
          }
        }
      )

      // Stagger bullet items
      const bullets = section.querySelectorAll('.feature-bullet')
      if (bullets.length) {
        gsap.fromTo(bullets,
          { opacity: 0, x: -16 },
          {
            opacity: 1, x: 0, stagger: 0.07,
            duration: 0.5, ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 58%',
              toggleActions: 'play reverse play reverse',
            }
          }
        )
      }
    })

    // Hero headline parallax
    gsap.to('#hero-headline', {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // CTA entrance
    gsap.from('#cta-content', {
      opacity: 0, scale: 0.94, y: 60,
      duration: 1.1, ease: 'expo.out',
      scrollTrigger: { trigger: '#cta', start: 'top 72%' }
    })

    // Stat counter for #section-speed
    const countObj = { val: 0 }
    ScrollTrigger.create({
      trigger: '#section-speed',
      start: 'top 60%',
      once: true,
      onEnter: () => {
        gsap.to(countObj, {
          val: 2,
          duration: 1.8, ease: 'power2.out',
          onUpdate: () => {
            const el = document.getElementById('stat-minutes')
            if (el) el.textContent = countObj.val.toFixed(1)
          }
        })
      }
    })

    // Header scroll class
    ScrollTrigger.create({
      start: 'top -80',
      end: 99999,
      toggleClass: { className: 'scrolled', targets: 'header' }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}
```

### 2. Wire into Home.jsx
Update `src/pages/Home.jsx`:
```jsx
import { useState } from 'react'
import Scene from '../components/three/Scene'
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
        ? <Scene scrollProgress={scrollProgress} />
        : <div id="fallback-bg" style={{
            position: 'fixed', inset: 0, zIndex: 0,
            background: 'linear-gradient(135deg, #050810, #0d1a2e, #050810)'
          }} />
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
```

### Deliverable
Scrolling the page smoothly updates `scrollProgress` (0→1), which moves the R3F camera. All feature sections fade in/out as you scroll through them. Stats counter animates on the speed section.
```

---

---

## PROMPT 5 — Feature Sections, Hero & CTA Components

```
Prompts 1–4 are complete. Now build all visible section content components.

### Task
Build all section components with full content, styling, and layout.

### Shared Section Styles
Add to `src/styles/components.css` (import in main.jsx):
```css
.feature-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 10vw;
}

.feature-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(5,8,16,0.94) 0%,
    rgba(5,8,16,0.80) 45%,
    transparent 100%
  );
  pointer-events: none;
}

.feature-content {
  position: relative;
  z-index: 2;
  max-width: 520px;
}

.feature-label {
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-primary);
  display: block;
  margin-bottom: 16px;
}

.feature-headline {
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--color-text);
  margin-bottom: 20px;
}

.feature-body {
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--color-text-muted);
  margin-bottom: 28px;
}

.feature-stat {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  color: var(--color-primary);
  margin-bottom: 28px;
  line-height: 1;
}

.feature-stat span {
  display: block;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--color-text-muted);
  letter-spacing: 0.06em;
  margin-top: 6px;
}

.feature-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-bullet {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-text);
}

.feature-bullet::before {
  content: '▸';
  color: var(--color-accent);
  font-size: 0.7rem;
  flex-shrink: 0;
}
```

### Hero Component (`src/components/sections/Hero.jsx`)
```jsx
export default function Hero() {
  return (
    <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '0 10vw' }}>
      <div id="hero-headline" style={{ position: 'relative', zIndex: 2, maxWidth: 680 }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
          Electronic Medical Records — Reimagined
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
          fontWeight: 800, lineHeight: 1.05, color: 'var(--color-text)', marginBottom: 24 }}>
          The Future of<br />
          <span style={{ color: 'var(--color-primary)' }}>Clinical Documentation</span>
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', lineHeight: 1.7,
          color: 'var(--color-text-muted)', maxWidth: 480, marginBottom: 40 }}>
          AI-powered, voice-first EMR built for the way doctors actually work. Setup in under 2 minutes.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a href="#cta" className="btn-primary">Start Free Trial</a>
          <a href="#cta" className="btn-ghost">Watch Demo →</a>
        </div>
        {/* Scroll indicator */}
        <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 10,
          color: 'var(--color-text-muted)', fontSize: '0.78rem', letterSpacing: '0.12em' }}>
          <div className="scroll-chevron" />
          Scroll to explore
        </div>
      </div>
    </section>
  )
}
```

### Feature Section Components
Create each one as a thin wrapper using a shared `FeatureSection` component.

**`src/components/sections/FeatureSection.jsx`** (reusable base):
```jsx
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
```

Now create 5 thin wrappers — each just passes props:

**STTSection.jsx:**
```jsx
import FeatureSection from './FeatureSection'
export default function STTSection() {
  return <FeatureSection
    id="section-stt"
    label="Voice Documentation"
    headline="Speak. Document. Done."
    body="Vectrah's real-time Speech-to-Text engine converts clinical dictation into structured SOAP notes instantly. No typing, no delay — just your voice and the record is complete."
    stat="98.7%"
    statLabel="accuracy on clinical vocabulary"
    bullets={['Real-time transcription', 'Auto-punctuation & formatting', 'Supports 12 languages', 'Works offline']}
  />
}
```

**AISection.jsx:**
```jsx
import FeatureSection from './FeatureSection'
export default function AISection() {
  return <FeatureSection
    id="section-ai"
    label="AI Clinical Support"
    headline="Your AI co-pilot in every consultation."
    body="Vectrah's embedded AI surfaces drug interactions, suggests ICD-10 codes, flags abnormal vitals, and drafts referral letters — all contextually, without interrupting your workflow."
    stat="3×"
    statLabel="faster billing cycle"
    bullets={['Automated ICD-10 / CPT coding', 'Drug interaction alerts', 'Differential diagnosis hints', 'Smart referral generation']}
  />
}
```

**LevelsSection.jsx:**
```jsx
import FeatureSection from './FeatureSection'
export default function LevelsSection() {
  return <FeatureSection
    id="section-levels"
    label="Role-Based Access"
    headline="One system. Every role."
    body="Switch seamlessly between Doctor, Nurse, Admin, and Lab views. Each role sees a tailored interface with the exact tools they need — nothing more, nothing less."
    stat="4"
    statLabel="role levels, one login"
    bullets={['Doctor view', 'Nurse charting mode', 'Admin dashboard', 'Lab integration panel']}
  />
}
```

**SpeedSection.jsx:**
```jsx
import FeatureSection from './FeatureSection'
export default function SpeedSection() {
  return (
    <section id="section-speed" className="feature-section">
      <div className="feature-content">
        <span className="feature-label">Fast Onboarding</span>
        <h2 className="feature-headline">Up and running in under 2 minutes.</h2>
        <p className="feature-body">
          No lengthy training sessions. No IT headaches. Vectrah's guided setup has your clinic fully operational in minutes. Healthcare professionals report going live faster than any EMR they've used before.
        </p>
        <div className="feature-stat">
          <span id="stat-minutes">0.0</span> min
          <span>average onboarding time</span>
        </div>
        <ul className="feature-bullets">
          {['Zero-config setup', 'Role detection wizard', 'Import from existing EMR', 'Live support on day 1'].map((b, i) => (
            <li key={i} className="feature-bullet">{b}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

**SecuritySection.jsx:**
```jsx
import FeatureSection from './FeatureSection'
export default function SecuritySection() {
  return <FeatureSection
    id="section-security"
    label="Security & Compliance"
    headline="HIPAA-compliant. Bank-grade encryption."
    body="Patient data is encrypted at rest and in transit with AES-256. Vectrah is fully HIPAA-compliant with automatic audit logs, role-based data access, and zero-trust architecture."
    stat="SOC 2"
    statLabel="Type II Certified"
    bullets={['AES-256 encryption', 'Automatic HIPAA audit logs', 'Zero-trust access model', '99.99% uptime SLA']}
  />
}
```

### CTA Section (`src/components/sections/CTASection.jsx`)
```jsx
export default function CTASection() {
  return (
    <section id="cta" style={{
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #0f1a2e 0%, #050810 70%)',
      padding: '80px 10vw', textAlign: 'center'
    }}>
      <div id="cta-content">
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: 20 }}>
          Join 500+ clinics already using Vectrah
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 4rem)',
          fontWeight: 700, color: 'var(--color-text)', marginBottom: 20, lineHeight: 1.1 }}>
          Ready to transform your practice?
        </h2>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', marginBottom: 40 }}>
          Start free. No credit card required. Full access for 30 days.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#" className="btn-primary">Start Free Trial</a>
          <a href="#" className="btn-ghost">Book a Demo →</a>
        </div>
      </div>
    </section>
  )
}
```

### Button Styles (add to `src/index.css`)
```css
.btn-primary {
  display: inline-block;
  padding: 14px 32px;
  background: var(--color-primary);
  color: #050810;
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.95rem;
  border-radius: 100px;
  text-decoration: none;
  transition: transform 0.2s var(--transition), box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 200, 255, 0.35);
}
.btn-ghost {
  display: inline-block;
  padding: 14px 32px;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 100px;
  text-decoration: none;
  transition: border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color: var(--color-primary); color: var(--color-primary); }

/* Animated scroll chevron */
.scroll-chevron {
  width: 16px; height: 16px;
  border-right: 2px solid var(--color-primary);
  border-bottom: 2px solid var(--color-primary);
  transform: rotate(45deg);
  animation: bounce 1.6s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: rotate(45deg) translateY(0); opacity: 0.6; }
  50% { transform: rotate(45deg) translateY(5px); opacity: 1; }
}
```

### Deliverable
All sections render with correct content. Scrolling through the page reveals each section in sequence. Buttons styled correctly.
```

---

---

## PROMPT 6 — About Page (`src/pages/About.jsx`)

```
Prompts 1–5 are complete. Now build the full About page.

### Task
Replace the stub `src/pages/About.jsx` with the complete about page. No Three.js here — pure React + CSS.

### Page Structure
The About page shares Header and Footer from App.jsx. Build these sections inside `<main>`:

#### 1. Page Hero
```jsx
<section style={{
  minHeight: '60vh', display: 'flex', alignItems: 'center',
  padding: '120px 10vw 80px',
  background: 'radial-gradient(ellipse at 30% 50%, rgba(0,200,255,0.06) 0%, transparent 60%)'
}}>
  <div>
    <p style={{ /* breadcrumb */ }}>Home / About</p>
    <h1>"Built by clinicians.<br />Designed for care."</h1>
    <p>Vectrah was founded with a single belief: that technology should disappear into the workflow, not disrupt it.</p>
  </div>
</section>
```

#### 2. The Problem We Solve (two-column layout)
Left: Large pull-quote:
> *"Doctors spend 2 hours on paperwork for every 1 hour with patients."*

Right: Paragraph about how Vectrah inverts this ratio. EMRs should feel invisible. Clinical staff deserve tools that match the speed of real medicine.

#### 3. Product Deep-Dive (3×2 card grid)
Six feature cards:
| Icon | Title | Description |
|------|-------|-------------|
| 🎙️ | Speech-to-Text | Real-time dictation, 98.7% medical vocabulary accuracy |
| 🤖 | AI Co-Pilot | ICD coding, drug alerts, differential diagnosis |
| 🔀 | Level Switching | Doctor, Nurse, Admin, Lab — tailored per role |
| ⚡ | 2-Minute Setup | Fastest EMR onboarding in the industry |
| 🔒 | HIPAA Security | AES-256, zero-trust, SOC 2 Type II |
| ☁️ | Cloud-Native | 99.99% uptime SLA, any device, auto-updated |

Card style:
```css
background: var(--color-surface);
border: 1px solid rgba(255,255,255,0.06);
border-radius: var(--radius-lg);
padding: 32px;
transition: transform 0.25s, box-shadow 0.25s;
```
Hover: `transform: translateY(-5px)`, `box-shadow: 0 12px 40px rgba(0,200,255,0.1)`

#### 4. Mission Statement (full-width)
```jsx
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
```

#### 5. Team Section
Heading: `"The team behind Vectrah"`
Subhead: `"A group of developers, physicians, and UX researchers committed to reshaping clinical software."`

Team grid — 3 columns, 6 cards. Each card:
- Avatar: CSS circle with initials, gradient background using brand colors
- Name, Role, 1–2 sentence bio, LinkedIn icon link

Team members:
1. **Dr. Aanya Sharma** — Chief Medical Officer & Co-founder — *12 years of clinical practice. Grew frustrated with legacy EMRs and decided to build a better one.*
2. **Rohan Mehta** — CEO & Co-founder — *Former healthcare IT lead who has scaled SaaS products for hospital networks across South Asia.*
3. **Priya Nair** — Head of AI/ML — *NLP specialist for medical text, focused on making AI feel native to clinical workflows.*
4. **Carlos Vidal** — Lead Full-Stack Engineer — *Architect of the Vectrah platform core. 8 years building HIPAA-compliant cloud systems.*
5. **Dr. Lena Hoffmann** — Clinical UX Researcher — *Bridges the gap between clinical thinking and software design.*
6. **Tariq Al-Rashid** — DevOps & Security Lead — *Responsible for Vectrah's zero-trust infrastructure and SOC 2 compliance.*

#### 6. Timeline (vertical, left-aligned)
```
2022 — Vectrah founded in Kathmandu
2023 — Beta launched with 12 pilot clinics
2024 — AI co-pilot released; 200+ active clinics
2025 — SOC 2 Type II certification; 500+ clinics
2026 — v3.0 launched with real-time STT and level switching
```
Style each entry as a row: year in `var(--color-primary)` on the left, dot connector in the center, description on the right.

#### 7. Contact / Partnership CTA
```jsx
<section style={{ padding: '80px 10vw', textAlign: 'center' }}>
  <h2>Partner with Vectrah</h2>
  <p>Interested in enterprise pricing or a custom deployment?</p>
  <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
    <a href="mailto:hello@vectrah.io" className="btn-primary">hello@vectrah.io</a>
    <a href="#" className="btn-ghost">Schedule a Call →</a>
  </div>
</section>
```

### Page Transitions
Add this to `src/App.jsx` so navigating to `/about` fades smoothly:
```jsx
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { gsap } from 'gsap'

// Inside App component:
const location = useLocation()
useEffect(() => {
  gsap.fromTo('#page-content, main', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
}, [location.pathname])
```

### Deliverable
`/about` route renders the full page. Team cards have hover effects. Timeline renders correctly. Navigation between `/` and `/about` fades smoothly.
```

---

---

## PROMPT 7 — Performance, Mobile Fallback & Final Polish

```
All pages and components are complete. This is the final polish and optimization pass.

### Task
Optimize performance, handle mobile, add final micro-details, and ensure the project is production-ready.

### 1. Vite Config Optimizations (`vite.config.js`)
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three:    ['three'],
          r3f:      ['@react-three/fiber', '@react-three/drei'],
          gsap:     ['gsap'],
          react:    ['react', 'react-dom', 'react-router-dom'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'gsap']
  }
})
```

### 2. Lazy Loading Heavy Components
In `src/pages/Home.jsx`, lazy-load the Scene:
```jsx
import { lazy, Suspense } from 'react'
const Scene = lazy(() => import('../components/three/Scene'))
// wrap with <Suspense fallback={null}>
```

### 3. Pause Render on Tab Visibility
Add to `src/components/three/Scene.jsx`:
```jsx
import { useThree } from '@react-three/fiber'
useEffect(() => {
  const handleVisibility = () => {
    if (document.hidden) gl.setAnimationLoop(null)
    else gl.setAnimationLoop(null) // R3F manages its own loop; just pause expensive work
  }
  document.addEventListener('visibilitychange', handleVisibility)
  return () => document.removeEventListener('visibilitychange', handleVisibility)
}, [gl])
```

### 4. Mobile Fallback (update `useWebGLFallback.js`)
```js
const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)
if (isMobile) { setSupported(false); return }
```
When `supported === false`, show this in Home.jsx instead of the canvas:
```jsx
<video
  autoPlay muted loop playsInline
  style={{ position: 'fixed', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', zIndex: 0, opacity: 0.3 }}
  src="/video/emr-demo.mp4"
/>
```
This creates a moody background with the EMR video for mobile users.

### 5. Mobile Responsive CSS
Add to `src/index.css`:
```css
@media (max-width: 768px) {
  .feature-section { padding: 80px 6vw; }
  .feature-section::before {
    background: linear-gradient(to bottom, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.85) 100%);
  }
  .feature-content { max-width: 100%; }
  .feature-headline { font-size: clamp(1.7rem, 7vw, 2.4rem); }
  #hero { padding: 0 6vw; }
  #hero h1 { font-size: clamp(2.2rem, 9vw, 3.5rem); }

  /* Hide custom cursor on mobile */
  .cursor-ring, [style*="cursor-dot"] { display: none; }
  body { cursor: auto; }
}

@media (max-width: 480px) {
  .btn-primary, .btn-ghost { width: 100%; text-align: center; }
}
```

### 6. SEO & Meta Tags
In `index.html` (the Vite root HTML):
```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Vectrah — AI-Powered EMR Software</title>
<meta name="description" content="Vectrah is a voice-first, AI-powered Electronic Medical Record platform. Setup in under 2 minutes. HIPAA-compliant. Built for modern clinics." />
<meta property="og:title" content="Vectrah — The Future of Clinical Documentation" />
<meta property="og:description" content="AI-powered, voice-first EMR. Built for the way doctors actually work." />
<meta property="og:type" content="website" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 7. Accessibility
- Add `aria-label` to all icon-only buttons (hamburger menu, social links)
- Add `role="navigation"` to `<nav>` elements
- Ensure all `<a>` tags have descriptive text
- Add `:focus-visible` outline styles:
  ```css
  :focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
    border-radius: 4px;
  }
  ```

### 8. Header Scrolled Style (finalize)
Add to `src/index.css`:
```css
header { transition: background 0.3s, backdrop-filter 0.3s; }
header.scrolled {
  background: rgba(5, 8, 16, 0.88) !important;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--color-border);
}
```

### 9. Final Checklist
Verify before marking complete:
- [ ] `npm run build` completes without errors
- [ ] `npm run dev` — loading screen appears and resolves
- [ ] Camera zoom scrubs smoothly with scroll (no jitter)
- [ ] All 5 feature sections fade in and out bidirectionally
- [ ] About page (`/about`) fully renders with team grid and timeline
- [ ] Mobile (<768px): canvas hidden, video fallback plays
- [ ] Header becomes frosted glass after scrolling 80px
- [ ] Custom cursor tracks on desktop
- [ ] Scroll progress bar tracks correctly
- [ ] No console errors or React warnings
- [ ] Build chunks are under 1MB each (check with `npm run build`)

### Deliverable
A production-ready Vite + React site. Run `npm run build && npm run preview` to verify the final build works end-to-end.
```

---

---

## Asset Checklist

Before deploying, place these in the `public/` folder:

| Asset | Path | Notes |
|-------|------|-------|
| Laptop 3D model | `public/models/laptop.glb` | Draco-compressed, <2MB. The screen mesh must be named `Screen` |
| EMR demo video | `public/video/emr-demo.mp4` | 1080p, looping UI walkthrough, H.264 |

**Where to get a free laptop GLB:**
- [poly.pizza](https://poly.pizza) — search "laptop", download free low-poly model
- [Sketchfab](https://sketchfab.com) — filter by "downloadable" + "low poly"
- Then compress: `npx @gltf-transform/cli draco laptop-raw.glb public/models/laptop.glb`

---

## How to Send These Prompts in Antigravity

1. Drop this `.md` file into your project root
2. In the Antigravity chat panel, type:
   > *"Read `vectrah_emr_build_prompts_vite_react.md` and execute **Prompt 1** only."*
3. Wait for it to complete and verify `npm run dev` works
4. Then: *"Execute **Prompt 2** from the build guide."*
5. Repeat through all 7 prompts sequentially

---

*End of Vectrah EMR Vite + React Build Prompts — 7 Phases*
*Optimized for Antigravity sequential agentic execution*
