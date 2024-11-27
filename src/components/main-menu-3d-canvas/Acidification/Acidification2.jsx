import React, { useRef, useMemo } from 'react';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Coral = ({ position }) => {
  const { nodes, materials } = useGLTF('/models/coral.glb');
  const coralRef = useRef();

  useFrame(() => {
    if (coralRef.current) {
      coralRef.current.rotation.y += 0.005; // Animación lenta de rotación
    }
  });

  return (
    <group ref={coralRef} position={position} dispose={null} scale={[2, 2, 2]}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[-Math.PI, 0, 0]}>
          {Object.values(nodes).map((mesh, index) => (
            mesh.geometry && (
              <mesh
                key={index}
                geometry={mesh.geometry}
                material={materials.material0}
                castShadow
                receiveShadow
              />
            )
          ))}
        </group>
      </group>
    </group>
  );
};

const Rocks = ({ modelPath, positions }) => {
  const { nodes, materials } = useGLTF(modelPath);

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} position={pos} scale={[3, 3, 3]}> {/* Aumentamos la escala aquí */}
          {Object.values(nodes).map((mesh, index) => (
            mesh.geometry && (
              <mesh
                key={`${i}-${index}`}
                geometry={mesh.geometry}
                material={materials[Object.keys(materials)[0]]}
              />
            )
          ))}
        </group>
      ))}
    </>
  );
};

const OceanScene = () => {
  // Posiciones para las rocas
  const rockPositions = useMemo(
    () => [
      [-2, -1.5, -2],
      [1, -1.8, 1],
      [3, -2, -3],
    ],
    []
  );

  return (
    <>
      <color attach="background" args={['#1A374D']} /> {/* Fondo azul oscuro */}
      <ambientLight intensity={0.6} color="#88ccee" />
      <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

      {/* Coral */}
      <Coral position={[0, -2, 0]} />

      {/* Rocas */}
      <Rocks modelPath="/models/models-3d/acidification/Smallrocks.glb" positions={rockPositions} />

      {/* Control de cámara */}
      <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} />
    </>
  );
};

export default OceanScene;

// Preload models
useGLTF.preload('/models/coral.glb');
useGLTF.preload('/models/models-3d/acidification/Smallrocks.glb');
