import { Canvas } from '@react-three/fiber';
import CloudObject from './CloudObject';
import useAuthStore from './stores/use-auth-store'; // Adjust the import path as needed
import './Escene.css';

const Escene = () => {
  const { logout, user } = useAuthStore(state => ({
    logout: state.logout,
    user: state.user
  }));

  const handleLogout = async () => {
      await logout()
  };

  return (
    <div className="scene-container">
      <Canvas camera={{ position: [3, 6, 6] }}>
        <CloudObject />
      </Canvas>
      {user && (
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default Escene;