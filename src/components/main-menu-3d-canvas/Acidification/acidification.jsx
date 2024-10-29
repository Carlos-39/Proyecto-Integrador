import { OrbitControls, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";

const Acidification = () => {
  const bubblesRef = useRef([]);
  const particlesRef = useRef([]);
  const groupRef = useRef();

  const { scene: deterioratedCoral } = useGLTF(
    "/models/pocillopora_eydouxi.glb"
  );

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
        shadow-bias={-0.0001} // Adjusting bias can help with shadow artifacts
      />
      <pointLight
        position={[-1.5, 1.5, -1.5]}
        intensity={0.6}
        color="#6a93cb"
        castShadow
      />

      <primitive
        object={deterioratedCoral}
        position={[1.5, -0.8, -1.2]}
        scale={0.6}
      />
      <primitive
        object={deterioratedCoral}
        position={[0.5, -0.6, 1.2]}
        scale={0.5}
      />
      <primitive
        object={deterioratedCoral}
        position={[1.0, -0.7, 0.5]}
        scale={0.7}
      />
      <primitive
        object={deterioratedCoral}
        position={[2.0, -0.9, -0.5]}
        scale={0.8}
      />

      {Array.from({ length: 200 }, (_, i) => (
        <mesh
          key={i}
          ref={(el) => (bubblesRef.current[i] = el)}
          position={[
            Math.random() * 12 - 6,
            Math.random() * 4 - 2,
            Math.random() * 12 - 6,
          ]}
          castShadow // Habilitar sombras en las burbujas
        >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#6fc2e3" transparent opacity={0.7} />
        </mesh>
      ))}

      {particles.map((particle, index) => (
        <mesh
          key={index}
          ref={(el) => (particlesRef.current[index] = el)}
          position={[particle.x, particle.y, particle.z]}
          castShadow // Enable shadows on particles
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#f2f2f2" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

export default Acidification;
