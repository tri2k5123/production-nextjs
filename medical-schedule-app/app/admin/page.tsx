
import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react';

import { columns, Payment } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'

const AdminPage = async () => {
    const { scheduledCount,
        pendingCount,
        cancelledCount,
        totalCount,
        documents
    } = await getRecentAppointmentList();


    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href={"/"} className='cursor-pointer'>
                    <Image
                        src={'/assets/icons/logo-full.svg'}
                        height={32}
                        width={162}
                        alt='Logo'
                        className='h-8 w-fit '
                    />
                </Link>
                <p className="text-16-semibold">Admin Dashboard</p>
            </header>
            <main className='admin-main'>
                <section className="w-full space-y-4">
                    <h1 className="header">Welcome</h1>
                    <p className="text-dark-700">Start the day with managing new appointments</p>
                </section>
                <section className="admin-stat">
                    <StatCard
                        type="appointments"
                        count={scheduledCount}
                        label="Total number of scheduled appointments"
                        icon="/assets/icons/appointments.svg"
                    />
                    <StatCard
                        type="pending"
                        count={pendingCount}
                        label="Total number of pending appointments"
                        icon="/assets/icons/pending.svg"
                    />
                    <StatCard
                        type="cancelled"
                        count={cancelledCount}
                        label="Total number of cancelled appointments"
                        icon="/assets/icons/cancelled.svg"
                    />
                </section>
                <DataTable columns={columns} data={documents} />
            </main>
        </div>
    )
}

export default AdminPage