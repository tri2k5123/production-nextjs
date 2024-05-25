import SectionAdmin from "@/components/layouts/SectionAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);
    if (!session || session?.user?.role != "admin") redirect("/")

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <div>
                    page Admin
                </div>

            </SectionAdmin>
        </div>
        

    )
}
