// import InfoShipping from "@/components/layouts/InfoShipping";
// import ListOrder from "@/components/layouts/ListOrder";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";

// const getUserInfo = async (email) => {
//     try {
//         const resGetUserInfo = await fetch(`http://localhost:3000/api/profile?email=${email}`, {
//             method: "GET"
//         })
//         return resGetUserInfo.json();
//     } catch (error) {
        
//     }
// }
// export default async function CheckoutPage() {
//     const session = await getServerSession(authOptions);
//     const { matchUserInfo } = await getUserInfo(session?.user?.email);
    
//     return (
//         <div className="mt-[72px] mx-12 mb-6">
//             <div className="row flex-col-reverse sm:flex-row">
//                 <div className="col l-6">
//                     <InfoShipping matchUserInfo={matchUserInfo}/>
//                 </div>
//                 <div className="col l-6">
//                     <ListOrder/>
//                 </div>
//             </div>

//         </div>
//     )
// }
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
            <div className="row flex-col-reverse sm:flex-row">
                <div className="col l-6 md-12 c-12">
                    {/* {matchUserInfo && <InfoShipping matchUserInfo={matchUserInfo}/>} */}
                    <InfoShipping/>
                </div>
                <div className="col l-6 md-12 c-12">
                    <ListOrder/>
                </div>
            </div>

        </div>
    )
}