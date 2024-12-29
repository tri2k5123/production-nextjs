import { Metadata } from 'next'
import React from 'react'
import Image from 'next/image'
import logInImage from "@/assets/login-image.jpg";

import Link from 'next/link';
import LoginForm from './LoginForm';
import GoogleSignInButton from './google/GoogleSignInButton';


export const metadata: Metadata = {
    title: "Login"
}

const LogInPage = () => {
  return (
    <main className='flex h-screen items-center justify-center p-5'>
        <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
            <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
                <div className="space-y-1 text-center">
                    <h1 className="text-3xl font-bold">Login to MTSMA</h1>
                    <p className="text-muted-foreground">
                        A place where even <span className="italic"> you </span> can find a friend
                    </p>
                </div>
                <div className="space-y-5">
                    <GoogleSignInButton />
                    <div className="flex items-center gap-3">
                        <div className="h-px flex-1 bg-muted"></div>
                        <span>OR</span>
                        <div className="h-px flex-1 bg-muted"></div>
                    </div>
                    <LoginForm/>
                    <div className='block text-center'>
                        Don&apos;t have an account? 
                        <Link href={"/signup"} className='hover:underline'> Sign up</Link>
                    </div>
                </div>
            </div>
            <Image
                src={logInImage}
                alt='image login'
                className='hidden w-1/2 object-cover md:block'
            />
        </div>
    </main>
  )
}

export default LogInPage