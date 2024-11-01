import { OrbitControls, useTexture } from "@react-three/drei"; //library for the controllers
import { useMemo } from "react";
import { Cactus, BizonSkull, Can } from "../Scarcity/scarcity-models.jsx"

const Desert = () => 
    {
        // Se importa el material PBR para el suelo del desierto
        const PATH = useMemo(() => "materials/mud-cracked/mud_cracked_dry_03_", []);
        const floorTexture = useTexture({
            map: PATH + "diff_1k.jpg",
            displacementMap: PATH + "disp_1k.png",
            roughnessMap: PATH + "rough_1k.jpg",
            ambientOcclusionMap: PATH + "ao_1k.jpg",
        });
        Object.values(floorTexture).forEach((texture) => {
            texture.wrapS = texture.wrapT = texture.RepeatWrapping;
            texture.repeat.set(4, 4); // Adjust repetition here
        });

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
                color={[0.9804, 0.8980, 0.4392]}
                intensity={2}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                castShadow
            />
        {/* Renderiza los objetos del craneo y el cactus */}
            <BizonSkull position={[-4, -2, -3]}/>
            <Can position={[4, -2, -3]}/>
            <Cactus position={[3, -2, 2]} />

        {/* Renderiza el piso con materiales PBR */}
            <mesh position={[0, -2, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[20, 20, 0.1, 32]}/>
                <meshStandardMaterial {...floorTexture}/>
            </mesh>
            
        </>;
    };
export default Desert
