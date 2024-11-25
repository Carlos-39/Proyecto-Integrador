import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, 
         OrbitControls,
         useTexture,
         Html } from "@react-three/drei";
import { Cactus, BizonSkull, WindVane, WoodSign } from "../../components/main-menu-3d-canvas/Scarcity/scarcity-models";
import { useMemo, useRef, useState } from "react";
import Header from "../../components/Header/Header.jsx"
import "../scarcity/scarcity.css"
import scarcityImage from "../../assets/images/escacez_agua.jpg"
import quizImage from "../../assets/images/Quiz_Acidificacion.jpg"

const Content = () =>
  {
    const windVaneRef = useRef(null)
    const [speed, setSpeed] = useState(0)

    useFrame((_, delta) => 
    {
      if(speed > 0)
      {
        setSpeed(speed - 3*delta)
      }

      if(speed < 0)
      {
        setSpeed(0)
      }

      if(windVaneRef !== null)
      {
        windVaneRef.current.rotation.y += speed * delta

        if(windVaneRef.current.rotation.y > 360)
        {
          windVaneRef.current.rotation.y -= 360
        }
      }
    })

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
        texture.repeat.set(40, 40); // Adjust repetition here
    });

    // Define los componentes para la escena
    return(

      <>
        <OrbitControls
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <Environment
          files={'hdris/scarcitySkybox.hdr'}
          background={true}
          environmentIntensity={0}
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
            <BizonSkull 
              position={[-8, -8, 4]}
              rotation={[0, -Math.PI/4, 0]}
              onClick={(e)=>{e.stopPropagation()}}
            />
            <Cactus 
              position={[-20, -8, -2]}
              onClick={(e)=>{e.stopPropagation()}}
            />
            <WindVane 
              position={[25.5, 0, -4]}
              ref={windVaneRef}
              onClick={(e)=>{setSpeed(20)}}
            />
            <WoodSign
              position={[34, -8, -6]}
              scale={[1.5, 1.5, 1.5]}
              rotation={[0, -Math.PI/4, 0]}
              onClick={(e)=>{e.stopPropagation()}}
            />
        {/* Renderiza el piso con materiales PBR */}
            <mesh 
              position={[0, -8, 0]}
              castShadow
              receiveShadow
              onClick={(e)=>{e.stopPropagation()}}
            >
                <cylinderGeometry args={[180, 40, 0.1, 32]}/>
                <meshStandardMaterial {...floorTexture}/>
            </mesh>
      </>
    )
  }

const HtmlContent = () =>
  {
    return(
      <Html
        transform
        occlude="raycast"
        className="Html3D"
        position={[0,0,0]}
      >
        <main className="main-content">
          <h2 className="page-title">Escasez</h2>
          
          <div className="description-box">
            <p className="description-text">
            La escasez de agua es un desafío creciente que afecta a millones de personas en todo el mundo. 
            El agotamiento de fuentes de agua dulce, debido a la sobreexplotación, el cambio climático y 
            la contaminación, está reduciendo la disponibilidad de este recurso vital. Se estima que más de 2 
            mil millones de personas viven en regiones con estrés hídrico, lo que pone en riesgo la seguridad alimentaria, 
            la salud y el desarrollo económico. Si no se toman medidas urgentes, la escasez de agua podría intensificarse, 
            afectando gravemente a las comunidades más vulnerables.
            </p>
          </div>

          <div className="sections-container">
            <div className="section-card">
              <h3>Acerca del tema</h3>
              <img 
                src={scarcityImage}
                alt="Diagrama de acidificación"
                className="section-image"
                draggable="false"
              />
              <button className="button learn-more-btn" onClick={() => {}}>
                Aprender más
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-title">Probarme</h3>
              <img 
                src={quizImage}
                alt="Quiz imagen"
                className="section-image"
                draggable="false"
              />
              <button className="button quiz-btn">
                Comenzar quiz
              </button>
            </div>
          </div>
        </main>
      </Html>
    )
  }

export default () =>
  {

    return (
      <>
        <Header/>
        <Canvas
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: "0px",
            left: "0px",
          }}
          camera={{position: [0, 0, 16]}}
          shadows
        >
          <Content/>
          <HtmlContent/>
        </Canvas>
      </>
    );
  }