import React from "react";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import "./AcidificationPage.css";
import projectLogo from "../../assets/images/logo.png";
import acercaImg from "../../assets/images/Acerca_del_tema_acidificacion.png";
import quiz from "../../assets/images/Quiz_Acidificacion.jpg";

// Importing the Canvas and Acido components
import { Canvas } from '@react-three/fiber';
import Acido from "../../components/main-menu-3d-canvas/Acidification/acidification.jsx";

// Import the coral image
import coralImage from "../../assets/images/ocean_background.jpg"; 

const AcidificationPage = () => {
  const { user, observeAuthState } = useAuthStore();
  const navigate = useNavigate();
  
  React.useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  const capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const username = user ? capitalizeWords(user.displayName) : "Invitado";

  const handleLearnMoreClick = () => {
    navigate("/AcidificationInfoPage");
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
          height: "100vh", 
          background: `url(${coralImage}) no-repeat center center fixed`, 
          backgroundSize: "cover",
        }}
      >
        <Acido position={[0, -1, 0]} />
      </Canvas>

      <header className="header">
        <div className="logo-container">
          <img src={projectLogo} alt="BlueSphere Studios Logo" className="logo"/>
          <div className="company-info">
            <h1>BlueSphere Studios</h1>
            <p>Explora los Problemas Ambientales del Agua</p>
          </div>
        </div>
        <div className="user-info">
          <span className="username">{username}</span>
          <div className="trophy-container" title="Ver Trofeos">
            <FaTrophy className="trophy-icon" />
            <span className="trophy-text">Trofeos</span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <h2 className="page-title">Acidificación de los Océanos</h2>
        
        <div className="description-box">
          <p className="description-text">
            La acidificación de los océanos es el resultado de la absorción de dióxido de carbono
            (CO₂) de la atmósfera, lo que aumenta el ácido carbónico y reduce el pH del agua. Desde
            la Revolución Industrial, los océanos han absorbido alrededor del 30% del CO₂ emitido,
            disminuyendo el pH en aproximadamente 0.1 unidades. Esto perjudica a organismos
            marinos como corales y moluscos, amenazando ecosistemas y comunidades costeras.
          </p>
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
    </div>
  );
};

export default AcidificationPage;
