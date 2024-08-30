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
                rotateSpeed={10}
            />
            <ambientLight intensity={0.5}/>
            <directionalLight position={[0,10,10]}/>
            <group ref={model}>
            <mesh>
                <boxGeometry args={[1,1,1]} />
                <meshToonMaterial color={"red"} />
            </mesh>
            </group>
        </>;
    };

export default CloudObject