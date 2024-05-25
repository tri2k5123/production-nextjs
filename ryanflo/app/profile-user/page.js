import Profile from '@/components/layouts/Profile'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';

const getProfile = async (email) => {
    try {
        const resGetProfile = await fetch(`./api/profile?email=${email}`, {
            method: "GET"
        })
        return resGetProfile.json();
    } catch (error) {
        
    }
}


export default async function ProfileUser() {
    const session = await getServerSession(authOptions);
    if(!session) redirect("/");
    const { matchUserInfo } = await getProfile(session?.user?.email);
   
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <div className='gridIn wide'>
                <Profile matchUserInfo={matchUserInfo}/>
            </div>

        </div>
    )
}
