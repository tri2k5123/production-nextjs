
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdUsers from "@/components/layouts/admin/AdUsers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Categories() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") redirect("/");
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <AdUsers />

            </SectionAdmin>
        </div>

    )
}
