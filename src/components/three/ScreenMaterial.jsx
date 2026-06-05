import { useEffect, useRef } from 'react'
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
