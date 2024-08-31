import { collection, getDoc, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

/**
 	* UserDao class to interact with the 'users' collection in Firestore.
 	* Provides methods for performing CRUD (Create, Read, Update, Delete) operations
 	* on user documents stored in Firestore.
 */
class UserDao {
	/**
	 	* Constructor of the UserDao class.
	 	* Creates a reference to the 'users' collection in the Firestore database.
	 */
	constructor() {
		this.collectionRef = collection(db, "users")
	}

	/**
	 	* Gets a user document by its ID.
	 	*
	 	* @async
	 	* @function
	 	* @param {string} id - The ID of the user to search for.
	 	* @returns {Promise<Object>} - An object indicating the success or failure of the operation and the user data if it exists.
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
		* Creates a new user in the database.
		*
		* @async
		* @function
		* @param {Object} userData - An object containing the user's data to add.
		* @returns {Promise<void>} - A promise that resolves when the user has been successfully added.
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
	 	* Updates an existing user document in the database.
	 	*
	 	* @async
	 	* @function
	 	* @param {string} id - The ID of the user to update.
	 	* @param {Object} userData - An object containing the new user data.
	 	* @returns {Promise<void>} - A promise that resolves when the user has been successfully updated.
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
	 	* Deletes a user document from the database by its ID.
	 	*
	 	* @async
	 	* @function
	 	* @param {string} id - The ID of the user to delete.
	 	* @returns {Promise<void>} - A promise that resolves when the user has been successfully deleted.
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