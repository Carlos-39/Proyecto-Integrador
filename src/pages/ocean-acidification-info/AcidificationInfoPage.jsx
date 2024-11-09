import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";
import useAuthStore from "../../stores/use-auth-store";
import "./AcidificationInfoPage.css";
import projectLogo from "../../assets/images/logo.png";
import oceanProblem from "../../assets/images/ocean_problem.jpg";
import oceanSolution from "../../assets/images/ocean_solution.jpg";
import Carousel from "../../components/Carousel";
import Header from '../../components/Header/Header.jsx'

const AcidificationInfoPage = () => {
  const { user, observeAuthState } = useAuthStore();

  const navigate = useNavigate();

  const backToMainMenu = () => {
    navigate("/AcidificationPage"); // Navega a la página de información cuando se hace clic
  };

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

  const consequences = [
    "Los corales tienen dificultad para construir sus estructuras, lo que lleva a la degradación de los ecosistemas.",
    "Los moluscos enfrentan problemas para formar sus conchas, lo que pone en riesgo su supervivencia.",
    "La acidificación altera la cadena alimentaria y disminuye la biodiversidad en los océanos.",
    "Esto afecta el equilibrio de los ecosistemas, lo que repercute en las comunidades costeras.",
  ];

  return (
    <div className="acidification-info-page">
      <Header username={username} />

      <main className="main-content">
        <h2 className="page-title">Acidificación de los Océanos</h2>

        <section className="description-box">
          <h3>Problemática</h3>
          <p className="description-text">
            La acidificación de los océanos es el proceso por el cual el agua del mar se vuelve más ácida debido al dióxido de carbono (CO₂) absorbido de la atmósfera. Este fenómeno ha aumentado en un 30% desde la Revolución Industrial, alterando la química del agua. A medida que el nivel de CO₂ aumenta, el pH del agua disminuye, afectando gravemente a los ecosistemas marinos. Esto no solo amenaza la vida marina, sino que también impacta la economía de las comunidades costeras que dependen de la pesca y el turismo.
          </p>
        </section>

        <section className="sections-container">
          <div className="section-card">
            <h3>Consecuencias de la acidificación</h3>
            <Carousel items={consequences} />
            <img src={oceanProblem} alt="Consecuencias de la acidificación" className="section-image" />
            <button className="button learn-more-btn">Conoce más...</button>
          </div>

          <div className="section-card">
            <h3>Soluciones</h3>
            <p className="section-text text2">
              Para combatir la acidificación de los océanos, es esencial reducir las emisiones de CO₂ a nivel global. Esto incluye promover el uso de energías renovables, mejorar la eficiencia energética y fomentar la conservación de los ecosistemas naturales que absorben carbono, como los bosques y humedales. Además, la creación de áreas marinas protegidas puede ayudar a restaurar los ecosistemas marinos y aumentar la resiliencia de las especies frente a cambios ambientales. La educación y la concienciación pública también juegan un papel crucial en el impulso de acciones comunitarias y políticas efectivas.
            </p>
            <img src={oceanSolution} alt="Soluciones para la acidificación" className="section-image" />
            <button className="button learn-more-btn">Conoce más...</button>
          </div>
        </section>

        <section className="button-group">
          <button className="btn main-button" onClick={backToMainMenu}>Volver al menú principal</button>
          <button className="btn quiz-button">Quiero probarme</button>
        </section>
      </main>
    </div>
  );
};

export default AcidificationInfoPage;
