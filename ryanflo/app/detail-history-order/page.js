
import DetailOrder from "@/components/layouts/DetailOrder";
import HistoryOrder from "@/components/layouts/HistoryOrder";

import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

async function getListOrder(email) {
    try {
        const resGetListOrder = await fetch(`/api/order?email=${email}`, {
            method: "GET"
        })
        return resGetListOrder.json();
        
    } catch (error) {

    }
}

export default async function DetailHistoryOrder() {
    const session = await getServerSession(authOptions);
    
    const { listOrder } = await getListOrder(session?.user?.email);
    
    
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <div className="gridIn wide">
                <DetailOrder listOrder={listOrder}/>
                {/* <HistoryOrder/> */}
            </div>

        </div>
    )
}

