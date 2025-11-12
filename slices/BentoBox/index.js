/**
 * @typedef {import("@prismicio/client").Content.BentoBoxSlice} BentoBoxSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BentoBoxSlice>} BentoBoxProps
 * @type {import("react").FC<BentoBoxProps>}
 */
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, PrismicText } from "@prismicio/react";
import clsx from "clsx";
import { asText } from "@prismicio/client";
import {FadeIn} from "@/components/FadeIn";
const BentoBox = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <FadeIn>
        <h2 id="features" className="font-bold-slanted mb-8 scroll-pt-6 text-6xl uppercase md:text-8xl">      
          <PrismicText field={slice.primary.heading} />
        </h2>
      </FadeIn>
      <FadeIn targetChildren className="grid grid-cols-1 gap-4 md:grid-cols-6">
        {slice.primary.items.map((item) => (
          <BentoBoxItem key={asText(item.text)} item={item} />          
        ))}
      </FadeIn>
    </Bounded>
  );
};

export default BentoBox;


function BentoBoxItem({item}) {
  return (  
     <div className={
      clsx(
        "relative overflow-hidden rounded-3xl",
        item.size === "Small" && "md:col-span-2",
        item.size === "Medium" && "md:col-span-3",
        item.size === "Large" && "md:col-span-4",
      )
     }>
        <PrismicNextImage field={item.image} className="h-full w-full object-cover"
          quality={96}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transpatent to-black"></div>
        <div className="absolute bottom-0 left-0 max-w-xl p-6 text-balance text-white">     
          <PrismicRichText field={item.text} />
        </div>
    </div> 
  )
}