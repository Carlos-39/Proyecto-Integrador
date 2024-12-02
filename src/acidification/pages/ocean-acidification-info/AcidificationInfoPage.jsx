import React from "react";
import { useNavigate } from "react-router-dom";
import "./AcidificationInfoPage.css";
import oceanProblem from "../../assets/ocean_problem.jpg";
import oceanSolution from "../../assets/ocean_solution.jpg";
import Carousel from "../../components/carousel/Carousel.jsx";
import Header from '../../../components/Header/Header.jsx';

// React Three Fiber and Three.js imports
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

// Import your 3D model component
import Acidification3D from "../../components/acidification3.jsx";

const AcidificationInfoPage = () => {
  const navigate = useNavigate();

  const backToMainMenu = () => {
    navigate("/Menu/Acidificacion"); // Navega a la página de información cuando se hace clic
  };

  const consequences = [
    "Los corales tienen dificultad para construir sus estructuras, lo que lleva a la degradación de los ecosistemas.",
    "Los moluscos enfrentan problemas para formar sus conchas, lo que pone en riesgo su supervivencia.",
    "La acidificación altera la cadena alimentaria y disminuye la biodiversidad en los océanos.",
    "Esto afecta el equilibrio de los ecosistemas, lo que repercute en las comunidades costeras.",
  ];

  const solutions = [
    "Promover el uso de energías renovables para reducir las emisiones de CO₂.",
    "Mejorar la eficiencia energética en industrias y hogares.",
    "Fomentar la conservación de ecosistemas naturales que absorben carbono, como bosques y humedales.",
    "Crear áreas marinas protegidas para restaurar ecosistemas y aumentar la resiliencia de las especies.",
    "Impulsar la educación y la concienciación pública para promover acciones comunitarias.",
  ];
  
  return (
    <div className="acidification-info-page">
      <Canvas
        style={{
          zIndex: "-1",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <OrbitControls />
        < Acidification3D />
      </Canvas>

      {/* Main Content */}
      <div className="main-content-overlay">
        <Header />

        <main className="main-content">
          <h2 className="page-title">Acidificación de los Océanos</h2>

          <section className="sections-container">
            <div className="section-card">
              <h3>Consecuencias de la acidificación</h3>
              <Carousel items={consequences} />
              <img src={oceanProblem} alt="Consecuencias de la acidificación" className="section-image" />
              <button className="button learn-more-btn">Conoce más...</button>
            </div>

            <div className="section-card">
              <h3>Soluciones</h3>
              <Carousel items={solutions} />
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
    </div>
  );
};

export default AcidificationInfoPage;
