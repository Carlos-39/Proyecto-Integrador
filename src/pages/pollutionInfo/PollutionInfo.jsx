import "./PollutionInfo.css";

import { useNavigate } from "react-router-dom";
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text3D, Text, useGLTF } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import Header from "../../components/Header/Header.jsx";
import Pollution from "../../components/main-menu-3d-canvas/Pollution/pollution.jsx";
import { FaArrowLeft } from 'react-icons/fa';  // Icono de "Volver"

// Componente de elementos cayendo con físicas
const FallingElements = () => {
	// Ruta de modelos 3D
	const pollutionIcons = [
		"/public/models/Pollution/cc0_-_tin_can_4_1k.glb",
		"/public/models/Pollution/uploads_files_2995321_waterbottle.glb",
	];

	// Número de objetos que caerán
  	const totalObjects = 10;

	// lista de objetos con posiciones y rotaciones aleatorias
  	const models = Array.from({ length: totalObjects }, (_, i) => ({
		icon: pollutionIcons[Math.floor(Math.random() * pollutionIcons.length)],
		id: `falling-object-${i}`,
		position: [
		  Math.random() * 10 - 5,
		  10 + Math.random() * 10,
		  Math.random() * 10 - 5,
		],
		rotation: [
		  Math.random() * Math.PI * 2, // Aleatorio en el eje X
		  Math.random() * Math.PI * 2, // Aleatorio en el eje Y
		  Math.random() * Math.PI * 2, // Aleatorio en el eje Z
		],
  	}));

  	return (
    	<>	
			{/* Renderiza cada modelo como un cuerpo rígido */}
    		{models.map(({ icon, id, position, rotation }) => (
        		<RigidBody
					key={id}
					position={position}
					rotation={rotation}
					type="dynamic"
					colliders="hull"
					restitution={0.7}
					friction={0.5}
					onCollisionEnter={() => {
					// Al colisionar, aplica un torque aleatorio
					models.body.applyTorque([Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1]);
		  			}}
	  			>
          			<primitive object={useGLTF(icon).scene} scale={3}>
          				<meshStandardMaterial transparent opacity={0.7} color="lightblue" />
          			</primitive>
        		</RigidBody>
      		))}
    	</>
 	);
};

const PollutionInfo = () => {
  	const navigate = useNavigate();

  	const handleBackClick = () => {
		navigate("/MainMenu/Pollution");
	};

	// Estado para alternar entre "Problemas" y "Soluciones"
  	const [activeSection, setActiveSection] = useState("problems");

	// Texto para las secciones de problemas y soluciones
  	const sections = {
  	  	problems: [
  	  	  	"Plásticos en océanos y ríos.",
  	  	  	"Vertido de residuos industriales.",
  	  	  	"Uso excesivo de pesticidas.",
  	  	  	"Contaminación térmica de fábricas.",
  	  	  	"Derrames de petróleo.",
  	  	  	"Falta de tratamiento de aguas residuales urbanas.",
  	  	],
  	  	solutions: [
  	  	  	"Mejorar tratamiento de aguas residuales.",
  	  	  	"Fomentar el uso de bioplásticos.",
  	  	  	"Educar sobre los efectos de la contaminación.",
  	  	  	"Restaurar ecosistemas acuáticos.",
  	  	  	"Invertir en tecnologías de purificación de agua.",
  	  	  	"Establecer leyes estrictas para el control de contaminantes.",
  	  	],
  	};

  	return (
    	<>
      		<Header />
      		<div className="pollution-info-page">
        		<div className="content">
					{/* Contenedor del canvas 3D */}
          			<div className="canvas-container">
            			<Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
              			<Suspense fallback={null}>
                		<Physics gravity={[0, -0.5, 0]}> {/* Ajusta la gravedad para que caigan lentamente */}
                		  	<Pollution showHTML3D={false} disableAutoRotate={true} />
                		  	<Text3D position={[-3, 4, 5]} font="/public/KG-Architecturally-Artistic_Regular.json" size={0.7} height={0.3} anchorX="center" anchorY="middle">
                		  	  	{activeSection === "problems" ? "Problemas" : "Soluciones"}
                		  	  	<meshStandardMaterial color="#fb8500" />
                		  	</Text3D>
                		  	<Text position={[0.5, 2.8, 5]} fontSize={0.7} color="#000814" anchorX="center" anchorY="middle">
                		  	  	de la Contaminación del Agua
                		  	</Text>
                		  	<ambientLight intensity={0.5} />
                		  	<directionalLight position={[10, 10, 5]} intensity={1} />
                		  	<FallingElements />
                		  	<OrbitControls enablePan={false} enableZoom={false} autoRotate={false} />
                		</Physics>
              			</Suspense>
            			</Canvas>
          			</div>
					
					{/* Sección de información con botones de navegación */}
          			<div className="info-section">
            			<button className="back-button" onClick={handleBackClick}>
            			  <FaArrowLeft /> Volver
            			</button>
            			{sections[activeSection].map((text, index) => (
            			  <p key={index} className="info-text">{text}</p>
            			))}
            			<div className="section-controls-inline">
            			  <button onClick={() => setActiveSection("problems")} className={activeSection === "problems" ? "active" : ""}>Problemas</button>
            			  <button onClick={() => setActiveSection("solutions")} className={activeSection === "solutions" ? "active" : ""}>Soluciones</button>
            			</div>
          			</div>
        		</div>
      		</div>
    	</>
  	);
};

export default PollutionInfo;