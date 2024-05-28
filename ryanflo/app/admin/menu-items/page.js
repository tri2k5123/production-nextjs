"use client"
import SectionAdmin from "@/components/layouts/SectionAdmin";
import AdMenuItem from "@/components/layouts/admin/AdMenuItem";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MenuItems() {

    const route = useRouter();
    const { data: session } = useSession();
    if(session?.user?.role !== "admin") route.push("/");

    return (
        <div className="mt-24 mx-9 mb-6">
            <SectionAdmin>
                <AdMenuItem/>
            </SectionAdmin>

        </div>

    )
}