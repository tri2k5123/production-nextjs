"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { UserFormValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.actions"

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX = 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT = 'select',
    SKELETON = 'skeleton'
}


const PatientForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const route = useRouter();

    // 1. Define your form. 
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof UserFormValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        setIsLoading(true)
        try {
            const user = {
                name: values.name,
                email: values.email,
                phone: values.phone,
            };

            const newUser = await createUser(user);
            if (newUser) {
                route.push(`/patients/${newUser.$id}/register`);
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)

        }

    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                <section>
                    <h1 className="header">Hi there</h1>
                    <p className="text-dark-700">Schedule your first appointment.</p>
                </section>
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                />
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Your email"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                />
                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="+84 875423613"
                />
                <SubmitButton isLoading={isLoading}>
                    Get Started
                </SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm

/* user
{
    $createdAt: "2024-08-09T01:42:22.730+00:00"
    $id: "66b574e600185c18bd7f"
    $updatedAt: "2024-08-09T01:42:22.730+00:00"
    accessedAt: ""
    email: "my@gmail.com"
    emailVerification: false
    hash: "argon2"
    hashOptions: {
        memoryCost: 2048
        threads: 3
        timeCost: 4
        type: "argon2"
        [[Prototype]]: Object
    }
    labels: []
    mfa: false
    name: "mymymy"
    password: null
    passwordUpdate: ""
    phone: "+8423146789"
    phoneVerification: false
    prefs: {}
    registration: "2024-08-09T01:42:22.729+00:00"
    status: true
    targets: [
        {
            $createdAt: "2024-08-09T01:42:22.782+00:00"
            $id: "66b573febeef18c53c4d"
            $updatedAt: "2024-08-09T01:42:22.782+00:00"
            identifier: "my@gmail.com"
            name: ""
            providerId: null
            providerType: "email"
            userId: "66b574e600185c18bd7f"
        },
        {
            1: $createdAt: "2024-08-09T01:42:22.807+00:00"
            $id: "66b573fec512e1dfdb6b"
            $updatedAt: "2024-08-09T01:42:22.807+00:00"
            identifier: "+8423146789"
            name: ""
            providerId: null
            providerType: "sms"
            userId: "66b574e600185c18bd7f"
        }
    ]
}


*/