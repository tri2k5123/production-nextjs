"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import Loader from './loader/Loader';
import Toast from './Toast';



export default function Profile({ matchUserInfo }) {
    const [newPassword, setNewPassword] = useState(matchUserInfo.password)
    const [newName, setNewName] = useState(matchUserInfo.name)
    const [newPhone, setNewPhone] = useState(matchUserInfo.phone)
    const [newAddress, setNewAddress] = useState(matchUserInfo.address)
    const [loading, setLoading] = useState(false);

    const [showToast, setShowToast] = useState(false);

    const { data: session } = useSession();
    const emailSession = session?.user?.email;

    function handleClearForm() {
        setNewPassword(matchUserInfo.password)
        setNewName(matchUserInfo.name)
        setNewPhone(matchUserInfo.phone)
        setNewAddress(matchUserInfo.address)
    }
    useEffect(() => {
        const toastInterval = setTimeout(() => {
            setShowToast(false)
        }, 3000)
        return () => {
            clearTimeout(toastInterval)
        }
    }, [showToast])
    async function handleUpdateProfile(e) {
        e.preventDefault();
        setLoading(true);
        try {

            const resUpdateProfile = await fetch("./api/profile", {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ emailSession, newPassword, newName, newPhone, newAddress })
            })
            if (resUpdateProfile.ok) {
                setShowToast(true);
            }
        } catch (error) {

        }
        setLoading(false)
    }

    return (
        <form>
            {loading && <Loader />}
            {showToast && <Toast setShowToast={setShowToast} title={`Successfully updated!`} description={`profile has been updated successfully.`} />}
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-3xl font-semibold leading-7 text-gray-900">Profile</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <div className="  flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <div className='cursor-not-allowed flex-1 border-0 rounded-md bg-gray-300 bg-opacity-85 py-1.5 pl-4 text-gray-600 sm:text-sm sm:leading-6'>{matchUserInfo.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="password"
                                        id="password"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive delivery.</p>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={newName}
                                    onChange={e => setNewName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={newPhone}
                                    onChange={e => setNewPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    value={newAddress}
                                    onChange={e => setNewAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleClearForm}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleUpdateProfile}
                >
                    Save
                </button>
            </div>

        </form>
    )
}