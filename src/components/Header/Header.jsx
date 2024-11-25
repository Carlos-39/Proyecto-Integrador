import { useCallback, useEffect } from 'react';
import useAuthStore from '../../stores/use-auth-store';
import { FaTrophy } from 'react-icons/fa';
import projectLogo from '../../assets/images/logo.png';
import './Header.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { logOutOutline } from 'ionicons/icons';

const Header = (props) => {

	// gets the logged user
	const { user, observeAuthState, logout } = useAuthStore();
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
	
	// allow to unlogin
	const navigate = useNavigate()
	const handleLogout = useCallback(() => {
		logout()
		navigate("/")
	}, [logout])


	// gets the crumbs
	const location = useLocation().pathname.slice(1).split("/")
	var links = []
	for (var i = 0; i < location.length; i++)
	{
		var newLink = ""
		for (var j = 0; j <= i; j++)
		{
			newLink += "/" + location[j]
		}
		links.push(newLink)
	}

	return (
		<header className="header">
			<div>
				<div className="logo-container">
					<img src={projectLogo} alt="BlueSphere Studios Logo" className="logo"/>
					<div className="company-info">
						<h1>BlueSphere Studios</h1>
						<p>Explora los Problemas Ambientales del Agua</p>
					</div>
				</div>
				<div className="user-info">
					<span className="username">{username}</span>
					<button 
						className='logout-button'
						onClick={handleLogout}
					>
						<IonIcon icon={logOutOutline} size={"large"}></IonIcon>
						logout
					</button>
					<div className="trophy-container" title="Ver Trofeos">
						<FaTrophy className="trophy-icon" />
						<span className="trophy-text">Trofeos</span>
					</div>
				</div>
			</div>
			<nav>
				{
					location.map((element, index) => (
						index == 0 ? 
						<Link key={index + "C"} to={links[index]}>{element}</Link> : 
						<p key={index + "C"}> {">"} <Link to={links[index]}>{element}</Link></p>
					))
				}
			</nav>
      	</header>
	)
}

export default Header