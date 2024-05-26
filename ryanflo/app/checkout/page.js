"use client";
import InfoShipping from "@/components/layouts/InfoShipping";
import ListOrder from "@/components/layouts/ListOrder";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function CheckoutPage() {
    const { data: session } = useSession();
    const [ matchUserInfo, setMatchUserInfo ] = useState();
    useEffect(() => {
        getUserInfo();
    }, [])
    const getUserInfo = async () => {
        try {
            const resGetUserInfo = await fetch(`/api/profile?email=${session?.user?.email}`, {
                method: "GET"
            })
            const { matchUserInfo } = await resGetUserInfo.json();
            setMatchUserInfo(matchUserInfo);
        } catch (error) {
            
        }
    }

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <div className="row">
                <div className="col l-6">
                    {matchUserInfo && <InfoShipping matchUserInfo={matchUserInfo}/>}
                </div>
                <div className="col l-6">
                    <ListOrder/>
                </div>
            </div>

        </div>
    )
}