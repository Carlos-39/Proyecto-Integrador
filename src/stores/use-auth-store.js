import { create } from 'zustand' // import del create de Zustand para crear el hook (contexto)
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; // Import de las funciones necesarias desde Firebase Auth
import { auth } from '../../firebase.config' // Import de la configuración de Firebase

// Proveedor de autenticación de google
const provider = new GoogleAuthProvider()

/**
 	* Store de Zustand para manejar la autenticación con Google.
 	* 
 	* @typedef {Object} AuthStore
 	* @property {Object|null} user - Estado del usuario autenticado
 	* @property {boolean} loading - Estado de carga
 	* @property {function(): Promise<void>} loginGoogleWithPopUp - Iniciar sesión con Google a través de un popup.
 	* @property {function(): Promise<void>} logout - Cierra la sesión del usuario.
 	* @property {function(): void} observeAuthState - Observa los cambios en el estado de autenticación.
 */
const useAuthStore = create((set) => ({
	/**
   		* Estado del usuario autenticado.
   		* @type {Object|null}
   */
	user: null,
	/**
   		* Estado de carga de la autenticación.
   		* @type {boolean}
   */
	loading: true,

	/**
   		* Función asíncrona que maneja el inicio de sesión con Google a través de un popup.
   		* Actualiza el estado del usuario en caso de éxito.
   		* 
   		* @async
   		* @function
   		* @returns {Promise<void>}
   */
	loginGoogleWithPopUp: async () => {
		await signInWithPopup(auth, provider)
		.catch((error) => {
			console.log(error) // Muestra un error si ocurre durante el inicio de sesión
		})
	},

	/**
   		* Función asíncrona que maneja el cierre de sesión del usuario.
   		* Actualiza el estado del usuario a `null` en caso de éxito.
   		* 
   		* @async
   		* @function
   		* @returns {Promise<void>}
   */
	logout: async () => {
		await signOut(auth)
			.then(() => {
				set({ user: null}) // Reinicia el estado del usuario tras cerrar sesión
			})
			.catch((error) => {
				console.log(error) // Muestra un error si ocurre durante el cierre de sesión
			})
	},

	/**
   		* Función que observa los cambios en el estado de autenticación.
   		* Actualiza el estado de `user` y `loading` basado en la autenticación actual.
   		* 
   		* @function
   */
	observeAuthState: () => {
		set({ loading: true }) // Establece el estado de carga mientras se observa el estado

		onAuthStateChanged(auth, (user) => {
			if(user) {
				set({ user, loading: false }) // Actualiza el estado cuando el usuario está autenticado
			} else {
				set({ user: null, loading: false }) // Reinicia el estado cuando no hay usuario autenticado
			}
		})
	}
}))

export default useAuthStore