"use client";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdHistoryOrder from "@/components/layouts/admin/AdHistoryOrder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function HistoryOrders() {
    const route = useRouter();
    const { data: session } = useSession();
    if(session?.user?.role !== "admin") route.push("/");

    const [ listHistoryOrder, setListHistoryOrder ] = useState();
    useEffect(() => {
        getHistoryOrder();
    }, []);
    const getHistoryOrder = async () => {
        try {
            const resGetHistoryOrder = await fetch(`/api/history-order`, {
                method: "GET"
            })
            const { listHistoryOrder } = await resGetHistoryOrder.json();
            setListHistoryOrder(listHistoryOrder)
        } catch (error) {
            
        }
    }

    return (
        <div className="mt-24 mx-9 mb-6">
            <SectionAdmin>
                {listHistoryOrder && <AdHistoryOrder listHistoryOrder={listHistoryOrder}/>}
            </SectionAdmin>

        </div>
        
    )
}
