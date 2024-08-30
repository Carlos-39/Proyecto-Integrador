import { Canvas } from '@react-three/fiber'
import CloudObject from './CloudObject';
import './Escene.css'

const Escene = () =>
    {
        return <Canvas
            camera={{position: [3,2,3],}}
        >
            <CloudObject />
        </Canvas>
    };

export default Escene