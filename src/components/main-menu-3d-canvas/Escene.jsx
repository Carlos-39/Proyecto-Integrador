import { Canvas } from '@react-three/fiber';
import CloudObject from './CloudObject';
import './Escene.css';


// Destructure states and functions from the store
const Escene = (props) => {
  return (
    <div className="scene-container" style={{width: "100%", aspectRatio: "16/9"}}>
      <Canvas camera={{ position: [3, 6, 6] }}>
        {props.escenario}
      </Canvas>
    </div>
  );
};

export default Escene;