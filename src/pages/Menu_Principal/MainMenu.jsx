import React from "react";
import "./MainMenu.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import {
  FaWater,
  FaExclamationTriangle,
  FaRecycle,
  FaTrophy,
} from "react-icons/fa";
import projectLogo from "../../assets/images/logo.png";
import contaminacionImage from "../../assets/images/contaminacion.jpg";
import escacezAguaImage from "../../assets/images/escacez_agua.jpg";
import acidificacionImage from "../../assets/images/acidificacion.jpg";
import Escene from "../../components/main-menu-3d-canvas/Escene.jsx"
const menuItems = [
  {
    title: "Contaminación del Agua",
    description:
      "Explora los efectos de la contaminación en nuestros recursos hídricos.",
    icon: <FaWater />,
    image: <Escene/>,
    link: "/pollution",
  },
  {
    title: "Escasez de Agua",
    description: "Descubre las causas y soluciones para la escasez de agua.",
    icon: <FaExclamationTriangle />,
    image: <Escene/>,
    link: "/scarcity",
  },
  {
    title: "Acidificación de los Océanos",
    description: "Entiende el impacto de la acidificación en la vida marina.",
    icon: <FaRecycle />,
    image: <Escene/>,
    link: "/ocean-acidification",
  },
];

const MainMenu = () => {
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

  return (
    <div className="main-menu">
      <header className="header">
        <div className="logo-container">
          <img
            src={projectLogo}
            alt="BlueSphere Studios Logo"
            className="logo"
          />
          <div className="company-info">
            <h1 className="title">BlueSphere Studios</h1>
            <p className="subtitle">
              Explora los Problemas Ambientales del Agua
            </p>
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
      <div className="text-container">
        <div className="transparent-box">
          <p className="main-text">
          Aprendiendo a proteger el agua del planeta, un proyecto a la vez, utilizando lo último en tecnología interactiva.
          </p>
        </div>
      </div>

      <div className="card-container">
        {menuItems.map((item, index) => (
          <div className="card" key={index}>
            <a href={item.link}>
              {item.image}
              <div className="card-content">
                <h2 className="card-title">
                  {item.icon} {item.title}
                </h2>
                <p className="card-description">{item.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>&copy; 2024 BlueSphere Studios. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainMenu;