import ArrowRight from "@/components/icons/ArrowRight";
import ArrowLeft from "@/components/icons/ArrowLeft";
import { memo, useState } from "react"

function SliderProduct({ imageUrls }) {
    const [imageIndex, setImageIndex] = useState(0);
    
    function handlePrev() {
        setImageIndex(index => {
            if(index == 0) return imageUrls.length - 1;
            return index - 1;
        })

    }
    function handleNext() {
        setImageIndex(index => {
            if(index == imageUrls.length - 1) return 0;
            return index + 1;
        })
    }
    return (
        <div>
            <div className="flex overflow-hidden">
                {imageUrls.map((url, i) => (
                    <img key={i} src={url} className="shrink-0 grow-0 transition-all duration-500 ease-in"
                        style={{ translate: `${-100 * imageIndex}%` }}
                    />

                ))}
            </div>
            <div className="relative w-full h-[72px] mt-2">
                <button className="slick-arrow left-0" onClick={handlePrev}>
                    <ArrowLeft />
                </button>
                <div className="ega-slick-thumb">
                    {imageUrls.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => setImageIndex(index)}
                            className={`flex h-full ml-2 ${imageIndex == index ? "border border-solid border-[#d42014]" : ""}`}
                        >
                            <img className="h-full aspect-square" src={url}/>
                        </button>
                    ))}
                </div>
                <button className="slick-arrow right-0" onClick={handleNext}>
                    <ArrowRight />
                </button>
            </div>
        </div>
    )
}
export default memo(SliderProduct)