import { OrbitControls } from "@react-three/drei"; //library for the controllers
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber"; //library to animate the object
import { useTexture, useGLTF } from "@react-three/drei";

const CloudObject = () => 
    {
        const PATH = useMemo(() => "materials/mud-cracked/mud_cracked_dry_03_", [])
        const floorTexture = useTexture({
            map: PATH + "diff_1k.jpg",
            normalMap: PATH + "nor_gl_1k.jpg",
            roughnessMap: PATH + "rough_1k.jpg",
            ambientOcclusionMap: PATH + "ao_1k.jpg",
        })
        const skybox = useGLTF("models/skybox.glb");
        console.log(skybox)
        skybox.scene.scale.set(2, 2, 2);
        //defines the animation of the cloud

        //defines the cloud model shape and texture
        return <>
            <OrbitControls
                enablePan={false}
                enableRotate={false}
                enableZoom={false}
                autoRotate={true}
            />
            <ambientLight intensity={0.5}/>
            <directionalLight position={[0,10,10]}/>
            <mesh>
                <primitive object={skybox.scene}/>
                
            </mesh>
        </>;
    };

export default CloudObject

useGLTF.preload("models/skybox.glb");