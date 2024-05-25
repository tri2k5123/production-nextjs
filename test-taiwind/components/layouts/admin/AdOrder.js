"use client";

import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";
import { addDotToPrice, dbTimeForHuman, sizes } from "./generalData";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AdOrder({ orders }) {
    const feeShipping = useRef(25000);
    const route = useRouter();

    async function handleFinishedOrder(id, email, total) {
        try {
            const resCreateHistoryOrder = await fetch(`http://localhost:3000/api/history-order`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ email, total })
            })
            if (resCreateHistoryOrder.ok) {
                const resDeleteOrder = await fetch(`http://localhost:3000/api/order?id=${id}`, {
                    method: "DELETE"
                })
                if (resDeleteOrder.ok) {
                    route.refresh()

                }
            }
        } catch (error) {

        }
    }
    async function handleCancerOrder(id) {
        try {
            const resCancelOrder = await fetch(`http://localhost:3000/api/order?id=${id}`, {
                method: "DELETE"
            })
            if (resCancelOrder.ok) {
                route.refresh()

            }
        } catch (error) {

        }
    }
    return (
        <div className="mb-6">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#111827]">Orders</h1>
                <p className="text-[#6B7280] text-sm"></p>
            </div>
            <div className="mb-5">
                {orders ?
                    orders.map(itemOrder => (
                        <div key={itemOrder._id} className="mb-5 border rounded text-sm">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-10">
                                    <div className="">
                                        <h4 className="font-bold text-[#111827] mb-2">Date placed</h4>
                                        <p className="text-[#6B7280]">{dbTimeForHuman(itemOrder.createdAt)}</p>
                                    </div>
                                    <div className="">
                                        <h4 className="font-bold text-[#111827] mb-2">State</h4>
                                        <p className="text-[#111827] font-bold">
                                            {!itemOrder.isFinished && "Processing"}
                                        </p>
                                    </div>
                                    <div className="">
                                        <h4 className="font-bold text-[#111827] mb-2">Total amount</h4>
                                        <p className="text-[#111827] font-bold">{addDotToPrice(itemOrder.total + feeShipping.current)}đ</p>
                                    </div>
                                </div>
                                <div>
                                    <Link href={`/summary-order/${itemOrder._id}`} className="text-[#111827] py-2 px-2.5 border border-[#6B7280] rounded">View Order</Link>
                                </div>
                            </div>
                            {itemOrder.orderInfo.map((itemOrderInfo, i) => (
                                <div key={i} className="border-t p-6">
                                    <div className="flex">
                                        <div>
                                            <Image width={160} height={160} src={itemOrderInfo.img} className="aspect-square" />

                                        </div>
                                        <div className="ml-6 w-full flex-1">
                                            <div className="flex justify-between items-center ">
                                                <div className="text-[#111827] font-bold">
                                                    {itemOrderInfo.productName}
                                                </div>
                                                <div className="text-[#111827] font-bold">
                                                    {addDotToPrice(itemOrderInfo.subPrice)}đ
                                                </div>
                                            </div>
                                            <div className="text-[#6B7280] mt-4">Color: {itemOrderInfo.activeColor}</div>
                                            <div className="text-[#6B7280] mt-4">Size: {sizes[itemOrderInfo.activeSize]}</div>
                                            <div className="text-[#6B7280] mt-4">Qty: {itemOrderInfo.quantityChosen}</div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                            <div className="mb-5 mr-5 flex justify-between items-center ">
                                <div className=""></div>
                                <div>
                                    <div
                                        className="inline-block py-1.5 px-3 text-[#4F46E5] cursor-pointer"
                                        onClick={() => handleFinishedOrder(itemOrder._id, itemOrder.email, itemOrder.total)}
                                    >
                                        Finished
                                    </div>
                                    <div
                                        className="inline-block py-1 pl-3 ml-3 border-l text-[#4F46E5] cursor-pointer"
                                        onClick={() => handleCancerOrder(itemOrder._id)}

                                    >
                                        Cancel
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div>empty</div>
                    )}


            </div>
        </div>
    )
}