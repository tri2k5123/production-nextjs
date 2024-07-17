import { useLayoutEffect, useState } from "react";
import { posters } from "../constants";

export default function HomeCTASection() {
  const [ currentPoster, setCurrentPoster ] = useState(0);

  useLayoutEffect(() => {
    const intervalChangePoster = setInterval(() => {
      setCurrentPoster(prev => prev === posters.length - 1 ? 0 : prev + 1)
    }, 8000)
    return () => {
      clearInterval(intervalChangePoster)
    }
  },[])
  return (
    <div className="mb-12">
      <div className="h-screen bg-cover bg-no-repeat bg-top transition-all duration-1000" style={{ backgroundImage: posters[currentPoster] }}></div>
    </div>
  )
}

