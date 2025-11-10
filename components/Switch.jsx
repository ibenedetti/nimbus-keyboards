import * as THREE from "three";
import React from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGLTF } from "@react-three/drei";


export const SOUND_MAP = {
    red: ["/sounds/red-1.mp3", "/sounds/red-2.mp3", "/sounds/red-3.mp3"], 
    blue: ["/sounds/blue-1.mp3", "/sounds/blue-2.mp3", "/sounds/blue-3.mp3"],
    brown: ["/sounds/brown-1.mp3", "/sounds/brown-2.mp3", "/sounds/brown-3.mp3"],
    black: ["/sounds/black-1.mp3", "/sounds/black-2.mp3", "/sounds/black-3.mp3"],
}

export function Switch({color, hexColor, ...restProps}) {
  const { nodes } = useGLTF("/switch.gltf");
  const switchGroupRef = React.useRef(null);
  const stemRef = React.useRef(null);
  const isPressedRef = useRef(false);
  const audio = useRef(null);
  const audioTimeout = useRef(null);
  const allAudio = useRef(
    SOUND_MAP[color].map((url) => {
        const audio = new Audio(url);
        audio.volume = 0.6;
        return audio;
    })
  );

  const handlePointerDown = (e) => {
    e.stopPropagation();
    if (!stemRef.current || !switchGroupRef.current || isPressedRef.current) return;

    isPressedRef.current = true;
    const stem = stemRef.current;
    const switchGroup = switchGroupRef.current;

    gsap.killTweensOf(stem.position);
    gsap.killTweensOf(switchGroup.rotation);

    gsap.to(switchGroup.rotation, {
        x: Math.PI / 2 + .1,
        duration: .05,
        ease: "power2.out"
    })

    gsap.to(stem.position, {
        z: 0.005,
        duration: .08,
        ease: "power2.out"
    })

    audio.current = gsap.utils.random(allAudio.current);
    audio.current.currentTime = 0;
    audio.current.play()
    audioTimeout.current = setTimeout(
        () => audio.current?.pause(), (audio.current?.duration / 2) * 1000);
  };

    const releaseSwitch = (e) => {
        e.stopPropagation
    if (!stemRef.current || !switchGroupRef.current || !isPressedRef.current) return;

    isPressedRef.current = false;
    const stem = stemRef.current;   
    const switchGroup = switchGroupRef.current;

    gsap.to(switchGroup.rotation, {
        x: Math.PI / 2,
        duration: .6,
        ease: "elastic.out(1, 0.3)"
    })

    gsap.to(stem.position, {
        z: 0,
        duration: .15,
        ease: "elastic.out(1, 0.3)"
    })

    if(audioTimeout.current) clearTimeout(audioTimeout.current);
    audio.current?.play();
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    releaseSwitch(e);
  }

  const handlePointerLeave = (e) => {
    e.stopPropagation();
    releaseSwitch(e);
  }

  return (

    <group {...restProps}>
        {/* Hitbox */}
        <mesh
            position={[0,0.05,0]}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "default")}
        >
            <boxGeometry args={[0.15,0.15,0.15]} />
            <meshBasicMaterial transparent opacity={0} />
        </mesh>

        <group ref={switchGroupRef} scale={10} rotation={[Math.PI / 2, 0, 0]}>
        {/* Switch housing */}
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Single_Switch_Mesh_1.geometry}
        >
            <meshStandardMaterial color="#999999" roughness={0.7} />
        </mesh>

        {/* Gold contacts */}
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Single_Switch_Mesh_2.geometry}
        >
            <meshStandardMaterial color="#ffd700" roughness={0.1} metalness={1} />
        </mesh>

        {/* Colored stem */}
        <mesh
        ref={stemRef}
            castShadow
            receiveShadow
            geometry={nodes.Single_Switch_Mesh_3.geometry}
        >
            <meshStandardMaterial color={hexColor} roughness={0.7} />
        </mesh>

        {/* Switch base */}
        <mesh
            castShadow
            receiveShadow
            geometry={nodes.Single_Switch_Mesh_4.geometry}
        >
            <meshStandardMaterial color="#999999" roughness={0.7} />
        </mesh>
        </group>
    </group>
  );
}

useGLTF.preload("/switch.gltf");