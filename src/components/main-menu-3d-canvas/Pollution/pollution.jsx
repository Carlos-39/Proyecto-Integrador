import { OrbitControls, useTexture, useGLTF, Html, Environment, Sky, Stars, Cloud } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import './pollution.css'

const Pollution = ({ showHTML3D, ...props }) => {
    const toxicWaste = useGLTF("models/Pollution/uploads_files_4314177_Crate_2x.glb")
    const { nodes, materials } = useGLTF("models/Pollution/toxic_waste_barrel.glb")

    // Ajuste de escala y posición
    toxicWaste.scene.scale.set(3, 3, 3);
    toxicWaste.scene.position.set(-4, -1.3, -3);

    // La ruta base para las texturas del suelo
    const PATH = useMemo(() => "materials/water/playground_sand_", []);

    // Se cargan las texturas del suelo
    const floorTexture = useTexture({
        map: PATH + "diff_1k.jpg",
        displacementMap: PATH + "disp_1k.png",
        normalMap: PATH + "nor_gl_1k.jpg",
        roughnessMap: PATH + "rough_1k.jpg",
        ambientOcclusionMap: PATH + "ao_1k.jpg"
    });

    Object.values(floorTexture).forEach((texture) => {
      texture.wrapS = texture.wrapT = texture.RepeatWrapping;
      texture.repeat.set(4, 4);
    });

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

            {/* Luz ambiental para simular una sombra difusa */}
            <ambientLight intensity={0.4} color={[1, 1, 0.9]} />

            {/* Luz direccional como fuente de luz principal */}
            <directionalLight
                ref={directionalLightRef}
                position={[10, 10, 10]}
                intensity={2.5}
                color={[1, 0.9, 0.8]}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={30}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
            />

            {/* Luz de relleno para iluminar áreas oscuras */}
            <directionalLight
                position={[-8, 5, -8]}
                intensity={1.5}
                color={[0.8, 0.9, 1]}
                castShadow
            />

            {/* Entorno y ambiente */}
            <Environment preset="night" background={false} />
            <Sky distance={450000} sunPosition={[0, 1, -0.5]} inclination={0.6} azimuth={0.1} turbidity={10} rayleigh={0.2} />
            
            {/* Nubes */}
            <Cloud opacity={0.3} speed={0.2} width={15} depth={3} segments={20} position={[0, 2, -3]} color="#6b8e23" />
            <Cloud opacity={0.4} speed={0.15} width={15} depth={3} segments={15} position={[-5, 4, 3]} color="#859F3D" />
            <Cloud opacity={0.5} speed={0.15} width={12} depth={2} segments={15} position={[5, 0, ]} color="#F6FCDF" />
            <Cloud opacity={0.4} speed={0.15} width={15} depth={3} segments={15} position={[-3, 0, 2]} color="#859F3D" />

            {/* Estrellas */}
            <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={0.1} />

            {/* renderizacion del primer objeto -> basura toxica */}
            <mesh castShadow receiveShadow>
              <primitive object={toxicWaste.scene}/>
            </mesh>

            {/* renderizacion del segundo objeto -> Barril toxico */}
            <group {...props} dispose={null}>
              <group name="Sketchfab_Scene" scale={[0.05, 0.05, 0.05]} position={[3, -2, 2]}>
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                  <group name="ToxicBarrelfbx" rotation={[Math.PI / 2, 0, 0]}>
                    <group name="RootNode">
                      <group name="Barrel_1_Extrude_1_1">
                        <mesh
                          name="Barrel_1_Extrude_1_1_Barrel_0"
                          geometry={nodes.Barrel_1_Extrude_1_1_Barrel_0.geometry}
                          material={materials.Barrel}
                          castShadow
                          receiveShadow
                        />
                        <group name="Grnd">
                          <mesh
                            name="Grnd_Grnd_0"
                            geometry={nodes.Grnd_Grnd_0.geometry}
                            material={materials.Grnd}
                            castShadow
                            receiveShadow
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>

            <mesh position={[0, -2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[20, 20, 0.1, 32]}/>
                <meshStandardMaterial {...floorTexture}/>
            </mesh>

            {/* Renderización de HTML3D solo si showHTML3D es true */}
            {showHTML3D && (
              <Html position={[0, 0, 0]}>
                <div className="pollution-info-container">
                  <div className="pollution-info">
                    <h1>¿Sabías que...?</h1>
                    <p>Más de 1,5 mil millones de personas carecen de acceso a agua limpia debido a la contaminación.</p>
                  </div>
                  <div className="pollution-info">
                    <h1>¿Sabías que...?</h1>
                    <p>La contaminación del agua contribuye a la extinción de especies y afecta ecosistemas acuáticos completos.</p>
                  </div>
                  <div className="pollution-info">
                    <h1>¿Sabías que...?</h1>
                    <p>Los productos químicos y residuos tóxicos en el agua generan problemas graves de salud pública.</p>
                  </div>
                </div>
              </Html>
            )}
        </>
    );
};

export default Pollution;

// Precarga de los modelos GLTF para optimizar su carga en la escena
useGLTF.preload("models/Pollution/uploads_files_4314177_Crate_2x.glb")
useGLTF.preload("models/Pollution/toxic_waste_barrel.glb")
