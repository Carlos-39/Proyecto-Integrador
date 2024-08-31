import { collection, getDoc, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

/**
 * UserDao class to interact with the 'users' collection in Firestore.
 * Provides methods for performing CRUD (Create, Read, Update, Delete) operations
 * on user documents stored in Firestore.
 */
class UserDao {
    /**
     * Constructor for the UserDao class.
     * Initializes a reference to the 'users' collection in the Firestore database.
     */
    constructor() {
        this.collectionRef = collection(db, "users");
    }

    /**
     * Fetches a user document by its ID.
     * 
     * @async
     * @function
     * @param {string} id - The ID of the user to retrieve.
     * @returns {Promise<Object>} - An object indicating the success or failure of the operation and the user data if found.
     */
    async getUserById(id) {
        try {
            const userDoc = await getDoc(doc(this.collectionRef, id));
            if (userDoc.exists()) {
                return { success: true, data: userDoc.data() }; // Return user data if the document exists
            } else {
                return { success: false, data: null }; // Return null if the document does not exist
            }
        } catch (error) {
            console.error("Error getting document:", error);
            return { success: false, error }; // Return error information if an exception occurs
        }
    }

    /**
     * Creates a new user in the database.
     * Ensures no duplicate user is created by checking if the user ID already exists.
     *
     * @async
     * @function
     * @param {Object} userData - An object containing the user's data to add.
     * @returns {Promise<Object>} - A promise that resolves with the success status and any relevant information.
     */
    async createUser(userData) {
        try {
            const userRef = doc(this.collectionRef, userData.id); // Create a reference to the user document
            const userDoc = await getDoc(userRef); // Fetch the document

            if (userDoc.exists()) {
                return { success: false, message: "User already exists." }; // If user exists, return a failure response
            }

            await setDoc(userRef, userData); // If user does not exist, create a new document
            console.log("Document written with ID:", userData.id);
            return { success: true, id: userData.id }; // Return success with the new user's ID
        } catch (error) {
            console.error("Error adding document:", error);
            return { success: false, error }; // Return error information if an exception occurs
        }
    }

    /**
     * Updates an existing user document in the database.
     *
     * @async
     * @function
     * @param {string} id - The ID of the user to update.
     * @param {Object} userData - An object containing the new user data.
     * @returns {Promise<Object>} - A promise that resolves with the success status.
     */
    async updateUser(id, userData) {
        const userRef = doc(this.collectionRef, id); // Create a reference to the user document
        try {
            await updateDoc(userRef, userData); // Update the document with new data
            console.log("Document updated successfully");
            return { success: true }; // Return success status
        } catch (error) {
            console.error("Error updating document:", error);
            return { success: false, error }; // Return error information if an exception occurs
        }
    }

    /**
     * Deletes a user document from the database by its ID.
     *
     * @async
     * @function
     * @param {string} id - The ID of the user to delete.
     * @returns {Promise<Object>} - A promise that resolves with the success status.
     */
    async deleteUser(id) {
        try {
            await deleteDoc(doc(this.collectionRef, id)); // Delete the document with the specified ID
            console.log("Document successfully deleted");
            return { success: true }; // Return success status
        } catch (error) {
            console.error("Error removing document:", error);
            return { success: false, error }; // Return error information if an exception occurs
        }
    }
}

export default new UserDao(); // Export an instance of UserDao for use in other parts of the application
