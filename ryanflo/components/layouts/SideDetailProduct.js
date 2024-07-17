"use client";
import { memo, useContext, useEffect, useState } from "react";
import { StateGlobalContext } from "@/components/StateGlobal"
import Link from "next/link";
import Toast from "@/components/layouts/Toast";
import { addDotToPrice, sizes } from "./admin/generalData";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function SideDetailProduct({ product }) {
    const { setAddedCart, openFormLogin, setOpenFormLogin,
        openFormRegister, setOpenFormRegister } = useContext(StateGlobalContext);
    
    const { data: session } = useSession();

    const { _id, productName, colors, sizes: listSize, basePrice, imgs, category, initialPrice, percentPrice, remaining } = product;

    const [showToast, setShowToast] = useState(false);

    const [activeSize, setActiveSize] = useState(0);
    const [activeColor, setActiveColor] = useState(colors[0]);
    const [quantityChosen, setQuantityChosen] = useState(1);

    function handleMinusQuantity() {
        setQuantityChosen(prev => {
            if (prev == 1) return 1;
            return prev - 1
        })
    }
    function handlePlusQuantity() {
        setQuantityChosen(prev => {
            if (prev == remaining) return remaining;
            return prev + 1
        })
    }
    useEffect(() => {
        const toastInterval = setTimeout(() => {
            setShowToast(false)
        }, 3000)
        return () => {
            clearTimeout(toastInterval)
        }
    }, [showToast])
    async function handleAddCart() {
        if (session) {
            const subPrice = quantityChosen * basePrice;
            const currentData = {
                email: session?.user?.email,
                cartInfos: [
                    {
                        id: _id,
                        img: imgs[0],
                        productName,
                        activeSize,
                        activeColor,
                        quantityChosen,
                        subPrice
                    }
                ]
            }
            try {
                const resPostCart = await fetch("/api/cart", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(currentData)
                })
                if (resPostCart.ok) {
                    setAddedCart(prev => !prev);
                    setShowToast(true)

                }
            } catch (error) {

            }
            
        } else {
            setOpenFormRegister(true);
            
        }
    }
    return (
        <>
            <div className="text-3xl">{productName}</div>
            {percentPrice ? (
                <div className="my-6 mx-0 flex items-center text-color-price text-xs">
                    <div className="text-white bg-[#BE1E2D] p-1.5">{`-${percentPrice}%`}</div>
                    <div className="text-3xl my-0 mx-3">{`${addDotToPrice(basePrice)}đ`}</div>
                    <div className="text-[#939393] pt-2 text-sm relative cancel-price detail">{`${addDotToPrice(Math.floor(initialPrice))}đ`}</div>
                </div>
            ) : (
                <div className="my-6 mx-0 flex items-center text-color-price text-xs">
                    <div className="text-3xl my-0 mx-3">{`${addDotToPrice(basePrice)}đ`}</div>
                </div>
            )}
            <div className="mb-7 text-[#0e1c22] opacity-60">
                <span className="">Stock: </span>
                <span className="">{remaining}</span>
            </div>
            <div className={` ${listSize.length != 0 ? "h-36" : "h-32"}`}>
                {listSize.length != 0  && (
                    <div className="p-0 w-full float-left border-0 mb-7">
                        <h4 className="ega-swatch__heading">Size</h4>
                        <div className="inline-block">
                            <div className="inline-block">
                                {listSize.map((size, i) => (
                                    <div
                                        key={i}
                                        className={`ega-swatch__element cursor-pointer ${activeSize == i ? "active" : ""}`}
                                        onClick={() => { setActiveSize(i) }}
                                    >
                                        {sizes[size]}
                                    </div>
                                ))}
                            </div>
                            {/* <div className="size-chosen__wrapper">
                                Hướng dẫn chọn size 
                            </div> */}
                        </div>
                    </div>

                )}
                <div className="p-0 w-full float-left border-0 mb-7">
                    <h4 className="ega-swatch__heading">Color</h4>
                    <div className="inline-block">
                        <div className="inline-block">
                            {colors.map((color, i) => (
                                <div
                                    key={i}
                                    className={`ega-swatch__element cursor-pointer ${activeColor == colors[i] ? "active" : ""}`}
                                    onClick={() => setActiveColor(color)}
                                >
                                    {color}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
                <div className="mb-4">
                    <h4 className="inline-block w-20 mr-8 text-sm text-[#0E1C22] opacity-60 font-normal">Quantity</h4>
                    <div className="w-auto text-2xl align-top relative inline-block">
                        <input
                            type="button"
                            className="cursor-pointer relative inline-block w-10 h-8 border border-solid border-[#0e1c224d] bg-none text-2xl text-[#0E1C22] float-left p-0"
                            value="-"
                            onClick={handleMinusQuantity}
                        />
                        <div className="w-[60px] h-8 border-0 float-left p-0 text-center text-xl">{quantityChosen}</div>
                        <input
                            type="button"
                            className="cursor-pointer relative inline-block w-10 h-8 border border-solid border-[#0e1c224d] bg-none text-2xl text-[#0E1C22] float-left p-0"
                            value="+"
                            onClick={handlePlusQuantity}
                        />
                    </div>
                </div>
                {remaining > 0 ? (
                    <>
                        <div className="inline-block bg-white text-[#0E1C22] py-1.5 px-0 text-base border border-solid border-[#0E1C22] w-full m-0 text-center h-8 cursor-pointer" onClick={handleAddCart}>Add To Cart</div>
                        <div className="flex mb-10 mt-1 flex-wrap col-span-full cursor-pointer">
                            <Link href={"/checkout"} className="buy-now btn mt-2">Buy Now</Link>
                        </div>
                    </>
                ) : (
                    <div className="inline-block bg-white text-[#0E1C22] py-1.5 px-0 text-base border border-solid border-[#0E1C22] w-full m-0 text-center h-8 cursor-default">Sold out</div>
                )}
                {showToast && <Toast setShowToast={setShowToast} title={`Successfully saved!`} description={`The product has been added to cart.`}/>}
                {openFormLogin && <LoginForm open={openFormLogin} setOpen={setOpenFormLogin} setRegisOpen={setOpenFormRegister} />}
                {openFormRegister && <RegisterForm open={openFormRegister} setOpen={setOpenFormRegister} setLoginOpen={setOpenFormLogin} />}
            </div>
        </>
    )
}
export default memo(SideDetailProduct)