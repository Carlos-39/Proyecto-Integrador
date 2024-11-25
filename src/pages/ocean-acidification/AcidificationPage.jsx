import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import "./AcidificationPage.css";
import acercaImg from "../../assets/images/Acerca_del_tema_acidificacion.png";
import quiz from "../../assets/images/Quiz_Acidificacion.jpg";
import Header from '../../components/Header/Header.jsx'

// Importing the Canvas and Acido components
import { Canvas } from '@react-three/fiber';
import Acido from "../../components/main-menu-3d-canvas/Acidification/acidification.jsx";

// Import the coral image
import coralImage from "../../assets/images/ocean_background.jpg"; 

const AcidificationPage = () => {
  const navigate = useNavigate();
  
  const [showContent, setShowContent] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [showHTML3D, setShowHTML3D] = useState(false);
  const [showMoreText, setShowMoreText] = useState(false);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);

  const curiosityFacts = [
    "Los océanos absorben aproximadamente el 30% del CO₂ que los humanos liberamos a la atmósfera, lo que equivale a unos 22 millones de toneladas de CO₂ por día.",
    "El pH de los océanos ha disminuido en un 30% desde la revolución industrial, lo que representa el cambio más rápido en la química oceánica en millones de años.",
    "Si la acidificación continúa al ritmo actual, para el año 2100 el agua del océano podría ser un 150% más ácida que en el siglo XVIII.",
    "La acidificación afecta especialmente a los arrecifes de coral, que podrían desaparecer por completo para el año 2050 si no se toman medidas.",
    "Algunos organismos marinos, como las ostras, ya están teniendo dificultades para formar sus conchas debido a la acidificación del océano."
  ];

  const handleLearnMoreClick = () => {
    navigate("/AcidificationInfoPage");
  };

  // Función para alternar visibilidad con animación
  const toggleContentVisibility = () => {
    setShowHTML3D(!showHTML3D);

    if (showContent) {
      setIsFading(true);
      setTimeout(() => {
        setShowContent(false);
        setIsFading(false);
      }, 500);
    } else {
      setShowContent(true);
    }
    
    // Cambiar al siguiente dato curioso
    setCurrentFactIndex((prevIndex) => 
      prevIndex === curiosityFacts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleShowMoreText = () => {
    setShowMoreText(!showMoreText);
  };

  return (
    <div className="acidification-page">
      <Canvas 
        style={{
          zIndex: "-1", 
          position: "absolute", 
          top: "0", 
          left: "0", 
          width: "100%", 
          height: "100%", 
          background: `url(${coralImage}) no-repeat center center fixed`, 
          backgroundSize: "cover",
        }}
      >
        <Acido position={[2, 0.7, 2]} showHTML3D={showHTML3D} />
      </Canvas>

      <Header/>

      {!showContent && (
        <>
          <button 
            className="floating-toggle-content-btn" 
            onClick={toggleContentVisibility}
          >
            Mostrar contenido
          </button>
          <div className="curiosity-card">
            <h3>¿Sabías que...?</h3>
            <p>{curiosityFacts[currentFactIndex]}</p>
            <button onClick={toggleContentVisibility} className="next-fact-btn">
              Siguiente dato
            </button>
          </div>
        </>
      )}

      {showContent && (
        <main className={`main-content ${isFading ? 'fade-out' : 'fade-in'}`}>
          <h2 className="page-title">Acidificación de los Océanos</h2>
          
          <div className="description-box">
            <p className="description-text">
              La acidificación de los océanos es el resultado de la absorción de dióxido de carbono
              (CO₂) de la atmósfera, lo que aumenta el ácido carbónico y reduce el pH del agua. Desde
              la Revolución Industrial, los océanos han absorbido alrededor del 30% del CO₂ emitido,
              disminuyendo el pH en aproximadamente 0.1 unidades.
            </p>

            {showMoreText && (
              <p className="description-text additional-info">
                Este proceso tiene graves consecuencias para la vida marina, especialmente para
                organismos que construyen conchas y esqueletos de carbonato de calcio como corales,
                moluscos y algunos tipos de plancton. La acidificación también afecta la reproducción
                y desarrollo de muchas especies marinas, amenazando la biodiversidad oceánica y los
                servicios ecosistémicos que proporcionan los océanos.
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
              <h3>Acerca del tema</h3>
              <img 
                src={acercaImg}
                alt="Diagrama de acidificación"
                className="section-image"
              />
              <button className="button learn-more-btn" onClick={handleLearnMoreClick}>
                Aprender más
              </button>
            </div>

            <div className="section-card">
              <h3 className="section-title">Probarme</h3>
              <img 
                src={quiz}
                alt="Quiz imagen"
                className="section-image"
              />
              <button className="button quiz-btn">
                Comenzar quiz
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default AcidificationPage;