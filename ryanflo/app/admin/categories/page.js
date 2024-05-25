import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdCategory from "@/components/layouts/admin/AdCategory";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Categories() {
    const session = await getServerSession(authOptions)
    if(session?.user?.role !== "admin") redirect("/")
    

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <AdCategory/>
            </SectionAdmin>

        </div>

    )
}
