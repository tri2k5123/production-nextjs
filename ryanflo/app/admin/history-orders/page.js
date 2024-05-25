
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdHistoryOrder from "@/components/layouts/admin/AdHistoryOrder";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getHistoryOrder = async () => {
    try {
        const resGetHistoryOrder = await fetch(`./api/history-order`, {
            method: "GET"
        })
        return resGetHistoryOrder.json()
    } catch (error) {
        
    }
}

export default async function HistoryOrders() {
    const session = await getServerSession(authOptions);
    if(session?.user?.role !== "admin") redirect("/");
    const { listHistoryOrder } = await getHistoryOrder();
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <AdHistoryOrder listHistoryOrder={listHistoryOrder}/>
            </SectionAdmin>

        </div>
        
    )
}
