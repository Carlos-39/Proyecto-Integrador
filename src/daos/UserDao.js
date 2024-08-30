import { collection, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

/**
 	* Clase UserDao para interactuar con la colección 'users' en Firestore.
 	* Proporciona métodos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar)
 	* en los documentos de usuarios almacenados en Firestore.
 */
class UserDao {
	/**
	 	* Constructor de la clase UserDao.
	 	* Crea una referencia a la colección 'users' en la base de datos Firestore.
	 */
	constructor() {
		this.collectionRef = collection(db, "users")
	}

	/**
	 	* Obtiene un documento de usuario por su ID.
	 	*
	 	* @async
	 	* @function
	 	* @param {string} id - El ID del usuario a buscar.
	 	* @returns {Promise<Object>} - Un objeto que indica el éxito o fracaso de la operación y los datos del usuario si existe.
	 */
	async getUserById(id) {
		await getDoc(doc(this.collectionRef, id))
			.then((userDoc) => {
				if(userDoc.exists()) {
					return { success: true, data: userDoc.data() }
				} else {
					return { success: false, data: null}
				}
			})
			.catch((error) => {
				console.log("Error getting Document: ", error)
			})
	}

	/**
		* Crea un nuevo usuario en la base de datos.
		*
		* @async
		* @function
		* @param {Object} userData - Un objeto que contiene los datos del usuario a añadir.
		* @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario ha sido añadido correctamente.
	 */
	async createUser(userData) {
		await addDoc(this.collectionRef, userData)
			.then((docRef) => {
				console.log("Document written with ID: ", docRef.id)
			})
			.catch((error) => {
				console.error("Error adding document: ", error)
			})
	}

	/**
	 	* Actualiza un documento de usuario existente en la base de datos.
	 	*
	 	* @async
	 	* @function
	 	* @param {string} id - El ID del usuario a actualizar.
	 	* @param {Object} userData - Un objeto que contiene los nuevos datos del usuario.
	 	* @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario ha sido actualizado correctamente.
	 */
	async updateUser(id, userData) {
		const userRef = doc(this.collectionRef, id)

		await updateDoc(userRef, userData)
			.then(console.log('Document updated successfully'))
			.catch((error) => {
				console.log("Error updating document: ", error)
			})
	}

	/**
	 	* Elimina un documento de usuario de la base de datos por su ID.
	 	*
	 	* @async
	 	* @function
	 	* @param {string} id - El ID del usuario a eliminar.
	 	* @returns {Promise<void>} - Una promesa que se resuelve cuando el usuario ha sido eliminado correctamente.
	 */
	async deleteUser(id) {
		await deleteDoc(doc(this.collectionRef, id))
			.then(console.log("Document successfully deleted"))
			.catch((error) => {
				console.error("Error removing document: ", error)
			})
	}
}

export default new UserDao();