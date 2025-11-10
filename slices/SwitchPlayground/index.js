"use client";

import Bounded from "@/components/Bounded";
import {FadeIn} from "@/components/FadeIn";
import { SOUND_MAP, Switch } from "@/components/Switch";
import { isFilled } from "@prismicio/client";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import { Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { clsx } from "clsx";
import gsap from "gsap";
import { IconName, LuVolume2 } from "react-icons/lu";

/**
 * @typedef {import("@prismicio/client").Content.SwitchPlaygroundSlice} SwitchPlaygroundSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SwitchPlaygroundSlice>} SwitchPlaygroundProps
 * @type {import("react").FC<SwitchPlaygroundProps>}
 */

const SwitchPlayground = ({ slice }) => { 

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
      innerClassName="flex flex-col justify-center"
    >
      <FadeIn>
        <h2 className="font-bold-slanted text-6xl md:text-8xl uppercase scroll-pt-6">
          <PrismicText field={slice.primary.heading} />
        </h2>
        <div className="mb-6 max-w-4xl text-pretty">        
          <PrismicRichText field={slice.primary.description} />
        </div>
        <FadeIn targetChildren className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2">
          {slice.primary.switches.map((item) => 
          isFilled.contentRelationship(item.switch) ?  (
            <SharedCanvas key={item.switch.id} color={item.switch} />
          ): null)}
        </FadeIn>
      </FadeIn>

    </Bounded>
  );
};

export default SwitchPlayground;


const SharedCanvas = ({color }) => {
  if(!isFilled.contentRelationship(color) || !color.data) return null;

  const colorName = color.uid;
  const {color:hexColor, name} = color.data;

  const handleSound = () => {
    const selectedsounds = gsap.utils.random(SOUND_MAP[colorName]);

    const audio = new Audio(selectedsounds);
    audio.volume = 0.6;
    audio.play();
  }

  const bgColor = {
    blue: "bg-sky-950",
    red: "bg-red-950",
    brown: "bg-amber-950",
    black: "bg-gray-900",
  }[colorName];

  return (
    <div className="group relative min-h-96 overflow-hidden rounded-3xl select-none">
      {/* Text Button */}

      <button className="font-bold-slanted absolute bottom-0 left-0 z-10 flex items-center gap-3 p-6 text-4xl text-white uppercase focus:ring-2 focus:ring-white focus:outline-none"
      onClick={handleSound}
      >
        {name} <LuVolume2 />
      </button>
      <Canvas camera={{position: [1.5,2,0], fov: 7}}>
        <Stage
        adjustCamera intensity={.5} shadows={"contact"} environment={"city"}
        >
         <Switch  rotation={[0,Math.PI / 4, 0]} color={colorName} hexColor={hexColor}/>
        </Stage>
      </Canvas>
      <div className={clsx(
        "font-black-slanted absolute inset-0 -z-10 grid place-items-center text-8xl uppercase",
        bgColor,
      )}>
        <svg className="pointer-events-none h-auto w-full" viewBox="0 0 75 100">
          <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize={18}
          className="font-black-slanted fill-white/30 uppercase mix-blend-overlay group-hover:fill-white/100 omtion-safe:transition-all motion-safe:duration-700">
            {Array.from({length:8}, (_, i)=> (
              <tspan key={i} x={`${(i + 1) * 10}% `} dy={i === 0 ? -40 : 14}>
                {colorName}
                {colorName}
                {colorName} 
              </tspan>
            ))}
          </text>
        </svg>
      </div>
    </div>
  )
}
