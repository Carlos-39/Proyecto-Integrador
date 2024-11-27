import React, { Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls, Environment } from '@react-three/drei';

// Importar modelos
import waterTexture from '/textures/water/water_textures_2k.png';
import arenaModel from '/models/models-3d/acidification/Arena.glb';
import smallRocksModel from '/models/models-3d/acidification/Smallrocks.glb';
import seaweedModel from '/models/models-3d/acidification/Seaweed.glb';
import fishes1Model from '/models/models-3d/acidification/Fishes.glb';
import fishes2Model from '/models/models-3d/acidification/Fishes2.glb';
import starfishModel from '/models/models-3d/acidification/Starfish.glb';
import waterPlant1Model from '/models/models-3d/acidification/Waterplant.glb';
import waterPlant2Model from '/models/models-3d/acidification/Waterplant2.glb';

// Componente para modelos individuales
const Model = ({ model, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }) => {
  const gltf = useLoader(GLTFLoader, model);
  const meshRef = useRef();

  return (
    <primitive 
      ref={meshRef}
      object={gltf.scene} 
      position={position} 
      scale={scale}
      rotation={rotation}
    />
  );
};

// Componente principal de la escena
const OceanAcidificationScene = () => {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      
      {/* Fondo de agua */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial 
          map={useLoader(GLTFLoader, waterTexture)} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* Modelos distribuidos */}
      <Suspense fallback={null}>
        {/* Arena */}
        <Model 
          model={arenaModel} 
          position={[0, -1, 0]} 
          scale={1} 
        />

        {/* Rocas pequeñas */}
        {[[-1, 0, 1], [2, -1, -1], [1, 0, 2]].map((pos, index) => (
          <Model 
            key={`rock-${index}`}
            model={smallRocksModel} 
            position={pos} 
            scale={0.3}
          />
        ))}

        {/* Algas */}
        {[[-2, 0, 1], [2, 0, -2]].map((pos, index) => (
          <Model 
            key={`seaweed-${index}`}
            model={seaweedModel} 
            position={pos} 
            scale={0.5}
          />
        ))}

        {/* Peces */}
        {[
          { model: fishes1Model, pos: [-1, 1, -1] },
          { model: fishes2Model, pos: [1, 0.5, 2] }
        ].map(({ model, pos }, index) => (
          <Model 
            key={`fish-${index}`}
            model={model} 
            position={pos} 
            scale={0.3}
          />
        ))}

        {/* Estrella de mar */}
        <Model 
          model={starfishModel} 
          position={[0, -0.8, 1]} 
          scale={0.2} 
        />

        {/* Plantas acuáticas */}
        {[
          { model: waterPlant1Model, pos: [-2, 0, -1] },
          { model: waterPlant2Model, pos: [2, 0, 1] }
        ].map(({ model, pos }, index) => (
          <Model 
            key={`waterplant-${index}`}
            model={model} 
            position={pos} 
            scale={0.5}
          />
        ))}
      </Suspense>

      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
};

export default OceanAcidificationScene;