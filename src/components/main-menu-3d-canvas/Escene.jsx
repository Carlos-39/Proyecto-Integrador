import { Canvas } from '@react-three/fiber';
import './Escene.css';


// Destructure states and functions from the store
const Escene = (props) => {
  var styleSheet = {}
  if (props.bgImage != null)
    {
      styleSheet["backgroundImage"] = "url(" + props.bgImage + ")"
    }
  return (
    <div className="scene-container" style={{width: "100%", aspectRatio: "16/9"}}>
      <Canvas shadows camera={{ position: [props.x, props.y, props.z] }} style={styleSheet}>
        {props.escenario}
      </Canvas>
    </div>
  );
};

export default Escene;