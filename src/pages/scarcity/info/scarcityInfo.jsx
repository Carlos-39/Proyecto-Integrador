import Header from "../../../components/Header/Header"
import { Canvas, useFrame } from "@react-three/fiber"
import { BizonSkull } from "../../../components/main-menu-3d-canvas/Scarcity/scarcity-models"
import { OrbitControls, Text3D } from "@react-three/drei"
import { Environment } from "@react-three/drei"
import { useMemo, useRef, useState } from "react"
import { useTexture, Html } from "@react-three/drei"
import "../info/scarcityInfo.css"

const deg2rad = (x) =>
{
    return x*Math.PI/180
}

const HtmlPart = (props) =>
{
        return(
            <Html
                className="info"
                transform
                position={[0, -3, 4]}
            >
                <p>La escasez de agua reduce los suministros de agua potable disponible, 
                    afectando el crecimiento de las plantas y la supervivencia de los animales. 
                    Esto altera los ecosistemas y amenaza la biodiversidad</p>
            </Html>
        )
    
}

const Background = (props) =>
{
    // Se importa el material PBR para el suelo del desierto
    const PATH = useMemo(() => "/materials/mud-cracked/mud_cracked_dry_03_", []);
    const floorTexture = useTexture({
        map: PATH + "diff_1k.jpg",
        displacementMap: PATH + "disp_1k.png",
        roughnessMap: PATH + "rough_1k.jpg",
        ambientOcclusionMap: PATH + "ao_1k.jpg",
    });

    Object.values(floorTexture).forEach((texture) => {
        texture.wrapS = texture.wrapT = texture.RepeatWrapping;
        texture.repeat.set(2,4); // Adjust repetition here
    });

    return(
        <mesh 
            rotation={[0, 0, Math.PI / 2]}
            position={[0, 3, 0]} 
            receiveShadow
            onClick={()=>{props.onClick()}}
            >
            <planeGeometry args={[22, 35]} />
            <meshStandardMaterial {...floorTexture}/>
        </mesh>
    )
}

const SkullInteractuable = (props) =>
{
    const skullRef = useRef()
    
    var r = 0
    var k = false
    var time = 0

    const handleClick = (e) => {
        e.stopPropagation()
        props.onClick()
    }
    useFrame(
        (state, delta) => 
        {  
            time += delta
            if (time > 2.5)
            {
                time = 0
                r = 4
            }
            if (r > 0)
            {
                if (k)
                {
                    skullRef.current.rotation.y -= deg2rad(200)*delta
                }else
                {
                    skullRef.current.rotation.y += deg2rad(200)*delta
                }
    
                if (skullRef.current.rotation.y > deg2rad(-30)){k = true; r -= 1}
                else if (skullRef.current.rotation.y < deg2rad(-60)) {k = false; r -= 1}
            }
            if (deg2rad(-30) <= skullRef.current.rotation.y ||
            deg2rad(-60) >= skullRef.current.rotation.y)
            {
                skullRef.current.rotation.y = deg2rad(-45)
            }

            skullRef.current.rotation.x = deg2rad(90)
            skullRef.current.rotation.z = 0
        })

    return(
        <BizonSkull
            position={[-10,1,0]}
            rotation={[deg2rad(90), deg2rad(-45), deg2rad(0)]}
            ref={skullRef}
            onClick={handleClick}
        />
    )
}

const ScarcityAbout = () =>
{
    const [visible, setVisible] = useState(false)
    return(
        <group>
            <Text3D
                position={[-5, 3, 0.2]}
                font={"/fonts/CollegeStar.json"}
                onClick={() => {setVisible(false)}}
            >
                ¿que es la escasez?
                <meshStandardMaterial/>
            </Text3D>
            {visible && (<HtmlPart/>)}
            <Background onClick={() => {setVisible(false)}}/>
            <Environment
                preset={"sunset"}
            />
            <SkullInteractuable onClick={()=>{setVisible(true)}}/>
        </group>
    )
}

const scarcityInfo = () =>
{
    return(
        <>
            <Header/>
            <Canvas 
                shadows 
                camera={{position: [0, 0, 10]}}
                style={{height: "100vh",
                        width: "100%",
                        position: "absolute",
                        top: "0px", left: "0px"}}
            >
                <ScarcityAbout/>
                <OrbitControls
                    enablePan={false}
                    enableRotate={false}
                    enableZoom={false}
                />

            </Canvas>
        </>
    )
}

export default scarcityInfo