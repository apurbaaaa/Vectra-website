// useWebGLFallback.js — WebGL support detection
// Will be fully implemented in Prompt 2
import { useState, useEffect } from 'react'

export function useWebGLFallback() {
  const [supported, setSupported] = useState(true)
  const [lowPerf, setLowPerf] = useState(false)

  useEffect(() => {
    // Check mobile
    const isMobile = window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)
    if (isMobile) { setSupported(false); return }

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
      if (!gl) setSupported(false)
    } catch { setSupported(false) }

    let frames = 0
    const start = performance.now()
    const count = () => {
      frames++
      if (performance.now() - start < 3000) requestAnimationFrame(count)
      else if (frames / 3 < 30) setLowPerf(true)
    }
    requestAnimationFrame(count)
  }, [])

  return { supported, lowPerf }
}
