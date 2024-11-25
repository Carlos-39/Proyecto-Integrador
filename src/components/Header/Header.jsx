import { useEffect } from 'react';
import useAuthStore from '../../stores/use-auth-store';
import { FaTrophy } from 'react-icons/fa';
import projectLogo from '../../assets/images/logo.png';
import './Header.css'

const Header = () => {

	// gets the logged user
	const { user, observeAuthState } = useAuthStore();
	useEffect(() => {
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
	
	// gets the crumbs


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
			<nav></nav>
      	</header>
	)
}

export default Header