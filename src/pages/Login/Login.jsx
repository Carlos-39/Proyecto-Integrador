import { useEffect, useCallback } from 'react' // Import de hooks de React
import useAuthStore from '../../stores/use-auth-store' // Import del store de autenticación
import './Login.css'
import googleIcon from '../../assets/icons/google.png'
import projectLogo from '../../assets/images/logo.png'

/**
 	* Componente Login para manejar el inicio y cierre de sesión con Google.
 	* Muestra la interfaz de usuario para iniciar o cerrar sesión y maneja la lógica de autenticación.
 	* 
 	* @component
 	* @returns {JSX.Element} - Devuelve el componente de Login con botones de inicio y cierre de sesión.
 */
const Login = () => {
	// Traer los estados y funciones del store
	const { user,loading ,observeAuthState, loginGoogleWithPopUp, logout } = useAuthStore()

	/**
   		* useEffect para asegurarse de que la función observeAuthState se ejecute 
   		* cuando el componente se monte. Esto verifica si un usuario ya está autenticado.
   		* 
   		* @function useEffect
   */
	useEffect(() => {
		observeAuthState()
	}, [observeAuthState]);

	/**
   		* Función que se ejecuta cuando el usuario hace clic en el botón de "Iniciar sesión".
   		* Esta función llama a loginGoogleWithPopUp para mostrar el popup de inicio de sesión de Google.
   		* 
   		* @function handleLogin
   		* @type {() => void}
   */
	const handleLogin = useCallback(() => {
		loginGoogleWithPopUp()
	}, [loginGoogleWithPopUp])

	/**
   		* Función que se ejecuta cuando el usuario hace clic en el botón de "Cerrar sesión".
   		* Esta función llama a logout para desconectar al usuario.
   		* 
   		* @function handleLogout
   		* @type {() => void}
   */
	const handleLogout = useCallback(() => {
		logout()
	}, [logout])

	/**
   		* Si el estado `loading` es `true`, muestra un texto que dice "Cargando..."
   		* para informar al usuario que el sistema está verificando el estado de autenticación.
   */
	if(loading) {
		return <p className='loading-text'>Cargando...</p>
	}

	/**
 		* Capitaliza la primera letra de cada palabra en una cadena de texto.
 		* Convierte todas las letras a minúsculas y luego pone en mayúscula 
 		* la primera letra de cada palabra.
 		*
 		* @function
 		* @param {string} text - El texto a capitalizar.
 		* @returns {string} - El texto con la primera letra de cada palabra en mayúscula.
 	*/
	function capitalizeWords(text) {
		return text
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	}

	return (
		<>
			<main>
				<section className='container-login'>
					<div className='container-login--img'>
						<img src={projectLogo} alt="project logo" />
					</div>

					{user ? (
						<>	
							<div className='container-login--info'>
								<p className='login-info--welcome'> Bienvenido(a), {capitalizeWords(user.displayName)} </p>
								<button onClick={handleLogout}>Cerrar sesión</button>
							</div>
						</>
					) : (
						<>
							<div className='container-login--access'>
								<button className='login-button--access' onClick={handleLogin}>Iniciar sesión con <img src={googleIcon} alt="Google Icon" className='google-icon'></img></button>
							</div>
						</>	
					)} 
				</section>
			</main>
		</>
	)
}

export default Login