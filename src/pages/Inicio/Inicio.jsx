import './Inicio.css'

import projectLogo from '../../assets/images/logo.png'
import tutorialLogo from '../../assets/images/logoTutorial.png'
import { useNavigate } from 'react-router-dom' // import react-router-dom hook

const Inicio = () => {
	// hook useNavigate created
	const navigate = useNavigate()

	// scroll interactivo
	const scrollToSection = () => {
		document.getElementById('target-scroll').scrollIntoView({ behavior: 'smooth' });
	};

	// Función para ir a la vista de tutorial
	const goToTutorial = () => {
		navigate('/Tutorial');
	};

	// Función para ir a la vista de tutorial
	const goToLogin = () => {
		navigate('/Login');
	};


	return (
		<div className='background'>
			<header className='header-container'>
				<div className='container-title'>
					<img src={projectLogo} alt="project logo" />
					<h1>BlueSphere Studios</h1>
				</div>
				<div className='moreInfo-container'>
					<p onClick={scrollToSection}>Conoce...</p>
				</div>
			</header>

			<section id='target-scroll' className='main-section-container'>
				<div className='section-container-first'>
					<div className='first-container--title'>
						<h3>Bienvenido a BlueSphere Studios</h3>
						<p>Explora los desafíos más críticos que enfrenta el planeta en relación con el agua. Nuestro objetivo es educar de manera interactiva y divertida para que puedas entender mejor estos problemas ambientales y cómo puedes ayudar a solucionarlos.</p>
					</div>
					<div className='first-container--tutorial' onClick={goToTutorial}>
						<img src={tutorialLogo} alt="tutorial logo" />
						<p>Tutorial</p>
					</div>
				</div>
				<div className='section-container-cards'>
					<article className='section-detail--card'>
						<span className='icon1'></span>
						<p className='detail-card--title'>Explora las secciones</p>
						<p className='detail-card--body'>Usa el menú para navegar entre los distintos temas que tenemos para ofrecerte</p>
					</article>
					<article className='section-detail--card'>
						<span className='icon2'></span>
						<p className='detail-card--title'>Explora las secciones</p>
						<p className='detail-card--body'>Usa el menú para navegar entre los distintos temas que tenemos para ofrecerte</p>
					</article>
					<article className='section-detail--card'>
						<span className='icon3'></span>
						<p className='detail-card--title'>Explora las secciones</p>
						<p className='detail-card--body'>Usa el menú para navegar entre los distintos temas que tenemos para ofrecerte</p>
					</article>
					<article className='section-detail--card'>
						<span className='icon4'></span>
						<p className='detail-card--title'>Explora las secciones</p>
						<p className='detail-card--body'>Usa el menú para navegar entre los distintos temas que tenemos para ofrecerte</p>
					</article>
				</div>
			</section>

			<section className='info-section-container'>
				<span className='info-section-container--logo'><img src={projectLogo} alt="Logo-photo" /></span>
				<div className='info-section--title'>
					<h3>¡Empieza tu aventura educativa y ayuda a proteger nuestros océanos!</h3>
				</div>
				<div className='info-section--subtitle'>
					<div className='section-subtitle--info'>
						<p><b>¡Cuida Nuestros Océanos!</b><br/>Los océanos son esenciales para la vida en nuestro planeta. Proporcionan alimento, regulan nuestro clima y albergan una increíble biodiversidad. Sin embargo, están en peligro debido a la contaminación, la sobrepesca y el cambio climático.</p>
					</div>
				</div>
				<div className='info-section--body'>
					<div className='body-section--info'>
						<h4>Únete a BlueSphere Studios y Aprende Interactivamente sobre los Problemas del Agua</h4>
						<p className='body-section--subtitle'>Regístrate ahora para comenzar tu viaje educativo por los océanos y descubrir cómo puedes hacer la diferencia:</p>
						<ul>
							<li>Podrás acceder a contenido exclusivo sobre la contaminación, la escasez de agua y la acidificación de los océanos.</li>
							<li>Podrás interactuar con gráficos 3D que te permitirán explorar estos problemas de forma dinámica.</li>
							<li>Podrás guardar tu progreso y ganar trofeos a medida que completas los quizzes interactivos.</li>
						</ul>
					</div>
					<div className='body-section--login' onClick={goToLogin}>
						<p>Únete y se parte del cambio <span><img src={projectLogo} alt="Logo-photo" /></span></p>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Inicio