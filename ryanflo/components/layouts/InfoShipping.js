"use client";
import { useContext, useEffect, useState } from "react";

import { StateGlobalContext } from "@/components/StateGlobal";
import DialogSuccess from "./DialogSuccess";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Loader from "./loader/Loader";

import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { listPaymentMethod } from "../constants";

export default function InfoShipping({ matchUserInfo }) {
    const [currentPayment, setCurrentPayment] = useState("COD");
    const [openInstruction, setOpenInstruction] = useState(false);

    const { data: session } = useSession();
    const { addedCart, deletedItemCart, setDeletedItemCart, openFormLogin, setOpenFormLogin,
        openFormRegister, setOpenFormRegister } = useContext(StateGlobalContext);

    const [openBuySuccess, setOpenBuySuccess] = useState(false);

    const [userCart, setUserCart] = useState();
    const [nameCustomer, setNameCustomer] = useState(matchUserInfo?.name);
    const [phone, setPhone] = useState(matchUserInfo?.phone);
    const [address, setAddress] = useState(matchUserInfo?.address);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserCart();
    }, [addedCart, deletedItemCart])
    async function getUserCart() {
        try {
            const resGetUserCart = await fetch(`/api/cart?email=${matchUserInfo?.email}`, {
                method: "GET"
            })
            const { userCart } = await resGetUserCart.json();
            setUserCart(userCart);
        } catch (error) {

        }
    }

    async function handleCreateOrder(e) {
        if (!userCart?.cartInfo || userCart?.cartInfo?.length == 0) {
            return;
        }
        if (currentPayment == "Credit card") {
            setOpenInstruction(true);
            return;
        }

        setLoading(true);
        const total = userCart?.cartInfo.reduce((initValue, itemCart) => {
            return initValue + itemCart.subPrice;
        }, 0)
        const data = {
            email: matchUserInfo?.email,
            name: nameCustomer,
            phone,
            address,
            note,
            isFinished: false,
            total,
            paymentMethod: currentPayment,
            orderInfo: [
                ...userCart?.cartInfo,
            ]
        }
        try {
            const resCreateOrder = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ data })
            })
            if (resCreateOrder.ok) {
                const resDeleteUserCart = await fetch(`/api/cart?id=${userCart?._id}`, {
                    method: "DELETE",
                })
                if (resDeleteUserCart.ok) {
                    setOpenBuySuccess(true);
                    setDeletedItemCart(prev => !prev);
                }
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }
    async function handleCashOnline() {
        setOpenInstruction(false)
        setLoading(true);
        const total = userCart?.cartInfo.reduce((initValue, itemCart) => {
            return initValue + itemCart.subPrice;
        }, 0)
        const data = {
            email: matchUserInfo?.email,
            name: nameCustomer,
            phone,
            address,
            note,
            isFinished: false,
            total,
            paymentMethod: currentPayment,
            orderInfo: [
                ...userCart?.cartInfo,
            ]
        }
        try {
            const resCreateOrder = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ data })
            })
            if (resCreateOrder.ok) {
                const resDeleteUserCart = await fetch(`/api/cart?id=${userCart?._id}`, {
                    method: "DELETE",
                })
                if (resDeleteUserCart.ok) {
                    setOpenBuySuccess(true);
                    setDeletedItemCart(prev => !prev);
                }
            }
        } catch (error) {

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="lg:border-r-slate-400 lg:border-r-solid lg:border-r">
            <div className="py-0 px-1 sm:px-5">
                <div className="mx-0 mt-8 mb-4 text-3xl font-bold">
                    Information Customer
                </div>
                <div className="">
                    <div className="flex flex-col sm:flex-row">
                        <div className="flex flex-col w-full static ">
                            <label htmlFor="input" className="text-sm text-[#757575] font-bold relative top-3 ml-2 py-0 px-1 bg-white w-fit">Name:</label>
                            <input
                                value={nameCustomer}
                                onChange={e => setNameCustomer(e.target.value)}
                                type="text"
                                placeholder="Write your name..."
                                className="py-3 px-2.5 text-sm border-solid border-[#d9d9d9] border-2 rounded bg-white focus:outline-0"
                            />
                        </div>
                        <div className="flex flex-col w-full static sm:ml-5">
                            <label htmlFor="input" className="text-sm text-[#757575] font-bold relative top-3 ml-2 py-0 px-1 bg-white w-fit">Phone number:</label>
                            <input
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                type="text"
                                placeholder="Write your phone..."
                                className="py-3 px-2.5 text-sm border-solid border-[#d9d9d9] border-2 rounded bg-white focus:outline-0"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col static w-full">
                            <label htmlFor="input" className="text-sm text-[#757575] font-bold relative top-3 ml-2 py-0 px-1 bg-white w-fit">Address:</label>
                            <input
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                                type="text"
                                placeholder="Address (Ex: 103 Van Phuc, phuong Van Phuc, ha dong, ha noi, vn)"
                                className="py-3 px-2.5 text-sm border-solid border-[#d9d9d9] border-2 rounded bg-white focus:outline-0"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col static w-full">
                            <label htmlFor="input" className="text-sm text-[#757575] font-bold relative top-3 ml-2 py-0 px-1 bg-white w-fit">Note:</label>
                            <input
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                type="text"
                                placeholder="Ex: Delivery from 12:00 to 17:00, or product anonymity"
                                className="py-3 px-2.5 text-sm border-solid border-[#d9d9d9] border-2 rounded bg-white focus:outline-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-0 px-5">
                <div className="mx-0 mt-8 mb-4 text-3xl font-bold">
                    Payment Method
                </div>
                <div className="">
                    <div className="mb-5">
                        {/* add method */}
                        {listPaymentMethod.map(method => (
                            <label
                                onClick={() => setCurrentPayment(method.name)}
                                className={`mb-4 flex items-center border border-solid border-[#D9D9D9] rounded-2xl py-4 px-5 cursor-pointer transition-all opacity-60 ${method.name === currentPayment && 'payment-method-item__active'}`}
                            >
                                <span className="min-w-9 max-w-14 max-h-9">
                                    <Image width={32} height={32} src={method.icon} className="" />
                                </span>
                                <span className="font-serif font-sm font-normal text-[#231f20] ml-5">
                                    <p>{method.title}</p>
                                    <p className="text-sm">{method.desc}</p>
                                </span>
                            </label>

                        ))}
                        {/* end */}
                    </div>
                </div>
                <button onClick={handleCreateOrder} className="checkout btn">
                    PROCEED TO PAYMENT
                </button>
            </div>
            {openFormLogin && <LoginForm open={openFormLogin} setOpen={setOpenFormLogin} setRegisOpen={setOpenFormRegister} />}
            {openFormRegister && <RegisterForm open={openFormRegister} setOpen={setOpenFormRegister} setLoginOpen={setOpenFormLogin} />}
            {openBuySuccess && (
                <DialogSuccess open={openBuySuccess} setOpen={setOpenBuySuccess} />
            )}
            {loading && <Loader />}
            <Dialog open={openInstruction} onClose={setOpenInstruction} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
                        <DialogPanel
                            transition
                            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                        >
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className='text-xl font-semibold text-gray-900'>
                                    Credit card payment process
                                </div>
                                <div className="my-2 text-sm text-gray-500">
                                    <p>Step 1: Scan the QR code below and make a money transfer</p>
                                    <p>The content of the transfer is "phone number - your name"</p>

                                </div>
                                <img src='/asset/img/qrbank.jpg' className='w-full' />
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Step 2: After successfully transferring money. Please click the "Confirm" button below</p>
                                    <p className=""><span className='text-gray-700 text-base font-semibold'>Note:</span> After about 30 minutes, Ryan's staff will call to confirm your order. Please hold the line. Best regards!</p>

                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                    type="button"
                                    onClick={handleCashOnline}
                                    className="inline-flex w-full justify-center rounded-md bg-[#16a34a] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#22b659] sm:ml-3 sm:w-auto"
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    data-autofocus
                                    onClick={() => setOpenInstruction(false)}
                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </div>
    )
}