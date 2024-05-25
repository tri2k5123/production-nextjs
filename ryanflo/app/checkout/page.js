import InfoShipping from "@/components/layouts/InfoShipping";
import ListOrder from "@/components/layouts/ListOrder";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getUserInfo = async (email) => {
    try {
        const resGetUserInfo = await fetch(`./api/profile?email=${email}`, {
            method: "GET"
        })
        return resGetUserInfo.json();
    } catch (error) {
        
    }
}
export default async function CheckoutPage() {
    const session = await getServerSession(authOptions);
    const { matchUserInfo } = await getUserInfo(session?.user?.email);
    
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <div className="row">
                <div className="col l-6">
                    <InfoShipping matchUserInfo={matchUserInfo}/>
                </div>
                <div className="col l-6">
                    <ListOrder/>
                </div>
            </div>

        </div>
    )
}