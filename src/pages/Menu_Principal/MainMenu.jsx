import { Link, useNavigate } from "react-router-dom"; 
import "./MainMenu.css";

import {
  FaWater,
  FaExclamationTriangle,
  FaRecycle,
} from "react-icons/fa";
import Escene from "../../components/main-menu-3d-canvas/Escene.jsx";
import Scarcity from "../../components/main-menu-3d-canvas/Scarcity/scarcity.jsx";
import Acidification from "../../components/main-menu-3d-canvas/Acidification/acidification.jsx";
import bgScarcity from "../../assets/images/skybox-scarcity.jpg";
import Pollution from "../../components/main-menu-3d-canvas/Pollution/pollution.jsx";
import bgPollution from "../../assets/images/pollutionIMG.jpg";
import bgAcidification from "../../assets/images/ocean_acidification.jpg";
import Header from '../../components/Header/Header.jsx';

const menuItems = [
  {
    title: "Contaminación del Agua",
    description:
      "Descubre cómo la contaminación afecta nuestros recursos hídricos, amenazando la biodiversidad y la salud humana, y qué podemos hacer para enfrentarlo.",
    icon: <FaWater />,
    image: <Escene escenario={<Pollution />} x={2} y={1} z={6} bgImage={bgPollution} />,
    link: "/MainMenu/Pollution",
  },
  {
    title: "Escasez de Agua",
    description: "El agua se está agotando rápidamente en todo el mundo. Descubre sus causas y soluciones aquí.",
    icon: <FaExclamationTriangle />,
    image: <Escene escenario={<Scarcity />} x={2} y={1} z={6} bgImage={bgScarcity} />,
    link: "/MainMenu/scarcity",
  },
  {
    title: "Acidificación de los Océanos",
    description: "Entiende el impacto de la acidificación en la vida marina.",
    icon: <FaRecycle />,
    image: <Escene escenario={<Acidification />} x={2} y={1} z={9} bgImage={bgAcidification} />,
    link: "/MainMenu/Acidification", 
  },
];

const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="main-menu">
      <Header/>

      <section className="text-container">
        <div className="transparent-box">
          <p className="main-text">Aprendiendo a proteger el agua del planeta, un proyecto a la vez, utilizando lo último en tecnología interactiva.</p>
        </div>
      </section>

      <section className="main-menu-card-container">
        {menuItems.map((item, index) => (
          <div className="card" key={item.title}>
            <Link to={item.link}> 
              {item.image}
              <div className="card-content">
                <h2 className="card-title">
                  {item.icon} {item.title}
                </h2>
                <p className="card-description">{item.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </section>

      <footer className="footer">
        <p>&copy; 2024 BlueSphere Studios. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainMenu;
