import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { Float, useTexture } from "@react-three/drei";
import { useMemo } from "react";

export function Keycap({ position = [0, 0, 0], 
    rotation = [0, 0, 0], 
    texture = 0 }) {
  const { nodes } = useGLTF("/keycap.gltf");

  const textures = [
    "/keycap_uv-1.png",
    "/keycap_uv-2.png",
    "/keycap_uv-3.png",
    "/keycap_uv-4.png",
    "/keycap_uv-5.png",
    "/keycap_uv-6.png",
    "/keycap_uv-7.png",
    "/keycap_uv-8.png",
    "/keycap_uv-9.png",
  ];
  
const uvTexture = textures[texture];

  const loadedTexture = useTexture(uvTexture);

 
  const keycapTexture = useMemo(() => {
    loadedTexture.flipY = false;
    loadedTexture.colorSpace = THREE.SRGBColorSpace;
    return loadedTexture;
  }, [loadedTexture]);

  const placeholderMat = new THREE.MeshStandardMaterial({
    map: keycapTexture,
    roughness: 0.7,
  });
  return (
    <Float
        rotationIntensity={0.05}

    >
        <group dispose={null} position={position} rotation={rotation}>
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Keycap.geometry}
            material={placeholderMat}  
            rotation={[Math.PI / 2, 0, 0]}      
            scale={10}
        />
        </group>
    </Float>
  );
}

useGLTF.preload("/keycap.gltf");