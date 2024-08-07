import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const Register = async ({ params: { userId } }: SearchParamProps) => {
    const user = await getUser(userId)
    return (
        <div className="flex h-screen max-h-screen">
            {/* TODO: OTP Verification | PasskeyModal */}

            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10 ">
                    <Image
                        src={"/assets/icons/logo-full.svg"}
                        alt="patient"
                        height={1000}
                        width={1000}
                        className="mb-12 h-10 w-fit"
                    />
                    <RegisterForm user={user} />
                    <p className="copyright py-12">
                        © 2024 CareSmart
                    </p>
                </div>
            </section>

            <Image
                src={"/assets/images/register-img.png"}
                height={1000}
                width={1000}
                alt="patient"
                className="side-img max-w-[390px]"
            />
        </div>
    )
}

export default Register

/* Các biến mà user trả về
{
    '$id': '66aceca5001d332cbeba',
    '$createdAt': '2024-08-02T14:22:56.615+00:00',
    '$updatedAt': '2024-08-02T14:22:56.615+00:00',
    name: 'trimai1',
    password: null,
    hash: 'argon2',
    hashOptions: { type: 'argon2', memoryCost: 2048, timeCost: 4, threads: 3 },  
    registration: '2024-08-02T14:22:56.613+00:00',
    status: true,
    labels: [],
    passwordUpdate: '',
    email: 'mai@gmail.com',
    phone: '+84889012927',
    emailVerification: false,
    phoneVerification: false,
    mfa: false,
    prefs: {},
    targets: [
        {
        '$id': '66acebc0b44ba7094c15',
        '$createdAt': '2024-08-02T14:22:56.738+00:00',
        '$updatedAt': '2024-08-02T14:22:56.738+00:00',
        name: '',
        userId: '66aceca5001d332cbeba',
        providerId: null,
        providerType: 'email',
        identifier: 'mai@gmail.com'
        },
        {
        '$id': '66acebc0bc14089f0ecc',
        '$createdAt': '2024-08-02T14:22:56.770+00:00',
        '$updatedAt': '2024-08-02T14:22:56.770+00:00',
        name: '',
        userId: '66aceca5001d332cbeba',
        providerId: null,
        providerType: 'sms',
        identifier: '+84889012927'
        }
    ],
    accessedAt: ''
}
 GET /patients/66aceca5001d332cbeba/register 200 in 135ms

*/