import './Tutorial.css'

import { useNavigate } from 'react-router-dom'

const Tutorial = () => {
	const navigate = useNavigate()

	const goBack = () => {
		navigate('/')
	}

	return (
		<>
			<div className="construction-container">
				<h1>Esta sección está en construcción</h1>
				<p>Estamos trabajando para traerte una mejor experiencia. ¡Vuelve pronto!</p>
				<button onClick={goBack} className="back-button">Regresa al Inicio</button>
			</div>
		</>
	)
}

export default Tutorial