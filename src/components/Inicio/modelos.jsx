import { useGLTF } from "@react-three/drei";

export const Ocean = (props) => {
  const { nodes, materials } = useGLTF("/models/Inicio/ocean.glb");

  return (
    <group {...props} dispose={null}>
        <group name="Scene" onClick={(e) => e.stopPropagation()}>
          <group name="Ocean" >
            <mesh
              name="Ocean_1"
              geometry={nodes.Ocean_1.geometry}
              material={materials.SeaBottomMaterial}
            />
            <mesh
              name="Ocean_2"
              geometry={nodes.Ocean_2.geometry}
              material={materials.FishMaterial}
            />
            <mesh
              name="Ocean_3"
              geometry={nodes.Ocean_3.geometry}
              material={materials.CoralRockMaterial}
            />
          </group>
          <mesh
            name="Coral"
            geometry={nodes.Coral.geometry}
            material={materials.UrchentBodyMaterial}
          />
        </group>
      </group>
  );
};

export const Octopus = (props) => {
  const { nodes, materials } = useGLTF("/models/inicio/octopus.glb");

  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={octopusRef}
          name="Octopus"
          geometry={nodes.Octopus.geometry}
          material={materials.OctopusMaterial}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models-3d/octopus.glb");
useGLTF.preload("/models-3d/ocean.glb");
