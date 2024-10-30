import { OrbitControls, useTexture, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Pollution = (props) => {
    // La ruta base para las texturas del suelo
    const PATH = useMemo(() => "materials/water/water_0020_", []);

    // Se cargan las texturas del suelo
    const floorTexture = useTexture({
        map: PATH + "color_1k.jpg",
        normalMap: PATH + "normal_opengl_1k.png",
        roughnessMap: PATH + "roughness_1k.jpg",
        ambientOcclusionMap: PATH + "ao_1k.jpg",
    });

    // Carga del primer modelo 3D
    const { nodes, materials } = useGLTF("models/toxic_waste.glb")

    // Carga del segundo modelo 3D
    const toxicWasteDrum = useGLTF("models/toxic_waste_drum.glb")
    toxicWasteDrum.scene.scale.set(0.3, 0.3, 0.3);
    toxicWasteDrum.scene.position.set(-0.5, -0.268, 0.5);

    // Referencia para la luz direccional
    const directionalLightRef = useRef();

    // Hook para animar la luz direccional
    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (directionalLightRef.current) {
            directionalLightRef.current.position.x = 2 * Math.cos(elapsedTime);
            directionalLightRef.current.position.z = 2 * Math.sin(elapsedTime);
        }
    });

    return (
        <>  
            {/* movimiento de la cámara para que orbite independiente */}
            <OrbitControls
                enablePan={false}
                enableRotate={false}
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={1}
            />

            {/* Iluminaciones de la escena */}
            <ambientLight intensity={0.4} color={[1, 0.969, 0.62]} />

            <directionalLight 
                ref={directionalLightRef}
                position={[2, 2, 2]} 
                intensity={1.2} 
                color={[1, 0.8, 0.5]}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={10}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
            />
            <pointLight 
                position={[-1.5, 1.5, -1.5]} 
                intensity={0.4} 
                color={[0.5, 0.7, 1]}
            />

            {/* renderizacion del primer objeto -> basura toxica */}
            <group {...props} dispose={null}>
              <group 
                name="Sketchfab_Scene"
                scale={[0.5, 0.5, 0.5]} 
                position={[0, -0.268, -1.5]}
                >
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="Toxicobjcleanermaterialmergergles">
                    <mesh
                      name="Object_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_2.geometry}
                      material={materials.None}
                    />
                    <mesh
                      name="Object_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Object_3.geometry}
                      material={materials['None_DefaultMaterial_albedo.jpg']}
                    />
                  </group>
                </group>
              </group>
            </group>

             {/* renderizacion del segundo objeto -> Barril toxico */}
            <mesh castShadow receiveShadow>
                <primitive object={toxicWasteDrum.scene}/>
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <circleGeometry args={[4, 64]} />
                <meshStandardMaterial {...floorTexture}/>
            </mesh>
        </>
    );
};

export default Pollution;

// Precarga de los modelos GLTF para optimizar su carga en la escena
useGLTF.preload("models/toxic_waste.glb")
useGLTF.preload("models/toxic_waste_drum.glb")
