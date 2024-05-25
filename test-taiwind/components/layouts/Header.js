"use client";
import { memo, useContext, useEffect, useState } from "react";

import Link from "next/link";
import IconCart from "@/components/icons/IconCart";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useSession } from "next-auth/react";


import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline'
import { ArrowLeftStartOnRectangleIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { signOut } from "next-auth/react";
import { StateGlobalContext } from "../StateGlobal";

function Header() {
    const { data: session } = useSession();
    const { openFormLogin,
        setOpenFormLogin,
        openFormRegister,
        setOpenFormRegister } = useContext(StateGlobalContext);
    // const [openFormLogin, setOpenFormLogin] = useState(false);
    // const [openFormRegister, setOpenFormRegister] = useState(false);
    const [ listCategories, setListCategories ] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])
    async function getCategories() {
        try {
            const resGetCategory = await fetch("http://localhost:3000/api/category", {
                method: "GET"
            })
            const {listCategories} = await resGetCategory.json();
            setListCategories(listCategories)
        } catch (error) {
            
        }

    }

    return (
        <header className="fixed z-[9] inset-x-0 top-0 duration-300 bg-white my-0">
            <div className="mx-12 flex  h-16 items-center ">

                <Link href="/"><img className="pr-4 h-10" src="/asset/img/logo.webp" alt="Ryan studio" /></Link>
                <div className="flex items-center justify-between flex-1">
                    <div className="text-color-text text-xs flex items-center">
                        {listCategories.map((navItem, index) => (
                            <Link key={index} href={`/collections/${navItem.category}`} className="my-0 mx-3 px-0 py-4 relative block text-color-text circle hover:before:block">{navItem.name}</Link>
                        ))}
                    </div>
                </div>

                {session ? (
                    <div className="mr-4">
                        <Popover className="relative">
                            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                <UserCircleIcon className="w-6 h-6 cursor-pointer"></UserCircleIcon>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute z-10 mt-5 flex w-64 right-1/2 translate-x-1/4 px-4">
                                    <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                        <div className="p-4">
                                            {session?.user?.role === "user" ? (
                                                <>
                                                    <Link href={"/profile-user"} className="items-center group relative flex gap-x-6 rounded-lg hover:bg-gray-50">
                                                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                            <UserCircleIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">
                                                                Profile
                                                                <span className="absolute inset-0" />
                                                            </div>
                                                            {/* <p className="mt-1 text-gray-600">Records contain all the information you provide to us</p> */}
                                                        </div>
                                                    </Link>
                                                    <Link href={"/detail-history-order"} className="items-center group relative flex gap-x-6 rounded-lg hover:bg-gray-50">
                                                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                            <ClipboardDocumentListIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">
                                                                Detail Orders
                                                                <span className="absolute inset-0" />
                                                            </div>
                                                            {/* <p className="mt-1 text-gray-600">This page contains all of your orders</p> */}
                                                        </div>
                                                    </Link>

                                                </>
                                            ) : (
                                                <Link href={"admin/profile-admin"} className="items-center group relative flex gap-x-6 rounded-lg hover:bg-gray-50">
                                                    <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                        <ClipboardDocumentListIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900">
                                                            Admin Page
                                                            <span className="absolute inset-0" />
                                                        </div>
                                                        {/* <p className="mt-1 text-gray-600">This page contains all of your orders</p> */}
                                                    </div>
                                                </Link>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 divide-x cursor-pointer divide-gray-900/5 bg-gray-50">
                                            <div
                                                onClick={() => signOut()}
                                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                                            >
                                                <ArrowLeftStartOnRectangleIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                Log out
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </div>
                ) : (
                    <div className=" border-t border-gray-200 px-4 py-6 flex items-center">
                        <div className="cursor-pointer flow-root" onClick={() => setOpenFormLogin(true)}>
                            <div className="-m-2 block p-2 font-medium text-gray-500 text-sm">
                                Sign in
                            </div>
                        </div>
                        <div className="cursor-pointer flow-root border-l-2 ml-2 pl-2 border-gray-500" onClick={() => setOpenFormRegister(true)}>
                            <div className="-m-2 block p-2 font-medium text-gray-500 text-sm">
                                Create account
                            </div>
                        </div>
                    </div>
                )}
                {openFormLogin && <LoginForm open={openFormLogin} setOpen={setOpenFormLogin} setRegisOpen={setOpenFormRegister} />}
                {openFormRegister && <RegisterForm open={openFormRegister} setOpen={setOpenFormRegister} setLoginOpen={setOpenFormLogin}/>}
                <IconCart />
            </div>
        </header>
    )
}
export default memo(Header)

