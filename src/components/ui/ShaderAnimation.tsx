"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function ShaderAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<{
    camera: THREE.Camera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    uniforms: {
      time: { type: string; value: number }
      resolution: { type: string; value: THREE.Vector2 }
    }
    animationId: number
  } | null>(null)

  useEffect(() => {
    if (!containerRef.current) return
    if (window.innerWidth < 768) return // H-06: Disabled on mobile

    const container = containerRef.current

    // Vertex shader — full-screen quad
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `

    // Fragment shader — remapped to Obsidian Ember palette
    // Ember orange: vec3(1.0, 0.298, 0.0)  (#FF4D00)
    // Warm amber:   vec3(0.9,  0.45, 0.05) (#E6720D)
    // Deep red:     vec3(0.55, 0.08, 0.0)  (#8C1400)
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      // Obsidian Ember palette colours
      // c0 = ember orange, c1 = warm amber-gold, c2 = deep crimson
      vec3 emberPalette(float t) {
        vec3 c0 = vec3(1.0,  0.298, 0.0);   // #FF4D00
        vec3 c1 = vec3(0.88, 0.42,  0.02);  // warm amber
        vec3 c2 = vec3(0.48, 0.06,  0.0);   // deep ember red
        // blend between the three based on the luminance value t
        float s = clamp(t * 2.0, 0.0, 1.0);
        float u = clamp(t * 2.0 - 1.0, 0.0, 1.0);
        return mix(mix(c2, c0, s), c1, u * 0.5);
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t   = time * 0.05;
        float lw  = 0.002;

        // Accumulate a single luminance channel from the ring-interference pattern
        float lum = 0.0;
        for (int i = 0; i < 5; i++) {
          lum += lw * float(i * i)
               / abs(fract(t + float(i) * 0.01) * 5.0
                     - length(uv)
                     + mod(uv.x + uv.y, 0.2));
        }

        // Map luminance → ember palette
        vec3 color = emberPalette(clamp(lum, 0.0, 1.0));

        gl_FragColor = vec4(color, clamp(lum * 1.8, 0.0, 1.0));
      }
    `

    // Initialize Three.js scene
    const camera = new THREE.Camera()
    camera.position.z = 1

    const scene = new THREE.Scene()
    const geometry = new THREE.PlaneGeometry(2, 2)

    const uniforms = {
      time:       { type: "f",  value: 1.0 },
      resolution: { type: "v2", value: new THREE.Vector2() },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,  // needed so alpha channel blends properly
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    // Cap at 1 — this is a decorative overlay, not a photo.
    // At devicePixelRatio 2 the old code rendered 4× the pixels for no visible gain.
    renderer.setPixelRatio(1)
    container.appendChild(renderer.domElement)

    // Handle resize
    const onWindowResize = () => {
      const width  = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      uniforms.resolution.value.x = renderer.domElement.width
      uniforms.resolution.value.y = renderer.domElement.height
    }

    onWindowResize()
    window.addEventListener("resize", onWindowResize, false)

    sceneRef.current = { camera, scene, renderer, uniforms, animationId: 0 }

    // Pause when scrolled offscreen — saves an entire RAF loop
    let isVisible = true
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (!isVisible && sceneRef.current?.animationId) {
          cancelAnimationFrame(sceneRef.current.animationId)
          sceneRef.current.animationId = 0
        } else if (isVisible && sceneRef.current?.animationId === 0) {
          sceneRef.current.animationId = requestAnimationFrame(animateFrame)
        }
      },
      { threshold: 0 }
    )
    if (container) io.observe(container)

    const animateFrame = () => {
      if (!sceneRef.current || !isVisible) return
      const animationId = requestAnimationFrame(animateFrame)
      uniforms.time.value += 0.05
      renderer.render(scene, camera)
      sceneRef.current.animationId = animationId
    }
    animateFrame()

    return () => {
      window.removeEventListener("resize", onWindowResize)
      io.disconnect()
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId)
        if (container && sceneRef.current.renderer.domElement) {
          container.removeChild(sceneRef.current.renderer.domElement)
        }
        sceneRef.current.renderer.dispose()
        geometry.dispose()
        material.dispose()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ overflow: "hidden" }}
    />
  )
}
