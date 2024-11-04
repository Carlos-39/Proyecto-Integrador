import React from "react";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import useAuthStore from "../../stores/use-auth-store";
import "./AcidificationPage.css";
import projectLogo from "../../assets/images/logo.png";
import acerca from "../../assets/images/Acerca_del_tema_acidificacion.png";
import quiz from "../../assets/images/Quiz_Acidificacion.jpg";

const AcidificationPage = () => {
  const { user, observeAuthState } = useAuthStore();
  const navigate = useNavigate(); // Hook para navegar entre rutas
  
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
    navigate("/AcidificationInfoPage"); // Navega a la página de información cuando se hace clic
  };

  return (
    <div className="acidification-page">
      <header className="header">
        <div className="logo-container">
          <img
            src={projectLogo}
            alt="BlueSphere Studios Logo"
            className="logo"
          />
          <div className="company-info">
            <h1 className="title">BlueSphere Studios</h1>
          </div>
        </div>
        <div className="user-info">
          <span className="username">Hola, {username}</span>
          <div className="trophy-container">
            <FaTrophy className="trophy-icon" />
            <span>Trofeos</span>
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
            <h3 className="section-title">Acerca del tema</h3>
            <img 
              src={acerca}
              alt="Diagrama de acidificación"
              className="section-image"
            />
            <button className="button learn-more-btn" onClick={handleLearnMoreClick}>
            <button className="button learn-more-btn">

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
