"use client"
import { addDotToPrice, sizes } from "@/components/layouts/admin/generalData";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function SummaryOrderPage({ params }) {
    const [ order, setOrder ] = useState();

    const feeShipping = useRef(25000);
    useEffect(() => {
        getSummaryOrder();
    }, [params.idSummaryOrder])
    async function getSummaryOrder() {
        try {
            const resGetSummaryOrder = await fetch(`/api/order/${params.idSummaryOrder}`, {
                method: "GET",
            })
            const { order } = await resGetSummaryOrder.json()
            setOrder(order);
        } catch (error) {
            
        }
    }
    return (
        <div className="mt-24 mx-9 mb-6">
            <div className="flex">
                <div className="hidden lg:block lg:w-1/2">
                    <img className="w-full" src={"/asset/img/allproduct/product/soockaki/sooc_kaki.jpg"} />
                </div>
                {order && (
                    <div className="w-full lg:w-1/2 lg:m-10">
                        <div className="mb-6">
                            <p className="text-[#4F46E5] text-sm font-bold">Payment successful</p>
                            <h1 className="text-[#111827] text-5xl font-bold my-3">Thanks for ordering</h1>
                            <p className="text-base text-[#6B7280]">We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
                        </div>
                        <div className="border-b py-5">
                            <h2 className="text-2xl text-[#111827]">Order Summary</h2>
                        </div>
                        {order.orderInfo.map((itemOrder, i) => (
                            <div key={i} className="border-b py-5 flex text-sm">
                                <img className="w-24 h-24" src={itemOrder.img} alt={itemOrder.productName}/>
                                <div className="flex flex-1 justify-between">
                                    <div className="ml-4">
                                        <div className="text-[#111827]">{itemOrder.productName}</div>
                                        <div className="text-[#6B7280]">{itemOrder.activeColor}</div>
                                        <div className="text-[#6B7280]">{sizes[itemOrder.activeSize]}</div>
                                    </div>
                                    <div className="text-[#111827]">{addDotToPrice(itemOrder.subPrice)}đ</div>
                                </div>
                            </div>
                        ))}
                        
                        <div className="border-b py-5">
                            <div className="flex justify-between">
                                <div className="text-[#6B7280]">Subtotal</div>
                                <div className="text-[#111827]">{addDotToPrice(order?.total)}đ</div>
                            </div>
                            <div className="flex  justify-between">
                                <div className="text-[#6B7280]">Shipping</div>
                                <div className="text-[#111827]">{addDotToPrice(feeShipping.current)}đ</div>
                            </div>
                        </div>
                        <div className="py-5">
                            <div className="flex  justify-between">
                                <div className="text-[#111827]">Total</div>
                                <div className="text-[#111827]">{addDotToPrice(order?.total + feeShipping.current)}đ</div>
                            </div>
                        </div>
                        <div className="border-b py-7">
                            <div className="flex justify-between">
                                <div>
                                    <h3 className="text-[#111827]">Shipping Address</h3>
                                    <p className="text-[#6B7280]">{order?.address}</p>
                                </div>
                                <div>
                                    <h3 className="text-[#111827]">Payment Information</h3>
                                    <p className="text-[#6B7280]">COD</p>
                                </div>
                            </div>
                        </div>
                        <Link href={"/collections/all"} className="mt-5 block text-[#4F46E5]">Continue Shopping <ArrowRightIcon className="w-4 h-4 inline-block"/></Link>
                    </div>

                )}
            </div>

        </div>
    )
}