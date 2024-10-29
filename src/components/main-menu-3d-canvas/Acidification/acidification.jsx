import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from 'three';

const Acidification = () => {
    const bubblesRef = useRef([]);
    const particlesRef = useRef([]);
    const groupRef = useRef(); // Referencia para el grupo de toda la escena

    // Generate random particle positions
    const particles = useMemo(() => {
        return Array.from({ length: 50 }, () => ({
            x: (Math.random() - 0.5) * 8,
            y: Math.random() * 5,
            z: (Math.random() - 0.5) * 8
        }));
    }, []);

    useFrame((state, delta) => {
        // Rotación continua de toda la escena
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1; // Ajusta la velocidad de rotación según sea necesario
        }

        bubblesRef.current.forEach(bubble => {
            if (bubble) {
                bubble.position.y += delta * 1.0; // Velocidad de movimiento de las burbujas
                if (bubble.position.y > 3) bubble.position.y = -1;
            }
        });

        particlesRef.current.forEach(particle => {
            if (particle) {
                particle.rotation.x += delta * 0.2; // Velocidad de rotación de las partículas
                particle.rotation.z += delta * 0.2; // Velocidad de rotación de las partículas
            }
        });
    });

    // Coral branch component
    const CoralBranch = ({ startWidth, endWidth, height, segments, color, roughness, bend = 0 }) => {
        const points = Array.from({ length: segments + 1 }, (_, i) => {
            const t = i / segments;
            return new THREE.Vector3(
                Math.sin(t * Math.PI * bend) * 0.1,
                height * t,
                Math.cos(t * Math.PI * bend) * 0.1
            );
        });

        const curve = new THREE.CatmullRomCurve3(points);

        return (
            <mesh castShadow>
                <tubeGeometry args={[curve, segments, startWidth, 8, false]} />
                <meshStandardMaterial color={color} roughness={roughness} metalness={0.2} />
            </mesh>
        );
    };

    // Coral polyps component
    const CoralPolyps = ({ position, scale, color }) => (
        <group position={position} scale={scale}>
            {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const radius = 0.1;
                return (
                    <mesh
                        key={i}
                        position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
                        scale={[0.02, 0.02, 0.02]}
                        castShadow
                    >
                        <sphereGeometry args={[1, 8, 8]} />
                        <meshStandardMaterial color={color} roughness={0.8} />
                    </mesh>
                );
            })}
        </group>
    );

    // Branching coral component
    const BranchingCoral = ({ position, color, scale = 1, rotation = 0, isHealthy = true }) => {
        const branchCount = isHealthy ? 8 : 5;
        const mainColor = isHealthy ? color : `#${color.slice(1).split('').map(c => Math.max(0, Math.min(15, parseInt(c, 16) + 2)).toString(16)).join('')}`;

        return (
            <group position={position} scale={scale} rotation={[0, rotation, 0]}>
                <CoralBranch startWidth={0.04} endWidth={0.02} height={0.3} segments={8} color={mainColor} roughness={0.7} />
                {Array.from({ length: branchCount }, (_, i) => {
                    const angle = (i / branchCount) * Math.PI * 2;
                    const bendFactor = Math.random() * 0.5 + 0.5;
                    return (
                        <group 
                            key={i} 
                            position={[0, 0.1 + Math.random() * 0.1, 0]} 
                            rotation={[Math.random() * 0.5, angle, Math.random() * 0.5]}
                        >
                            <CoralBranch startWidth={0.02} endWidth={0.01} height={0.25} segments={6} color={mainColor} roughness={0.8} bend={bendFactor} />
                            {isHealthy && Array.from({ length: 3 }, (_, j) => (
                                <CoralPolyps key={j} position={[0, 0.05 + j * 0.08, 0]} scale={1} color={color} />
                            ))}
                        </group>
                    );
                })}
            </group>
        );
    };

    // Plate coral component
    const PlateCoral = ({ position, color, scale = 1, rotation = 0, isHealthy = true }) => {
        const segments = isHealthy ? 12 : 8;
        const mainColor = isHealthy ? color : `#${color.slice(1).split('').map(c => Math.max(0, Math.min(15, parseInt(c, 16) + 2)).toString(16)).join('')}`;

        return (
            <group position={position} scale={scale} rotation={[0, rotation, 0]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.3, 0.1, 0.1, segments, 1, true]} />
                    <meshStandardMaterial color={mainColor} roughness={0.8} metalness={0.2} side={THREE.DoubleSide} />
                </mesh>
                {isHealthy && Array.from({ length: 24 }, (_, i) => {
                    const angle = (i / 24) * Math.PI * 2;
                    const radius = 0.2 + Math.random() * 0.05;
                    return (
                        <CoralPolyps 
                            key={i}
                            position={[Math.cos(angle) * radius, 0.05, Math.sin(angle) * radius]}
                            scale={0.8}
                            color={color}
                        />
                    );
                })}
            </group>
        );
    };

    const Rock = ({ position, scale }) => (
        <mesh position={position} scale={scale} castShadow>
            <dodecahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#465666" roughness={0.9} metalness={0.1} />
        </mesh>
    );

    return (
        <group ref={groupRef}> {/* Agrupando todos los elementos */}
            <OrbitControls 
                enablePan={false}
                enableZoom={false}
                autoRotate={false} // Desactivado para que la rotación global sea suficiente
                maxPolarAngle={Math.PI / 2.1}
                minPolarAngle={Math.PI / 2.5}
                maxAzimuthAngle={Math.PI / 6}
                minAzimuthAngle={-Math.PI / 6}
                target={[0, -0.3, 0]}
            />

            <ambientLight intensity={0.5} color="#b8c6db" />
            <directionalLight 
                position={[2, 2, 2]} 
                intensity={0.8} 
                color="#f5f7fa"
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />
            <pointLight 
                position={[-1.5, 1.5, -1.5]} 
                intensity={0.4} 
                color="#6a93cb"
            />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                <planeGeometry args={[8, 8]} />
                <meshStandardMaterial 
                    color="#2c5364"
                    roughness={0.8}
                    metalness={0.2}
                    envMapIntensity={0.5}
                />
            </mesh>

            {/* Healthy corals */}
            <BranchingCoral position={[-0.8, -0.5, -0.4]} color="#ff7b7b" scale={0.9} isHealthy={true} />
            <PlateCoral position={[-0.5, -0.5, 0.2]} color="#ff9f43" scale={0.7} rotation={2} isHealthy={true} />
            <BranchingCoral position={[-0.3, -0.5, -0.2]} color="#ff4757" scale={0.8} isHealthy={true} />

            {/* Unhealthy corals */}
            <BranchingCoral position={[0.8, -0.5, -0.4]} color="#8c4d3b" scale={0.8} isHealthy={false} />
            <PlateCoral position={[0.5, -0.5, 0.2]} color="#8c4d3b" scale={0.7} rotation={1.2} isHealthy={false} />
            <BranchingCoral position={[0.3, -0.5, -0.2]} color="#8c4d3b" scale={0.8} rotation={3.2} isHealthy={false} />

            {/* Bubbles */}
            {Array.from({ length: 10 }, (_, i) => (
                <mesh key={i} ref={el => (bubblesRef.current[i] = el)} position={[Math.random() * 6 - 3, Math.random() * 2 - 1, Math.random() * 6 - 3]}>
                    <sphereGeometry args={[0.1, 16, 16]} />
                    <meshStandardMaterial color="#6fc2e3" transparent opacity={0.7} />
                </mesh>
            ))}

            {/* Particles */}
            {particles.map((particle, index) => (
                <mesh key={index} ref={el => (particlesRef.current[index] = el)} position={[particle.x, particle.y, particle.z]}>
                    <sphereGeometry args={[0.05, 8, 8]} />
                    <meshStandardMaterial color="#f2f2f2" transparent opacity={0.7} />
                </mesh>
            ))}
        </group>
    );
};

export default Acidification;
