import { Keyboard } from "@/components/keyboard";
import { Stage, useTexture } from "@react-three/drei";
import { KEYCAP_TEXTURES } from ".";
import { useMemo, useState, useEffect } from "react";
import * as THREE from "three";


export function Scene ({ selectedTextureId }) {

    const texturePaths = KEYCAP_TEXTURES.map((t => t.path)); 
    const textures = useTexture(texturePaths);

    useEffect(() => {
        console.log('Selected Texture ID changed to:', selectedTextureId);
    }, [selectedTextureId]);

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
            <group>
                <Keyboard keycapMaterial={materials[selectedTextureId]} knobColor={currentKnobColor} />
            </group>
        </Stage>
    )
}