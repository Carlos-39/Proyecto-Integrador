import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import CloudObject from './CloudObject';
import useAuthStore from '../../stores/use-auth-store'; // Adjust the import path as needed
import './Escene.css';
import { useNavigate } from 'react-router-dom';


// Destructure states and functions from the store
const Escene = () => {
  const { logout, user } = useAuthStore(state => ({
    logout: state.logout,
    user: state.user
  }));

  //send the user to the login if isn't loged in
  const navigate = useNavigate();

  useEffect(() => {
    if(user == null) navigate('/')
  },[user, navigate])

  //closes user account
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