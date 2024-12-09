import React, { useRef, useMemo, useState } from 'react';
import { useGLTF, OrbitControls, Html, Environment, Sky, Stars, Cloud } from '@react-three/drei';
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
                castShadow
                receiveShadow
              />
            )
          ))}
        </group>
      ))}
    </>
  );
};

const OceanScene = () => {
  const rockPositions = useMemo(
    () => [
      [-2, -1.5, -2],
      [1, -1.8, 1],
      [3, -2, -3],
    ],
    []
  );

  const [isHovered, setIsHovered] = useState(false);

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

      {/* Estrellas */}
      <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.1} />

      {/* Nubes */}
      <Cloud opacity={0.3} speed={0.2} width={15} depth={3} segments={20} position={[0, 2, -3]} color="#6b8e23" />
      <Cloud opacity={0.4} speed={0.15} width={15} depth={3} segments={15} position={[-5, 4, 3]} color="#859F3D" />
      <Cloud opacity={0.5} speed={0.15} width={12} depth={2} segments={15} position={[5, 0, 0]} color="#F6FCDF" />
      <Cloud opacity={0.4} speed={0.15} width={15} depth={3} segments={15} position={[-3, 0, 2]} color="#859F3D" />

      {/* Texto informativo sobre la contaminación, que aparece al pasar el mouse */}
      {isHovered && (
        <Html position={[0, -1, 0]}>
          <div className="tooltip">
            <p>Los corales son vitales para la salud del océano.</p>
          </div>
        </Html>
      )}

      {/* Texto informativo sobre las rocas */}
      {isHovered && (
        <Html position={[1, -1, 1]}>
          <div className="tooltip">
            <p>Las rocas proporcionan hábitats a muchas especies marinas.</p>
          </div>
        </Html>
      )}

      {/* Fondo y ambiente */}
      <Environment preset="night" background={false} />
      <Sky distance={450000} sunPosition={[0, 1, -0.5]} inclination={0.6} azimuth={0.1} turbidity={10} rayleigh={0.2} />
    </>
  );
};

export default OceanScene;

// Precarga de los modelos GLTF
useGLTF.preload('/models/coral.glb');
useGLTF.preload('/models/models-3d/acidification/Smallrocks.glb');
