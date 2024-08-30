import { TrackballControls } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const CloudObject = () => 
    {
        const model = useRef(null);
        let x = 0
        useFrame((state, delta) => {
            model.current.position.y = Math.cos(x/4);
            x += 0.1
            if(x > 2*Math.pi)
                {
                    x = 0
                }
        })

        return <>
            <TrackballControls
                noPan={true}
                noRotate={true}
            />
            <ambientLight intensity={0.5}/>
            <directionalLight position={[0,10,10]}/>
            <group ref={model}>
            <mesh
                name={"right eye"}
                position={[-0.8,1,1.2]}
            >
                <sphereGeometry args={[0.5,20,20]} />
                <meshPhongMaterial color={"black"} shininess={300} reflectivity={1}/>
            </mesh>
            <mesh
                name={"left eye"}
                position={[0.8,1,1.2]}
            >
                <sphereGeometry args={[0.5,20,20]} />
                <meshPhongMaterial color={"black"} shininess={300} reflectivity={1}/>
            </mesh>
            <mesh
                name={"middle cloud part"}
            >
                <sphereGeometry args={[2,20,20]} />
                <meshToonMaterial color={"white"}/>
            </mesh>
            <mesh
                name={"left cloud part"}
                position={[1.5,0,0]}
            >
                <sphereGeometry args={[1.5,20,20]} />
                <meshToonMaterial color={"white"}/>
            </mesh>
            <mesh
                name={"right cloud part"}
                position={[-1.5,0,1]}
            >
                <sphereGeometry args={[1,20,20]} />
                <meshToonMaterial color={"white"}/>
            </mesh>
            </group>
        </>;
    };

export default CloudObject