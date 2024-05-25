"use client";
import Link from "next/link";
import {  useRef } from "react";
import { addDotToPrice, dbTimeForHuman, sizes } from "@/components/layouts/admin/generalData";

export default function DetailOrder({ listOrder }) {
    const feeShipping = useRef(25000);
    async function handleDeleteOrder(id) {
        try {
            const resCancelOrder = await fetch(`api/order?id=${id}`, {
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
                <h1 className="text-3xl font-bold text-[#111827]">Order detail</h1>
                <p className="text-[#6B7280] text-sm">Check the status of recent orders, manage returns, and discover similar products.</p>
            </div>
            <div className="mb-5">
                {listOrder ? (
                    <>
                        {listOrder.map(itemOrder => (
                        <div key={itemOrder._id} className="border rounded text-sm  mb-5">
                            <div className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-16">
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
                                    <Link href={`https://ryanflo.vercel.app/summary-order/${itemOrder._id}`} className="text-[#111827] py-2 px-2.5 border border-[#6B7280] rounded">View Order</Link>
                                </div>
                            </div>
                            {itemOrder.orderInfo.map((item, i) => (
                                <div key={i} className="border-t p-6">
                                    <div className="flex">
                                        <div>
                                            <img  src={item.img} className="w-40 h-40 aspect-square" alt={item.productName} />
                                        </div>
                                        <div className="ml-6 w-full flex-1">
                                            <div className="flex justify-between items-center ">
                                                <div className="text-[#111827] font-bold">
                                                    {item.productName}
                                                </div>
                                                <div className="text-[#111827] font-bold">
                                                    {addDotToPrice(item.subPrice)}đ
                                                </div>
                                            </div>
                                            <div className="text-[#6B7280] mt-2">Color: {item.activeColor}</div>
                                            <div className="text-[#6B7280] mt-2">Size: {sizes[item.activeSize]}</div>
                                            <div className="text-[#6B7280] mt-2">Qty: {item.quantityChosen}</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex justify-between items-center">
                                        <div className=""></div>
                                        <div>
                                            <Link href={`https://ryanflo.vercel.app/product/${item.id}`}>
                                                <div className="inline-block py-1.5 px-3 text-[#4F46E5] cursor-pointer">View product</div>

                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                                <div className="mb-5 mr-5 flex justify-between items-center">
                                    <div className=""></div>
                                    <div>
                                        <div
                                            className="inline-block py-1 pl-3 ml-3 text-[#4F46E5] cursor-pointer"
                                            onClick={() => handleDeleteOrder(itemOrder._id)}
                                        >
                                            Cancel
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))}
                    </>
                ) : (
                    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl">You don't have any orders to process yet</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600">You currently have no orders. If you have just placed an order and it is not yet displayed, please Refresh this page</p>
                        
                        </div>
                    </main>
                )}

            </div>
        </div>
    )
}