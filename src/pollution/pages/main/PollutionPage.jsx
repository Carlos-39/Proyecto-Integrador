import './PollutionPage.css'

import Header from '../../../components/Header/Header.jsx'

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import acercaImg from "../../assets/pollutionMoreAboutIMG.jpg";
import quizIMG from "../../assets/quizPollutionIMG.jpg";

// Importing the Canvas and Acido components
import { Canvas } from '@react-three/fiber';
import Pollutionbg from "../../components/pollution.jsx";

// Import the coral image
import PollutionImage from "../../assets/pollutionIMG.jpg"; 

const PollutionPage = () => {
	const navigate = useNavigate();

	const [showContent, setShowContent] = useState(true);
	const [isFading, setIsFading] = useState(false);
	const [showHTML3D, setShowHTML3D] = useState(false);
	const [showMoreText, setShowMoreText] = useState(false);


	const handleLearnMoreClick = () => {
		navigate("/Menu/Contaminacion/Info");
	};

	// Función para alternar visibilidad con animación
	const toggleContentVisibility = () => {
			setShowHTML3D(!showHTML3D); // Alterna la visibilidad del HTML3D

    	if (showContent) {
        	// Si se muestra el contenido, desactiva la visibilidad con la animación de desvanecimiento
        	setIsFading(true);

        	setTimeout(() => {
        	    setShowContent(false);
        	    setIsFading(false);
        	}, 500);
    	} else {
        // Si está oculto, solo activa el contenido sin desvanecimiento
        setShowContent(true);
    	}
	};

	const toggleShowMoreText = () => {
		setShowMoreText(!showMoreText);
	};

	return (
		<div className="pollution-page">
    		<Canvas 
    			style={{
    				zIndex: "-1", 
    				position: "absolute", 
    				top: "0", 
    				left: "0", 
    				width: "100%", 
    				height: "100%", 
    				background: `url(${PollutionImage}) no-repeat center center fixed`, 
    				backgroundSize: "cover",
    			}}
    		>

    			{/* Pollutionbg siempre visible; recibe prop showHTML3D */}
    			<Pollutionbg position={[2, 0.7, 2]} showHTML3D={showHTML3D} />
    		</Canvas>

      		<Header/>

			{!showContent && (
                <button 
                    className="floating-toggle-content-btn" 
                    onClick={toggleContentVisibility}
                >
                    Mostrar contenido
                </button>
            )}

			{showContent && (
				<main className={`main-content ${isFading ? 'fade-out' : 'fade-in'}`}>
					<h2>Contaminación del Agua</h2>
			
					<div className="description-box">
						<p className="description-text">
							La contaminación del agua es uno de los mayores problemas ambientales. Se produce cuando
							sustancias químicas, desechos y contaminantes ingresan en ríos, lagos y océanos,
							dañando los ecosistemas y afectando la salud humana y animal.
						</p>

						{showMoreText && (
							<p className="description-text additional-info">
								La falta de conciencia y regulaciones laxas agravan la situación, ya que industrias y comunidades
								arrojan desechos tóxicos en cuerpos de agua sin tratamiento adecuado. Estos contaminantes incluyen
								metales pesados, plásticos y productos químicos, los cuales pueden afectar gravemente la biodiversidad
								y la cadena alimentaria.
							</p>
						)}

						<button className="toggle-more-btn" onClick={toggleShowMoreText}>
							{showMoreText ? "Mostrar menos" : "Leer más"}
						</button>
					</div>

					<div className="sensibilizacion-box" onClick={toggleContentVisibility}>
						<p className="sensibilizacion-text">¿Sabías que...?</p>
					</div>
			
					<div className="sections-container">
						<div className="section-card">
							<h3>Conoce más</h3>
							<img src={acercaImg} alt="Imagen sobre contaminación del agua" className="section-image" />
							<button className="button learn-more-btn" onClick={handleLearnMoreClick}>Aprender más</button>
						</div>
			
						<div className="section-card">
							<h3 className="section-title">Probarme</h3>
							<img src={quizIMG} alt="Quiz imagen" className="section-image" />
							<button className="button quiz-btn">Comenzar quiz</button>
						</div>
					</div>
				</main>
			)}
    	</div>
	);
};

export default PollutionPage;
