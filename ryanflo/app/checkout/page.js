"use client";
import InfoShipping from "@/components/layouts/InfoShipping";
import ListOrder from "@/components/layouts/ListOrder";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


export default function CheckoutPage() {
    const { data: session } = useSession();
    const [ matchUserInfo, setMatchUserInfo ] = useState(undefined);
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
        <div className="mt-24 mx-1 sm:mx-9 mb-6">
            <div className="row flex-col-reverse lg:flex-row">
                <div className="col l-6 md-12 c-12">
                    {matchUserInfo && <InfoShipping matchUserInfo={matchUserInfo}/>}
                </div>
                <div className="col l-6 md-12 c-12">
                    <ListOrder/>
                </div>
            </div>

        </div>
    )
}