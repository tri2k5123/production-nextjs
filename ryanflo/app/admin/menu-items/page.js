import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdMenuItem from "@/components/layouts/admin/AdMenuItem";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function MenuItems() {
    const session = await getServerSession(authOptions);
    if(session?.user?.role !== "admin") redirect("/");

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <AdMenuItem/>
            </SectionAdmin>

        </div>

    )
}