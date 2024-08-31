import { useEffect, useCallback } from 'react'; // Import React hooks
import useAuthStore from '../../stores/use-auth-store'; // Import the authentication store
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './Login.css';
import googleIcon from '../../assets/icons/google.png';
import projectLogo from '../../assets/images/logo.png';
import UserDao from '../../daos/UserDao';

/**
 * Login component to handle Google sign-in and sign-out.
 * Displays the user interface for logging in or out and manages the authentication logic.
 * 
 * @component
 * @returns {JSX.Element} - Returns the Login component with sign-in and sign-out buttons.
 */
const Login = () => {
    const navigate = useNavigate(); // Initialize navigate for redirection
    const { user, loading, observeAuthState, loginGoogleWithPopUp, logout } = useAuthStore();

    /**
     * useEffect to ensure the observeAuthState function runs when the component mounts.
     * This checks if a user is already authenticated and handles redirection.
     * 
     * @function useEffect
     */
    useEffect(() => {
        observeAuthState(() => {
            navigate('/login'); // Redirect to login page when no user is authenticated
        });
    }, [observeAuthState, navigate]);

    /**
     * Function executed when the user clicks the "Sign in" button.
     * This function calls loginGoogleWithPopUp to show the Google sign-in popup.
     * 
     * @function handleLogin
     * @type {() => void}
     */
    const handleLogin = useCallback(() => {
        loginGoogleWithPopUp();
    }, [loginGoogleWithPopUp]);

    /**
     * Function executed when the user clicks the "Sign out" button.
     * This function calls logout to disconnect the user and redirects to the login page.
     * 
     * @function handleLogout
     * @type {() => void}
     */
    const handleLogout = useCallback(() => {
        logout().then(() => {
            navigate('/login'); // Redirect to login page after logout
        });
    }, [logout, navigate]);

    /**
     * Hook to create a new authenticated user in the database when `user` changes.
     * It only runs if `user` is not null.
     *
     * @function useEffect
     */
    useEffect(() => {
        if (user) {
            const newUser = {
                email: user.email,
                name: user.displayName,
                photo: user.photoURL
            };

            UserDao.createUser(newUser);
        }
    }, [user]);

    /**
     * If the `loading` state is `true`, displays a text saying "Loading..."
     * to inform the user that the system is checking the authentication state.
     */
    if (loading) {
        return <p className='loading-text'>Cargando...</p>;
    }

    /**
     * Capitalizes the first letter of each word in a text string.
     * Converts all letters to lowercase and then capitalizes 
     * the first letter of each word.
     *
     * @function
     * @param {string} text - The text to capitalize.
     * @returns {string} - The text with the first letter of each word capitalized.
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
                                <button className='login-button--access' onClick={handleLogin}>
                                    Iniciar sesión con <img src={googleIcon} alt="Google Icon" className='google-icon'></img>
                                </button>
                            </div>
                        </>    
                    )} 
                </section>
            </main>
        </>
    );
};

export default Login;
