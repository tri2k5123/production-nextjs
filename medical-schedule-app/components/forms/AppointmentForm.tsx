"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { getAppointmentSchema } from "@/lib/validation"
import { useRouter } from "next/navigation"

import { FormFieldType } from "./PatientForm"
import { Doctors } from "@/constants"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import { createAppointment, updateAppointment } from "@/lib/actions/appointment.actions"
import { Appointment } from "@/types/appwrite.types"


const AppointmentForm = ({
  type, userId, patientId, appointment, setOpen
}: {
  type: "create" | "cancel" | "schedule", 
  userId: string, 
  patientId: string,
  appointment: Appointment,
  setOpen: (open: boolean) => void,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const route = useRouter();

  const AppointmentFormValidation = getAppointmentSchema(type)

  // 1. Define your form. 
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician,
      schedule: new Date(appointment?.schedule),
      reason: appointment?.reason,
      note: appointment?.note,
      cancellationReason: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setIsLoading(true)

    let status;
    switch (type) {
      case "cancel":
        status = 'cancelled';
        break;
      case "schedule":
        status = 'scheduled';
        break;
      default:
        status = 'pending';
        break;
    }

    try {
      if(type === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status
        }
        const appointment = await createAppointment(appointmentData)
        if(appointment) {
          form.reset();
          route.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`);
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values?.primaryPhysician,
            schedule: new Date(values?.schedule),
            status: status as Status,
            cancellationReason: values?.cancellationReason,
          },
          type
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdate);
        if(updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
      

    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)

    }

  }

  let buttonLabel;
  switch (type) {
    case "create":
      buttonLabel = 'Create Appointment';
      break;
    case "cancel":
      buttonLabel = 'Cancel Appointment';
      break;
    case "schedule":
      buttonLabel = 'Schedule Appointment';
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === 'create' && <section>
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Request a new appointment in 10 seconds.</p>
        </section>}

        {type !== "cancel" ? (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map(doctor => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={32}
                      height={32}
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="Annual month check-up"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="notes"
                label="Additional comments/notes"
                placeholder="Prefer afternoon appointment, if possible"
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              placeholder="Select your appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyy hh:mm aa"
            />
          </>
        ) : (
          <>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for cancellation"
              placeholder="Enter reason for cancellation"
            />
          </>
        )}



        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm

/*
appointment {
  $collectionId: "66acc10b0005215b35f6"
  $createdAt: "2024-08-05T13:26:17.547+00:00"
  $databaseId: "66acbd770005875eaecc"
  $id: "66b0d3e0000bc5cd2f9f"
  $permissions: []
  $tenant: "178669"
  $updatedAt: "2024-08-05T13:26:17.547+00:00"
  cancellationReason: null
  note: ""
  patient: {email: 'servertongdai@gmail.com', phone: '+84889012927', userId: '66aceca5001d332cbeba', name: 'servertongdai', privacyConsent: true, …}
  primaryPhysician: "Leila Cameron"
  reason: "1232"
  schedule: "2024-08-05T13:29:55.061+00:00"
  status: "pending"
  userId: "66aceca5001d332cb
}


*/