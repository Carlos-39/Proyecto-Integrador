import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from 'three';

const Acidification = () => {
  const bubblesRef = useRef([]);
  const particlesRef = useRef([]);
  const groupRef = useRef();
  const [phLevel, setPhLevel] = useState(8.2);

  const { scene: deterioratedCoral } = useGLTF(
    "/models/pocillopora_eydouxi.glb"
  );

  // Clone coral model and configure materials
  useEffect(() => {
    const clonedCoral = deterioratedCoral.clone();
    clonedCoral.traverse((node) => {
      if (node.isMesh) {
        node.material = new THREE.MeshStandardMaterial({
          ...node.material,
          transparent: true,
          opacity: 1
        });
      }
    });
  }, [deterioratedCoral]);

  const particles = useMemo(() => {
    return Array.from({ length: 50 }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: Math.random() * 5,
      z: (Math.random() - 0.5) * 8,
    }));
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }

    bubblesRef.current.forEach((bubble) => {
      if (bubble) {
        bubble.position.y += delta * 1.0;
        if (bubble.position.y > 3) bubble.position.y = -1;
      }
    });

    particlesRef.current.forEach((particle) => {
      if (particle) {
        particle.rotation.x += delta * 0.2;
        particle.rotation.z += delta * 0.2;
      }
    });

    // Update coral opacity based on pH level
    groupRef.current?.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material.opacity = phLevel / 8.2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 2.5}
        maxAzimuthAngle={Math.PI / 6}
        minAzimuthAngle={-Math.PI / 6}
        target={[0, -0.3, 0]}
      />

      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.0}
        color="#f5f7fa"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />
      <pointLight
        position={[-1.5, 1.5, -1.5]}
        intensity={0.6}
        color="#6a93cb"
        castShadow
      />

      {/* Coral models */}
      <primitive
        object={deterioratedCoral.clone()}
        position={[1.5, -0.8, -1.2]}
        scale={0.6}
      />
      <primitive
        object={deterioratedCoral.clone()}
        position={[0.5, -0.6, 1.2]}
        scale={0.5}
      />
      <primitive
        object={deterioratedCoral.clone()}
        position={[1.0, -0.7, 0.5]}
        scale={0.7}
      />
      <primitive
        object={deterioratedCoral.clone()}
        position={[2.0, -0.9, -0.5]}
        scale={0.8}
      />

      {/* Bubbles */}
      {Array.from({ length: 200 }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => (bubblesRef.current[i] = el)}
          position={[
            Math.random() * 12 - 6,
            Math.random() * 4 - 2,
            Math.random() * 12 - 6,
          ]}
          castShadow
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial 
            color="#6fc2e3" 
            transparent 
            opacity={0.7 * (phLevel / 8.2)} 
          />
        </mesh>
      ))}

      {/* Particles */}
      {particles.map((particle, index) => (
        <mesh
          key={index}
          ref={(el) => (particlesRef.current[index] = el)}
          position={[particle.x, particle.y, particle.z]}
          castShadow
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color="#f2f2f2" 
            transparent 
            opacity={0.7 * (phLevel / 8.2)}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Acidification;
