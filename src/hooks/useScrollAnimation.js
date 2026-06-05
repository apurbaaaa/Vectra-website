import { useEffect } from 'react'
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
    const ctaContent = document.getElementById('cta-content')
    if (ctaContent) {
      gsap.fromTo(ctaContent,
        { opacity: 0, scale: 0.94, y: 60 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: '#cta', start: 'top 85%' }
        }
      )
    }

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
