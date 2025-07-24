"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
// import { OrbitControls } from "@react-three/drei";
// import { Canvas } from "@react-three/fiber";
export default function Page() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const animFrame = useRef<number>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.offsetWidth, mountRef.current.offsetHeight);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // --- Camera ---
    const fov = 75;
    const aspect = mountRef.current.offsetWidth / mountRef.current.offsetHeight;
    const near = 0.01;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    cameraRef.current = camera;

    // --- Scene & Mesh ---
    const scene = new THREE.Scene();

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;

    const geo = new THREE.IcosahedronGeometry(1, 3);
    const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, flatShading: true });
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    wireMesh.scale.setScalar(1.001);

    const mesh = new THREE.Mesh(geo, mat);
    mesh.add(wireMesh);
    scene.add(mesh);
    meshRef.current = mesh;

    const light = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
    scene.add(light);

    // --- Animation ---
    const animate = (time = 0) => {
      animFrame.current = requestAnimationFrame(animate);
      mesh.rotation.y = time * 0.0001;
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    // --- Resize Handling ---
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !mountRef.current) return;
      const width = mountRef.current.offsetWidth;
      const height = mountRef.current.offsetHeight;

      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div className="w-screen h-screen" ref={mountRef}>
      {/* <Canvas>
        <OrbitControls enableZoom={true} />
      </Canvas> */}
    </div>
  );
}
