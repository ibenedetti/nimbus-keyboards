import { Keyboard } from "@/components/keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo, useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import * as THREE from "three";

gsap.registerPlugin(useGSAP)

export function Scene ({ selectedTextureId, onAnimationComplete }) {

    
    const keyboardRef = useRef(null);
    const texturePaths = KEYCAP_TEXTURES.map((t => t.path)); 
    const textures = useTexture(texturePaths);
    const [currentTextureId, setCurrentTextureId] = useState(selectedTextureId);

    useEffect(() => {
        console.log('Selected Texture ID changed to:', selectedTextureId);
    }, [selectedTextureId]);

    useGSAP(() => {
    if (!keyboardRef.current || selectedTextureId === currentTextureId) return;

    const keyboard = keyboardRef.current;
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {

        const tl = gsap.timeline({
            onComplete: onAnimationComplete
        });

        tl.to(keyboard.position, {
            y: .3,
            duration: .5,
            ease: "power2.out",
            onComplete: () => {
                setCurrentTextureId(selectedTextureId);
            }
        });
        tl.to(keyboard.position, {
            y: 0,
            duration: .6,
            ease: "elastic.out(1,0.4)"
        });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
        setCurrentTextureId(selectedTextureId);
        onAnimationComplete();
    });

    return () => mm.revert();
}, [selectedTextureId, currentTextureId])

    const materials = useMemo(() => {
        const materialMap = {};

        KEYCAP_TEXTURES.forEach((textureConfig, index) => {
            const texture = Array.isArray(textures) ? textures[index] : textures;

            if (texture) {
                texture.flipY = false;
                texture.colorSpace = THREE.SRGBColorSpace
                materialMap[textureConfig.id] = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.7 });
            }
        })
        

        return materialMap
    }, [textures])

    const currentKnobColor = KEYCAP_TEXTURES.find((t) => t.id === selectedTextureId)?.knobColor;

    return (
        <Stage environment={"city"} intensity={0.001} shadows={"contact"}>
            <group ref={keyboardRef}>
                <Keyboard keycapMaterial={materials[currentTextureId]} knobColor={currentKnobColor} />
            </group>
        </Stage>
    )
}