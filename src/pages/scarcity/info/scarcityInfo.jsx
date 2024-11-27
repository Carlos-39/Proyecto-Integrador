import Header from "../../../components/Header/Header"
import { Canvas, useFrame } from "@react-three/fiber"
import { BizonSkull } from "../../../components/main-menu-3d-canvas/Scarcity/scarcity-models"
import { KeyboardControls, OrbitControls, Text3D, useKeyboardControls } from "@react-three/drei"
import { Environment } from "@react-three/drei"
import { forwardRef, useMemo, useRef, useState } from "react"
import { useTexture, Html } from "@react-three/drei"
import "../info/scarcityInfo.css"
import { map } from "ionicons/icons"
import { div } from "three/webgpu"

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
                position={props.position}
            >
                <p>{props.text}</p>
            </Html>
        )
    
}

const Background = (props) =>
{
    return(
        <mesh 
            rotation={[0, 0, Math.PI / 2]}
            position={props.position} 
            receiveShadow
            onClick={()=>{props.onClick()}}
            >
            <planeGeometry args={[22, 35]} />
            <meshStandardMaterial {...props.texture}/>
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

const ScarcityAbout = forwardRef((props, ref) =>
{
    const [visible, setVisible] = useState(false)

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
        <group ref={ref}>
            <Text3D
                position={[-6, 3, 0.2]}
                font={"/fonts/CollegeStar.json"}
                onClick={() => {setVisible(false)}}
            >
                ¿que es la escasez?
                <meshStandardMaterial/>
            </Text3D>
            <HtmlPart 
            text = "El agua es vida, pero su escasez ya afecta a millones de personas en el mundo. Cada gota cuenta, y lo que hoy desperdiciamos podría faltar mañana. Cambiar nuestros hábitos, como cerrar el grifo al cepillarnos los dientes o reparar fugas, puede marcar una gran diferencia. Cuidar el agua no es solo una responsabilidad, es un acto de amor hacia el planeta y las futuras generaciones. ¡Actuemos juntos!"
            position = {[0, -1, 4]}
            />
            <Background 
                onClick={() => {setVisible(false)}}
                texture={floorTexture}
                position={[0,3,0]}
            />
            <Environment
                preset={"sunset"}
            />
            <SkullInteractuable onClick={()=>{setVisible(true)}}/>
        </group>
    )
})

const ScarcitySolutions = forwardRef((props, ref) =>
{
    const [visible, setVisible] = useState(false)
    // Se importa el material PBR para el suelo del desierto
    const PATH = useMemo(() => "/materials/grass/leafy_grass_", []);
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
        <group ref={ref}>
            <Text3D
                position={[-8, -13, 0.2]}
                font={"/fonts/CollegeStar.json"}
                onClick={() => {setVisible(false)}}
            >
                ¿Como lo solucionamos?
                <meshStandardMaterial/>
            </Text3D>
            <Background 
                onClick={() => {setVisible(false)}}
                texture={floorTexture}
                position={[0,-18.5,0]}
            />
            <HtmlPart 
                text = "Enfrentar la escasez de agua requiere acción y compromiso. El uso responsable es fundamental, reduciendo el desperdicio en actividades cotidianas como ducharse o lavar. También es importante fomentar la reutilización, implementando sistemas para recolectar agua de lluvia y aprovechar aguas grises. La tecnología puede ser una aliada, con soluciones como la desalinización y métodos más eficientes de riego agrícola. Además, la conservación de fuentes naturales y la prevención de la contaminación son esenciales para garantizar agua para el presente y las futuras generaciones."
                position = {[0, -17, 4]}
            />
        </group>
    )
})

const Content = () =>
{
    const groupRef = useRef(null)
    var [destiny, setDestiny] = useState(0)
    useFrame((state, delta) => {
        const y = groupRef.current.position.y
        const value = 8 * delta
        if (y < destiny)
        {
            groupRef.current.position.y += y + value <= destiny ? value : destiny - y
        }
        if (y > destiny)
        {
            groupRef.current.position.y -= y - value >= destiny ? value : y - destiny
        }
    })
    
    
    return(
        <> 
            <Html
                transform
                position={[-15,0,0]}
            >
                <div className="arrows">
                    <div 
                        className="arrow-up"
                        onClick={()=>{setDestiny(0)}}
                    />
                    <div 
                        className="arrow-down"
                        onClick={()=>{setDestiny(17)}}
                    />
                </div>
            </Html>
            <group ref={groupRef}>
                <ScarcityAbout/>
                <ScarcitySolutions/>
            </group>
        </>
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
                <Content/>
                <OrbitControls
                enableRotate={false}
                enableZoom={false}
                />
            </Canvas>

        </>
    )
}

export default scarcityInfo