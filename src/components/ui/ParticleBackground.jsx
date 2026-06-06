import { useEffect, useRef } from 'react'

export default function ParticleBackground() {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId
    let isVisible = true
    let mouse = { x: -9999, y: -9999 }

    // Resize handler
    function resize() {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking
    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    // Particle class
    class Particle {
      constructor() { this.reset() }
      reset() {
        this.x    = window.innerWidth / 2
        this.y    = window.innerHeight / 2
        this.vx   = (Math.random() - 0.5) * 2
        this.vy   = (Math.random() - 0.5) * 2
        this.size = Math.random() * 3 + 2 // Increased length of the dash
        this.baseAlpha = Math.random() * 0.6 + 0.2
        this.alpha = 0
        this.targetAlpha = 0
        // Target orbit radius for the swirl. Reduced bias to Math.pow(x, 2) to spread particles out more and lower the density
        this.orbitRadius = Math.pow(Math.random(), 2) * 700 + 20
        // Determine whether this particle swirls clockwise or counter-clockwise (or we can make them all swirl same way)
        this.swirlDirection = 1 // All swirl same way like a galaxy
      }
      update() {
        if (mouse.x !== -9999) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist > 0) {
            const dirX = dx / dist
            const dirY = dy / dist
            
            // Tangent direction for swirling
            const tangX = -dirY * this.swirlDirection
            const tangY = dirX * this.swirlDirection
            
            // Pulsating effect using sine wave over time
            const time = Date.now() * 0.002
            // Pulse expands and contracts the orbit by up to 15%
            const pulse = Math.sin(time) * (this.orbitRadius * 0.15)
            
            // Gentle force to maintain pulsating orbit radius
            const radialForce = (dist - (this.orbitRadius + pulse)) * 0.001
            this.vx += dirX * radialForce
            this.vy += dirY * radialForce
            
            // Swirling force - faster near the center, slower further out
            const swirlForce = Math.min(100 / dist, 2) * 0.04
            this.vx += tangX * swirlForce
            this.vy += tangY * swirlForce
          }

          // Random jitter
          this.vx += (Math.random() - 0.5) * 0.2
          this.vy += (Math.random() - 0.5) * 0.2
          
          // Friction to stabilize the swarm
          this.vx *= 0.94
          this.vy *= 0.94
          
          this.targetAlpha = this.baseAlpha
        } else {
          // When inactive, drift smoothly and fade out
          this.targetAlpha = 0
          this.vx *= 0.98
          this.vy *= 0.98
        }

        // Smoothly interpolate alpha
        this.alpha += (this.targetAlpha - this.alpha) * 0.08

        this.x += this.vx
        this.y += this.vy
      }
      draw() {
        if (this.alpha < 0.01) return
        
        // Calculate angle based on velocity to make them look like shooting lines/dashes
        const angle = Math.atan2(this.vy, this.vx)
        
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(angle)
        
        // Calculate distance from cursor for the gradient effect
        const dx = mouse.x !== -9999 ? mouse.x - this.x : 0
        const dy = mouse.y !== -9999 ? mouse.y - this.y : 0
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        // Gradient from Cyan (0, 184, 232) at center to Royal Blue (43, 58, 159) at edges
        const mix = Math.min(dist / 500, 1)
        const r = Math.round(0 + mix * (43 - 0))
        const g = Math.round(184 + mix * (58 - 184))
        const b = Math.round(232 + mix * (159 - 232))

        ctx.beginPath()
        ctx.moveTo(-this.size, 0)
        ctx.lineTo(this.size, 0)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        
        ctx.restore()
      }
    }

    const PARTICLE_COUNT = window.innerWidth < 768 ? 1000 : 3500
    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle())

    // Connection lines removed per user request

    // Draw cursor glow ring
    function drawCursorRing() {
      if (mouse.x === -9999) return
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, 80
      )
      gradient.addColorStop(0, 'rgba(0, 184, 232, 0.06)')
      gradient.addColorStop(1, 'rgba(0, 184, 232, 0)')
      ctx.beginPath()
      ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Animation loop
    function animate() {
      if (!isVisible) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCursorRing()
      particles.forEach(p => { p.update(); p.draw() })
      animationId = requestAnimationFrame(animate)
    }

    // Intersection Observer — pause when hero is off screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) animate()
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas.closest('section') || canvas.parentElement)

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
