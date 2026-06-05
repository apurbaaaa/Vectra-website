import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import ScreenMaterial from "./ScreenMaterial";

// Camera keyframes for scroll animation
const CAMERA_START = { x: 0, y: 0.5, z: 5 };
const CAMERA_END = { x: -6, y: 0.2, z: 0.3 };

export default function LaptopModel({ scrollProgress }) {
  const { camera } = useThree();
  const laptopRef = useRef();
  const idleRef = useRef({ active: true });

  // Load the GLTF model
  const { scene, nodes } = useGLTF("/models/laptop.glb");

  useEffect(() => {
    if (!scene) return;

    // Reset transforms to default BEFORE measuring, to fix HMR caching bugs
    scene.position.set(0, 0, 0);
    scene.scale.set(1, 1, 1);
    scene.rotation.set(0, 0, 0);
    scene.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Use max of x or z for scaling to prevent camera clipping inside the mesh
    const scale = 3.5 / Math.max(size.x, size.z, 0.001);

    // Apply new scale and center
    scene.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    scene.scale.setScalar(scale);
    scene.rotation.x = 0.12; // Slight tilt to see keyboard/screen

    // Enable shadows on all meshes
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!laptopRef.current) return;
    const p = scrollProgress !== undefined ? scrollProgress : 0;

    // Idle float animation — only when not scrolled
    if (p < 0.05) {
      laptopRef.current.position.y = Math.sin(clock.elapsedTime * 0.8) * 0.03;
      laptopRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.4) * 0.04;
    } else {
      // Smoothly return to 0 rotation/position when scrolling starts
      laptopRef.current.position.y = THREE.MathUtils.lerp(
        laptopRef.current.position.y,
        0,
        0.1,
      );
      laptopRef.current.rotation.y = THREE.MathUtils.lerp(
        laptopRef.current.rotation.y,
        0,
        0.1,
      );
    }

    // Camera interpolation based on scrollProgress (0 → 1)
    camera.position.x = CAMERA_START.x + (CAMERA_END.x - CAMERA_START.x) * p;
    camera.position.y = CAMERA_START.y + (CAMERA_END.y - CAMERA_START.y) * p;
    camera.position.z = CAMERA_START.z + (CAMERA_END.z - CAMERA_START.z) * p;
    
    // Look straight ahead at the laptop
    camera.lookAt(0, 0, 0);
  });

  // Find the screen mesh by name — adjust "Screen" to match your actual .glb mesh name
  const screenMesh = nodes?.Box20311_1_1;

  return (

    <group ref={laptopRef}>
      {/* Adjust the middle value (Y) to shift the model up or down. 
        Positive numbers move it up towards the header. 
      */}
      <group position={[0, 1.2, 0]}> 
        <primitive object={scene} />
        {screenMesh && <ScreenMaterial mesh={screenMesh} />}
      </group>
    </group>
  );
}

useGLTF.preload("/models/laptop.glb");
