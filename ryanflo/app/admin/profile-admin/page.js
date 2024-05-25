import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Profile from "@/components/layouts/Profile";
import SectionAdmin from "@/components/layouts/SectionAdmin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const getProfile = async (email) => {
    try {
        const resGetProfile = await fetch(`./api/profile?email=${email}`, {
            method: "GET"
        })
        return resGetProfile.json();
    } catch (error) {
        
    }
}

export default async function ProfileAdmin() {
    const session = await getServerSession(authOptions);
    if(session?.user?.role !== "admin") redirect("/");
    const { matchUserInfo } = await getProfile(session?.user?.email);
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <SectionAdmin>
                <Profile matchUserInfo={matchUserInfo}/>
            </SectionAdmin>

        </div>
        
    )
}
