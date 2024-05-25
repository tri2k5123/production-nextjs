"use client";
import HomeAbout from "@/components/layouts/HomeAbout";
import HomeCTASection from "@/components/layouts/HomeCTASection";
import HomeCategoryPreview from "@/components/layouts/HomeCategoryPreview";
import HomeNewLetterSection from "@/components/layouts/HomeNewLetterSection";
import HomePanel from "@/components/layouts/HomePannel";
import HomeProductFeature from "@/components/layouts/HomeProductFeature";
import HomeProductOverview from "@/components/layouts/HomeProductOverview";
import HomePromoSection from "@/components/layouts/HomePromoSection";
import HomeTestimonials from "@/components/layouts/HomeTestimonials";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  // console.log(session)
  
  return (
    <>
      <HomeCTASection/>
      <HomeAbout/>
      <HomeProductOverview/>
      <HomeCategoryPreview/>
      <HomeProductFeature/>
      <HomePromoSection/>
      <HomeTestimonials/>
      <HomeNewLetterSection/>
      <HomePanel/>
    </>
  );
}
