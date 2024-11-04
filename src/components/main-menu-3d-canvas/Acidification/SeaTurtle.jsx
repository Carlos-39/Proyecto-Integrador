import React from 'react';
import { useGLTF } from '@react-three/drei'; // Import useGLTF from @react-three/drei

const SeaTurtle = (props) => {
  const { nodes, materials } = useGLTF('/path/to/your/turtle-model.glb'); // Load your turtle model

  return (
    <mesh {...props} geometry={nodes.turtle.geometry} material={materials.turtleMaterial}>
      {/* Add additional properties or transformations here if needed */}
    </mesh>
  );
};

export default SeaTurtle;

// Make sure to use the following for loading GLTF files:
useGLTF.preload('/path/to/your/turtle-model.glb'); // Preload your model
