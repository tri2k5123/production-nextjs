"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { addDotToPrice, dbTimeForHuman } from "./generalData";



export default function AdHistoryOrder({ listHistoryOrder }) {

    const route = useRouter();
      async function handleDeleteHistoryOrder(id) {
        try {
            const resDeleteHistoryOrder = await fetch(`ryanflo.vercel.app/api/history-order?id=${id}`, {
                method: "DELETE"
            })
            if(resDeleteHistoryOrder.ok) {
                route.refresh();
            }
        } catch (error) {
            
        }
      }
    return (
        <div className="mb-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#111827]">Order History</h1>
                {/* <p className="text-[#6B7280] text-sm">Check the status of recent orders, manage returns, and discover similar products.</p> */}
            </div>
            <div className="mb-5">
                {listHistoryOrder.map(item => (
                    <div className="border rounded text-sm">
                        <div className="flex items-center justify-between p-6">
                            <div>
                            <div className="">
                                    <h4 className="font-bold text-[#111827]">Email</h4>
                                    <p className="text-[#6B7280]">{item.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-16">
                                <div className="">
                                    <h4 className="font-bold text-[#111827]">Date Delivered</h4>
                                    <p className="text-[#6B7280] flex items-center">
                                        <CheckIcon className="w-5 h-5 rounded-full p-1 mr-3 bg-[#22c55e] text-white" />
                                        {dbTimeForHuman(item.createdAt)}
                                    </p>
                                </div>
                                <div className="">
                                    <h4 className="font-bold text-[#111827]">Total amount</h4>
                                    <p className="text-[#111827]">{addDotToPrice(item.total)}đ</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5 mr-5 flex justify-between items-center">
                            <div className=""></div>
                            <div>
                                <div
                                    className="inline-block py-1 pl-3 ml-3 text-[#4F46E5] cursor-pointer"
                                    onClick={() => handleDeleteHistoryOrder(item._id)}
                                >
                                    Delete
                                </div>
                            </div>
                        </div>

                    </div>

                ))}
            </div>
        </div>
    )
}