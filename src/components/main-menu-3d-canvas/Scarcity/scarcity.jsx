import { OrbitControls, useTexture, useGLTF  } from "@react-three/drei"; //library for the controllers
import { useMemo } from "react";

const Desert = () => 
    {
        // Se importa el material PBR para el suelo del desierto
        const PATH = useMemo(() => "materials/mud-cracked/mud_cracked_dry_03_", []);
        const floorTexture = useTexture({
            map: PATH + "diff_1k.jpg",
            normalMap: PATH + "nor_gl_1k.jpg",
            roughnessMap: PATH + "rough_1k.jpg",
            ambientOcclusionMap: PATH + "ao_1k.jpg",
        });
        Object.values(floorTexture).forEach((texture) => {
            texture.wrapS = texture.wrapT = texture.RepeatWrapping;
            texture.repeat.set(4, 4); // Adjust repetition here
        });
    
        // Importa el modelo 3d del craneo
        const skull = useGLTF("models/bizon-skull.glb");
        skull.scene.scale.set(0.5, 0.5, 0.5);
        skull.scene.position.set(-4, -2, -2);

        // Importa el modelo 3d del cactus
        const cactus = useGLTF("models/cactus.glb");
        cactus.scene.scale.set(3, 3, 3);
        cactus.scene.rotateY(Math.PI*0.25);
        cactus.scene.position.set(3, -2, 2);

        // Define los componentes para la escena
        return <>
        {/*Define el movimiento de la camara para que orbite independiente */}
            <OrbitControls
                enablePan={false}
                enableRotate={false}
                enableZoom={false}
                autoRotate={true}
                autoRotateSpeed={1}
            />
        
        {/* Define las luces e iluminacion */}
            <ambientLight intensity={0.5} color={[1, 0.969, 0.62]}/>
            <directionalLight
                position={[10, 5, 6]}
                color={[0.7,0.7,0.5]}
                intensity={10}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-far={10}
                shadow-camera-left={-3}
                shadow-camera-right={5}
                shadow-camera-top={1}
                shadow-camera-bottom={-1}
                shadow-bias={-0.01} 
                castShadow
            />
        {/* Renderiza los objetos del craneo y el cactus */}
            <mesh castShadow receiveShadow>
                <primitive object={skull.scene}/>
            </mesh>
            <mesh castShadow receiveShadow>
                <primitive object={cactus.scene}/>
            </mesh>

        {/* Renderiza el piso con materiales PBR */}
            <mesh position={[0, -2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[20, 20, 0.1, 32]}/>
                <meshStandardMaterial {...floorTexture}/>
            </mesh>
            
        </>;
    };
export default Desert

useGLTF.preload("models/cactus.glb");
useGLTF.preload("models/bison-skull.glb");