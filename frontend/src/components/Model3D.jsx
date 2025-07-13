import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

function Model({ url, position = [0, 0, 0], scale = 1, autoRotate = false }) {
  const { scene, animations, mixer } = useGLTF(url);
  const modelRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  useFrame((state, delta) => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
    if (mixer) {
      mixer.update(delta);
    }
  });

  const toggleAnimation = () => {
    if (mixer && animations.length > 0) {
      if (isPlaying) {
        mixer.timeScale = 0;
      } else {
        mixer.timeScale = 1;
        const action = mixer.clipAction(animations[0]);
        action.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <group ref={modelRef} position={position} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

function Model3D({ 
  modelUrl, 
  className = "", 
  height = "400px",
  showControls = true,
  autoRotate = false,
  title = ""
}) {
  const [zoom, setZoom] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const controlsRef = useRef();

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div 
        className="w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20"
        style={{ height }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} />
          
          <PresentationControls
            enabled={true}
            global={false}
            cursor={true}
            snap={false}
            speed={1}
            zoom={0.8}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Model 
              url={modelUrl} 
              scale={zoom}
              autoRotate={autoRotate}
            />
          </PresentationControls>

          <OrbitControls 
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
          />
          
          <Environment preset="studio" />
        </Canvas>
      </div>

      {showControls && (
        <motion.div 
          className="absolute bottom-4 left-4 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-black/80 border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomIn}
            className="bg-black/80 border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleZoomOut}
            className="bg-black/80 border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
            className="bg-black/80 border-yellow-500/30 hover:bg-yellow-500/10 text-yellow-400"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </motion.div>
      )}

      {title && (
        <motion.div 
          className="absolute top-4 left-4 text-yellow-400 font-semibold text-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          {title}
        </motion.div>
      )}
    </motion.div>
  );
}

// Preload GLTF model
useGLTF.preload("https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf");

export default Model3D;