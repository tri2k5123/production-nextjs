import { memo, useContext, useMemo, useRef, useState } from "react";

import Link from "next/link";
import { products } from "@/components/data";
import { StateGlobalContext } from "@/components/StateGlobal";
import { addDotToPrice } from "./admin/generalData";


function SummaryOrder({ listCart }) {
    // const { listCart, setListCart } = useContext(StateGlobalContext);

    const shippingFee = useRef(30000);
    const promotion = useRef(0);

    const subTotal = useMemo(() => {
        return listCart.reduce((currItem, itemOrder) => {
            return currItem + itemOrder.subPrice;
        }, 0)
    }, [listCart])

    const total = useMemo(() => {
        return subTotal + shippingFee.current - promotion.current;
    }, [listCart])

    return (
        <div className="py-4 px-3 shadow-md shadow-[#9d959595]">
            <div className="text-lg text-[#212121] mb-3 relative font-medium">
                Order Summary
            </div>
            <div className="pb-4 border-b border-solid border-b-[#eff0f5] mb-6">
                <div className="flex mb-4">
                    <div className="text-sm text-[#757575] tracking-normal flex-1">Subtotal</div>
                    <div className="text-base text-right text-[#202020] tracking-tight align-middle">{`${addDotToPrice(subTotal)} đ`}</div>
                </div>
                <div className="flex mb-4">
                    <div className="text-sm text-[#757575] tracking-normal flex-1">Shipping Fee</div>
                    <div className="text-base text-right text-[#202020] tracking-tight align-middle">{`${addDotToPrice(shippingFee.current)} đ`}</div>
                </div>
                <div className="flex mb-4">
                    <div className="text-sm text-[#757575] tracking-normal flex-1">Promotion</div>
                    <div className="text-base text-right text-[#202020] tracking-tight align-middle">{`${addDotToPrice(promotion.current)} đ`}</div>
                </div>
            </div>
            <div className="">
                <div className="flex mb-4">
                    <div className="text-sm text-[#757575] tracking-normal flex-1">
                        Total
                    </div>
                    <div className="text-base text-right text-[#202020] tracking-tight align-middle">
                        <div className="text-lg text-[#f57224]">{`${addDotToPrice(total)} đ`}</div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default memo(SummaryOrder)