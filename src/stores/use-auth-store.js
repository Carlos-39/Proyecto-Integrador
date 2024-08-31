import { create } from 'zustand' // Import 'create' from Zustand to create the hook (context)
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; // Import necessary functions from Firebase Auth
import { auth } from '../../firebase.config' // Import Firebase configuration

// Google authentication provider
const provider = new GoogleAuthProvider()

/**
 	* Zustand store for handling authentication with Google.
 	* 
 	* @typedef {Object} AuthStore
 	* @property {Object|null} user - Authenticated user state
 	* @property {boolean} loading - Loading state
 	* @property {function(): Promise<void>} loginGoogleWithPopUp - Sign in with Google using a popup.
 	* @property {function(): Promise<void>} logout - Logs out the user.
 	* @property {function(): void} observeAuthState - Observes changes in the authentication state.
 */
const useAuthStore = create((set) => ({
	/**
   		* State of the authenticated user.
   		* @type {Object|null}
   */
	user: null,
	/**
   		* Loading state for authentication.
   		* @type {boolean}
   */
	loading: true,

	/**
   		* Asynchronous function that handles sign-in with Google using a popup.
   		* Updates the user state on success.
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
   		* Asynchronous function that handles logging out the user.
   		* Updates the user state to `null` on success.
   		* 
   		* @async
   		* @function
   		* @returns {Promise<void>}
   */
	logout: async () => {
		await signOut(auth)
			.then(() => {
				set({ user: null}) // Resets the user state after logging out
			})
			.catch((error) => {
				console.log(error) // Logs an error if one occurs during logout
			})
	},

	/**
   		* Function that observes changes in the authentication state.
   		* Updates the `user` and `loading` state based on the current authentication status.
   		* 
   		* @function
   */
	observeAuthState: () => {
		set({ loading: true }) // Sets the loading state while observing authentication state

		onAuthStateChanged(auth, (user) => {
			if(user) {
				set({ user, loading: false }) // Updates state when the user is authenticated
			} else {
				set({ user: null, loading: false }) // Resets state when no user is authenticated
			}
		})
	}
}))

export default useAuthStore