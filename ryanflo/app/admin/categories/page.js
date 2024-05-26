"use client"
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdCategory from "@/components/layouts/admin/AdCategory";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Categories() {
    const route = useRouter();
    const { data: session } = useSession();
    if(session?.user?.role !== "admin") route.push("/");

    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <AdCategory/>
            </SectionAdmin>

        </div>

    )
}
