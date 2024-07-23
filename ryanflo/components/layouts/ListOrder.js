"use client"
import { memo, useContext, useEffect, useState } from "react";
import { StateGlobalContext } from "@/components/StateGlobal";

import SummaryOrder from "@/components/layouts/SummaryOrder";
import { useSession } from "next-auth/react";
import { addDotToPrice, sizes } from "./admin/generalData";
import Link from "next/link";

function ListOrder() {
    const { addedCart, deletedItemCart } = useContext(StateGlobalContext);

    const { data: session } = useSession();
    const [userCart, setUserCart] = useState();

    useEffect(() => {
        getUserCart()
    }, [addedCart, deletedItemCart])
    async function getUserCart() {
        try {
            const resGetUserCart = await fetch(`/api/cart?email=${session?.user?.email}`, {
                method: "GET",
            })
            const { userCart } = await resGetUserCart.json();

            setUserCart(userCart)
        } catch (error) {

        }
    }

    return (
        <>
            <div className="px-1 lg:px-3 pb-4">
                <div className="mx-0 mt-8 mb-4 text-3xl font-bold">
                    Summary Order
                </div>
                <div className="payment-method">
                    {userCart ? userCart?.cartInfo.map((itemCart, index) => (
                        <div key={index} className="mb-3 relative shadow-md shadow-[#9d9595] w-full py-4 px-0 text-xs font-normal text-left">
                            <div className="flex items-center">
                                <div className="flex flex-1">
                                    <div className="w-20 h-20 mx-3">
                                        <img className="w-full h-full" src={itemCart.img} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="block w-full over-hidden text-ellipsis pl-0 text-sm text-[#212121] ">{itemCart.productName}</h4>
                                        <p className="block mt-2 text-xs text-[#757575]">Size: {sizes[itemCart.activeSize]}</p>
                                        <p className="block mt-2 text-xs text-[#757575]">Color: {itemCart.activeColor}</p>
                                        <p className="block mt-2 text-xs text-[#757575]">Quantity: {itemCart.quantityChosen}</p>
                                    </div>
                                    <div className="text-lg text-[#f57224] font-medium mb-1 w-32">{`${addDotToPrice(itemCart.subPrice)} đ`}</div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                            <div className="text-center">
                                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl">Your shopping cart is empty</h1>
                                <p className="mt-6 text-base leading-7 text-gray-600">Take a look at our product list and order now.</p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link
                                        href={"/collections/all"}
                                        className="rounded-md bg-[#16B8FF] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#229dd2] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#229dd2]"
                                    >
                                        Go to product list
                                    </Link>
                                </div>
                            </div>
                        </main>
                    )}
                </div>
            </div>
            {userCart && <SummaryOrder listCart={userCart?.cartInfo} />}
        </>
    )
}
export default memo(ListOrder)