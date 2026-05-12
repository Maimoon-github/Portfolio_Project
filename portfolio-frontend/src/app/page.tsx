"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Next.js 15 + Three.js
        </motion.h1>
      </div>

      <div className="relative flex place-items-center w-full h-[500px]">
        <Canvas>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 1, 1]} />
          <OrbitControls enableZoom={false} />
          <Sphere visible args={[1, 100, 200]} scale={2}>
            <MeshDistortMaterial
              color="#3b82f6"
              attach="material"
              distort={0.5}
              speed={2}
            />
          </Sphere>
        </Canvas>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/30">
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Ready for AI Studio deployment.
          </p>
        </div>
      </div>
    </main>
  );
}
