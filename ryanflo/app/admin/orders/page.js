"use client";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdOrder from "@/components/layouts/admin/AdOrder";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function Orders() {
    const route = useRouter();
    const { data: session } = useSession();
    if(session?.user?.role !== "admin") route.push("/");

    const [ orders, setOrders ] = useState();

    useEffect(() => {
        getListOrder();
    }, [])
    async function getListOrder() {
        try {
            const resGetListOrder = await fetch(`/api/order?email=${session?.user?.email}`, {
                method: "GET"
            })
            const { orders } = await resGetListOrder.json();
            setOrders(orders);
        } catch (error) {
    
        }
    }

    return (
        <div className="mt-24 mx-9 mb-6">
            <SectionAdmin>
                {orders && <AdOrder orders={orders}/>}
            </SectionAdmin>

        </div>
    )
}
