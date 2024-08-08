'use client'
import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { decryptKey, encryptKey } from '@/lib/utils';

const PasskeyModal = () => {
    const route = useRouter();
    const [open, setOpen] = useState(true)
    const [passkey, setPassKey] = useState('')
    const [error, setError ] = useState('')
    const path = usePathname();

    const encryptedKey = typeof window !== 'undefined' ? window.localStorage.accessKey : null;

    useEffect(() => {
        const accessKey = encryptedKey && decryptKey(encryptedKey);

        if(path) {
            if(accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false);
                route.push('/admin')
            } else {
                setOpen(true)
            }
        }
    
    }, [encryptedKey])

    const closeModal = () => {
        route.push(`/`)
    }

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);
            localStorage.setItem('accessKey', encryptedKey)
            setOpen(false);
        } else {
            setPassKey('')
            setError('Invalid passkey. Please try again.')
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className='shad-alert-dialog'>
                <AlertDialogHeader>
                    <AlertDialogTitle className='flex items-start justify-between'>
                        Admin Access Verification
                        <Image
                            src={`/assets/icons/close.svg`}
                            alt='close'
                            width={20}
                            height={20}
                            className='cursor-pointer'
                            onClick={() => closeModal()}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="">
                    <InputOTP 
                        maxLength={6}
                        value={passkey}
                        onChange={value => setPassKey(value)}    
                    >
                        <InputOTPGroup className='shad-otp'>
                            <InputOTPSlot className='shad-otp-slot' index={0} />
                            <InputOTPSlot className='shad-otp-slot' index={1} />
                            <InputOTPSlot className='shad-otp-slot' index={2} />
                            <InputOTPSlot className='shad-otp-slot' index={3} />
                            <InputOTPSlot className='shad-otp-slot' index={4} />
                            <InputOTPSlot className='shad-otp-slot' index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    {error && <p className='shad-error text-14-regular mt-4 flex justify-center'>{error}</p>}
                </div>

                <AlertDialogFooter>
                    <AlertDialogAction
                        onClick={validatePasskey} 
                        className='shad-primary-btn w-full'   
                    >
                        Enter Admin Passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default PasskeyModal