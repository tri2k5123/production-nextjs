"use client";
import { useContext, useEffect, useState } from "react";

import { StateGlobalContext } from "@/components/StateGlobal";
import DialogSuccess from "./DialogSuccess";
import { useSession } from "next-auth/react";

export default function InfoShipping({ matchUserInfo }) {
    const { data: session } = useSession();
    const { addedCart, deletedItemCart, setDeletedItemCart, setOpenFormRegister } = useContext(StateGlobalContext);

    const [ openBuySuccess, setOpenBuySuccess ] = useState(false);

    const [ userCart, setUserCart ] = useState();
    const [nameCustomer, setNameCustomer] = useState(matchUserInfo?.name);
    const [phone, setPhone] = useState(matchUserInfo?.phone);
    const [address, setAddress] = useState(matchUserInfo?.address);
    const [note, setNote] = useState("");

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
        if(session) {
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
                if(resCreateOrder.ok) {
                    const resDeleteUserCart = await fetch(`/api/cart?id=${userCart?._id}`, {
                        method: "DELETE",
                    })
                    if(resDeleteUserCart.ok) {
                        setOpenBuySuccess(true);
                        setDeletedItemCart(prev => !prev);
                    }
                    
                }
            } catch (error) {
                
            }
        } else {
            setOpenFormRegister(true)
        }
    }

    return (
        <div className="border-r-slate-400 border-r-solid border-r">
            <div className="py-0 px-5">
                <div className="mx-0 mt-8 mb-4 text-3xl font-bold">
                    Information Customer
                </div>
                <div className="">
                    <div className="flex">
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
                        <div className="flex flex-col w-full static  ml-5">
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
                        <label className="flex items-center border border-solid border-[#D9D9D9] rounded-2xl py-4 px-5 cursor-pointer transition-all opacity-60 payment-method-item__active">
                            <span className="min-w-9 max-w-14 max-h-9">
                                <img src="/asset/img/COD.svg" className="my-0 mx-6"/>
                            </span>
                            <span className="font-serif font-sm font-normal text-[#231f20] ml-5">
                                <p>Cash On Delivery (COD)</p>
                                <p>Pay when you receive</p>
                            </span>
                        </label>
                    </div>
                </div>
                <button onClick={handleCreateOrder} className="checkout btn">
                    PROCEED TO PAYMENT
                </button>
            </div>
            {openBuySuccess && (
                <DialogSuccess open={openBuySuccess} setOpen={setOpenBuySuccess}/>
            )}
        </div>
    )
}