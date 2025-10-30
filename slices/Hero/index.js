"use client"

/**
 * @typedef {import("@prismicio/client").Content.HeroSlice} HeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSlice>} HeroProps
 * @type {import("react").FC<HeroProps>}
 */
import { PrismicRichText } from "@prismicio/react";
import  Bounded  from "@/components/Bounded";
import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
const Hero = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="blue-gradient-bg text-white relative h-dvh text-shadow-black/30 text-shadow-lg"
    >
      <div className="hero-scene sticky pointer-events-none top-0 h-dvh w-full">
        <Canvas shadows="soft">
          <Scene />
        </Canvas>
      </div>

      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded fullWidth className="absolute top-18 inset-x-0 md:top-24 md:left-[8dvw]">
        <PrismicRichText field={slice.primary.heading} components={{
          heading1: ({children}) => (
            <h1 className="hero-heading font-black-slanted text-6xl leading-[0.8] uppercase sm:text-7xl lg:text-8xl">
              {children}
            </h1>
          )
        }} />
        </Bounded>

        <Bounded fullwidth 
        className="hero-body absolute bottom-0 inset-x-0 md:right-[8dvh] md:left-auto"
        
        >          
          <div className="max-w-md flex flex-col gap-3">
            <PrismicRichText field={slice.primary.body} components={{
              heading2: ({children}) => (
                <h2 className="font-bold-slanted mb-1 text-4xl uppercase lg:mb-2 lg:text-6xl">{children}</h2>
              )
            }} />
            <button className="group font-bold-slanted flex w-fit cursor-pointer items-center gap-1 rounded bg-[#01a7e1] px-3 py-1 text-2xl uppercase transition disabled:grayscale">          
              {slice.primary.buy_button_text}
              <span className="group-hover:translate-x-1 transition">{">"}</span>
            </button>
          </div>     
        </Bounded>   
      </div>
    </section>
  );
};

export default Hero;
