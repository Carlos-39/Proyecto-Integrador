import React, { useRef, useMemo } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const CoralModel = ({ positions, scale }) => {
  const { nodes, materials } = useGLTF('/models/models-3d/acidification/Coral2.glb');
  const coralGroupRef = useRef();

  // Apply smooth movement to the entire coral group over time
  useFrame(() => {
    if (coralGroupRef.current) {
      // Sinusoidal movement for a floating effect (all corals move together)
      coralGroupRef.current.position.y = Math.sin(Date.now() / 1000) * 0.5; // Floating up and down
      coralGroupRef.current.rotation.y += 0.005; // Slow rotation for added effect
      coralGroupRef.current.position.x = Math.sin(Date.now() / 2000) * 0.5; // Slight horizontal movement for variety
      coralGroupRef.current.position.z = Math.cos(Date.now() / 3000) * 0.5; // Slight backward and forward movement
    }
  });

  return (
    <>
      <group ref={coralGroupRef}>
        {positions.map((pos, i) => (
          <group key={i} position={pos} scale={scale}>
            {Object.values(nodes).map((mesh, index) => (
              mesh.geometry && (
                <mesh
                  key={`${i}-${index}`}
                  geometry={mesh.geometry}
                  material={materials[Object.keys(materials)[0]]}
                  castShadow
                  receiveShadow
                />
              )
            ))}
          </group>
        ))}
      </group>
    </>
  );
};

const OceanScene = () => {
  // Define positions for Coral2, with more distance between them
  const coralPositions = useMemo(
    () => [
      [-4, -2.5, 1],
      [3, -2.5, -2],
      [0, -2.5, -5],
      [-3, -2.5, -3],
    ],
    []
  );

  return (
    <>
      {/* Background color */}
      <color attach="background" args={['#0E3B43']} /> {/* Dark blue background */}
      
      {/* Lighting */}
      <ambientLight intensity={0.5} color="#88ccee" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[0, 5, 0]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={0.8}
        castShadow
        color="#99ddee"
      />

      {/* Coral2 */}
      <CoralModel positions={coralPositions} scale={[2, 2, 2]} />

      {/* Camera Controls */}
      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
    </>
  );
};

export default OceanScene;

// Preload Coral2 model
useGLTF.preload('/models/models-3d/acidification/Coral2.glb');