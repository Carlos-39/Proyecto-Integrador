import { Canvas } from '@react-three/fiber'
import CloudObject from './CloudObject';
import './Escene.css'

const Escene = () =>
    {
        return <Canvas
            camera={{position: [3,6,6],}}
        >
            <CloudObject />
        </Canvas>
    };

export default Escene