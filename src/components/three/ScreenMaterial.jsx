import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const IMAGES = ['/video/dashboard.png', '/video/emr.png']

// Scroll ranges for each image (normalized 0–1)
// dashboard.png shows from 0.0 to 0.4, crossfade happens 0.4–0.55, emr.png from 0.55 to 1.0
const FADE_START = 0.4
const FADE_END = 0.55

export default function ScreenMaterial({ mesh, scrollProgress = 0 }) {
  const texturesRef = useRef([])
  const mixRef = useRef(0)
  const shaderRef = useRef(null)
  const { gl } = useThree()

  useEffect(() => {
    if (!mesh?.material) return

    const maxAnisotropy = gl.capabilities.getMaxAnisotropy()
    const loader = new THREE.TextureLoader()
    const textures = IMAGES.map((src) => {
      const tex = loader.load(src)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.flipY = true
      tex.anisotropy = maxAnisotropy
      tex.minFilter = THREE.LinearFilter
      tex.magFilter = THREE.LinearFilter
      tex.generateMipmaps = false
      return tex
    })
    texturesRef.current = textures

    // Create a custom ShaderMaterial for crossfading
    const shader = new THREE.ShaderMaterial({
      uniforms: {
        uTex1: { value: textures[0] },
        uTex2: { value: textures[1] },
        uMix: { value: 0.0 },
        uEmissiveIntensity: { value: 0.55 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex1;
        uniform sampler2D uTex2;
        uniform float uMix;
        uniform float uEmissiveIntensity;
        varying vec2 vUv;
        void main() {
          vec4 color1 = texture2D(uTex1, vUv);
          vec4 color2 = texture2D(uTex2, vUv);
          vec4 mixed = mix(color1, color2, uMix);
          gl_FragColor = mixed * (1.0 + uEmissiveIntensity);
        }
      `,
    })

    mesh.material = shader
    mesh.material.needsUpdate = true
    shaderRef.current = shader

    return () => {
      textures.forEach((t) => t.dispose())
      shader.dispose()
    }
  }, [mesh])

  useFrame(() => {
    if (!shaderRef.current) return

    const p = scrollProgress ?? 0
    // Compute mix factor: 0 before FADE_START, 1 after FADE_END, lerp in between
    let mix = 0
    if (p >= FADE_END) {
      mix = 1
    } else if (p > FADE_START) {
      mix = (p - FADE_START) / (FADE_END - FADE_START)
    }

    // Smooth the transition
    mixRef.current = THREE.MathUtils.lerp(mixRef.current, mix, 0.08)
    shaderRef.current.uniforms.uMix.value = mixRef.current
  })

  return null
}
