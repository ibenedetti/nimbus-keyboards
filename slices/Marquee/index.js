import { LogoMark } from "@/components/LogoMark";
import clsx from "clsx";
import { Fragment } from "react";

/**
 * @typedef {import("@prismicio/client").Content.MarqueeSlice} MarqueeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MarqueeSlice>} MarqueeProps
 * @type {import("react").FC<MarqueeProps>}
 */
const Marquee = ({ slice }) => {

  const MarqueeContent = () => (
     <div className="flex items-center bg-black/80 py-10 whitespace-nowrap">
        
          {slice.primary.phrases.map((item, i) => (
            <Fragment key={i}>

              <div 
              className="text-[180px] md:text-[260px] font-bold-slanted px-14 text-red-400/80 leading-none uppercase [text-box:trim-both_cap_alphabetic]" 
              >             
                
                {item.text}
                </div>
              <LogoMark className="size-36 flex-shrink-0"/>
            </Fragment>
        ))}
      </div>
  )
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="relative flex w-wull items-center select-none overflow-hidden"
      aria-hidden="true" role="presentation">
        <div className="flex relative items-center whitespace-nowrap">
          <div className={clsx( "marquee-track animate-marquee flex", slice.primary.direction === "Right" && "[animation-direction:reverse]")}>

            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />        
        </div>
      </div>
    </div>
    </section>
  );
};

export default Marquee;
