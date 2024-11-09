import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import projectLogo from '../../assets/images/logo.png';
import './Header.css'

const Header = ({username}) => {
	return (
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
	)
}

export default Header