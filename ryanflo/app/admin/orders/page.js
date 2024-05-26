
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdOrder from "@/components/layouts/admin/AdOrder";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getListOrder(email) {
    try {
        const resGetListOrder = await fetch(`/api/order?email=${email}`, {
            method: "GET"
        })
        return resGetListOrder.json();
        
    } catch (error) {

    }
}

export default async function Orders() {
    const session = await getServerSession(authOptions);
    if(session?.user?.role !== "admin") redirect("/");
    const { orders } = await getListOrder(session?.user?.email);

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <AdOrder orders={orders}/>
            </SectionAdmin>

        </div>
    )
}
