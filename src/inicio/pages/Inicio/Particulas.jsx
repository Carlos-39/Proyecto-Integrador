// ParticlesBackground.js
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const Particles = () => {
  const particlesRef = useRef()

  // Animación de las partículas
  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      particlesRef.current.position.y -= 0.002
    }
  })

  // Genera posiciones aleatorias para las partículas
  const particles = new Float32Array(3000).map(() => (Math.random() - 0.5) * 10)

  return (
    <Points ref={particlesRef} positions={particles} stride={3}>
      <PointMaterial transparent opacity={0.1} color="#fff" size={0.1} />
    </Points>
  )
}

const ParticlesBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 70 }}
      style={{ position: 'absolute', top: '100px', left: 0, zIndex: 1 }}
    >
      <ambientLight intensity={0.5} />
      <Particles />
    </Canvas>
  )
}

export default ParticlesBackground
