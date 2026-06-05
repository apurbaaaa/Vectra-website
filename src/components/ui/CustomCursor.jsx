import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef   = useRef()
  const ringRef  = useRef()

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let animId

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`
      animId = requestAnimationFrame(animate)
    }

    const onEnter = () => ring.classList.add('hovered')
    const onLeave = () => ring.classList.remove('hovered')

    document.addEventListener('mousemove', onMove)

    // Observe DOM for interactive elements and attach hover listeners
    const attachHoverListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachHoverListeners()

    animate()

    // Re-attach on DOM changes
    const observer = new MutationObserver(attachHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
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
          margin: -8px;
        }
        @media (max-width: 768px) {
          .cursor-ring, [style*="zIndex: 99999"] { display: none !important; }
        }
      `}</style>
    </>
  )
}
