"use client"
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdUsers from "@/components/layouts/admin/AdUsers";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Categories() {
    const route = useRouter();
    const { data: session } = useSession();
    if(session?.user?.role !== "admin") route.push("/")

    return (
        <div className="mt-24 mx-9 mb-6">
            <SectionAdmin>
                <AdUsers />

            </SectionAdmin>
        </div>

    )
}
