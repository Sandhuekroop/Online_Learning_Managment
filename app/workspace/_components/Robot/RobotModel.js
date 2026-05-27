"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";

function Robot() {
  const { scene } = useGLTF("/models/ROBO1.glb");
  const robotRef = useRef();

  // Continuous rotation
  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={robotRef}
      object={scene}
      scale={0.8}         // 🟢 smaller
      position={[0, -1.2, 0]}  // 🟢 lower to fit screen
      rotation={[0, Math.PI, 0]} // facing forward
    />
  );
}

export default function RobotModel() {
  return (
    <div className="w-[400px] h-[400px]"> {/* 🟢 fixed small cube area */}
      <Canvas camera={{ position: [0, 1.5, 6], fov: 60 }}>

        <ambientLight intensity={1.2} />
        <directionalLight position={[2, 2, 5]} intensity={2} />
        <Suspense fallback={null}>
          <Robot />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
