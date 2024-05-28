"use client"
import Profile from '@/components/layouts/Profile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';




export default function ProfileUser() {
   const route = useRouter();
    const { data: session } = useSession();
    const [ matchUserInfo, setMatchUserInfo ] = useState();
    if(!session) route.push("/");

    useEffect(() => {
        getProfile();
    }, [])
    const getProfile = async () => {
        try {
            const resGetProfile = await fetch(`/api/profile?email=${session?.user?.email}`, {
                method: "GET"
            })
            const { matchUserInfo } = await resGetProfile.json();
            setMatchUserInfo(matchUserInfo);
        } catch (error) {
            
        }
    }

    return (
        <div className="mt-24 lg:mt-28 mx-9 mb-6">
            <div className='gridIn wide'>
                {matchUserInfo && <Profile matchUserInfo={matchUserInfo}/>}
            </div>

        </div>
    )
}
