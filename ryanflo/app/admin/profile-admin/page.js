"use client";
import Profile from "@/components/layouts/Profile";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileAdmin() {
    const route = useRouter();
    const { data: session } = useSession();
    if(session?.user?.role !== "admin") route.push("/")

    const [ matchUserInfo, setMatchUserInfo ] = useState();

    useEffect(() => {
        getProfile();
    }, [])
    const getProfile = async () => {
        try {
            const resGetProfile = await fetch(`/api/profile?email=${session?.user?.email}`, {
                method: "GET"
            })
            const { matchUserInfo } = await resGetProfile.json();
            setMatchUserInfo(matchUserInfo);
        } catch (error) {
            
        }
    }

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                {matchUserInfo && <Profile matchUserInfo={matchUserInfo}/>}
            </SectionAdmin>

        </div>
        
    )
}
