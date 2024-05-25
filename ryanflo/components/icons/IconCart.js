"use client";
import { memo, useContext, useEffect, useState } from "react";
import { StateGlobalContext } from "@/components/StateGlobal"
import CartPar from "@/components/layouts/CartPar";
import { useSession } from "next-auth/react";


function IconCart() {
    const [open, setOpen] = useState(false);

    const { addedCart, deletedItemCart, setDeletedItemCart } = useContext(StateGlobalContext);

    const [ userCart, setUserCart ] = useState();
    const { data: session } = useSession();
    

    useEffect(() => {
        getUserCart()
    }, [ addedCart, open, deletedItemCart ])
    async function getUserCart() {
        try {
            const resGetUserCart = await fetch(`./api/cart?email=${session?.user?.email}`, {
                method: "GET",
            })
            const { userCart } = await resGetUserCart.json();
            
            setUserCart(userCart)
        } catch (error) {
            
        }
    }

    return (
        <>
            {userCart ? (
                <>
                    <div onClick={e => setOpen(prev => !prev)} className="block p-2 text-xl relative cursor-pointer">
                        <i className="fa-solid fa-cart-shopping"></i>
                        <div className="absolute top-0 right-0 bg-[#1247F2] text-white px-1.5 text-sm rounded-full">{userCart.cartInfo.length}</div>
                    </div>
                    <CartPar open={open} setOpen={setOpen} listCart={userCart.cartInfo} setDeletedItemCart={setDeletedItemCart}/>
                </>
            ) : (
                <>
                    <div onClick={e => setOpen(prev => !prev)} className="block p-2 text-xl relative cursor-pointer">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <CartPar open={open} setOpen={setOpen}/>
                </>
            )
            }
        </>
    )
}
export default memo(IconCart)