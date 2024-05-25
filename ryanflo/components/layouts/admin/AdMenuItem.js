"use client";

import { useEffect, useState } from "react";
import CreateProductDialog from "./CreateProductDialog";
import AdjustProductDialog from "./AdjustProductDialog";
import { addDotToPrice } from "./generalData";


export default function AdMenuItem() {
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showAdjustDialog, setShowAdjustDialog] = useState(false);
    const [ isUpdated, setIsUpdated ] = useState(false);

    const [ dataAdjust, setDataAdjust ] = useState({});
    
    const [listProduct, setListProduct] = useState([]);
    useEffect(() => {
        getProduct();

    }, [isUpdated])
    async function getProduct() {
        try {
            const resGetProduct = await fetch("api/menu-item", {
                method: "GET",
            })
            const { listProduct } = await resGetProduct.json();
            setListProduct(listProduct)
        } catch (error) {

        }
    }

    function handleShowAdjustDialog(product) {
        setDataAdjust(product)
        setShowAdjustDialog(true)
    }

    return (
        <>
            <button
                onClick={() => setShowCreateDialog(true)}
                className="bg-white font-bold text-color-text cursor-pointer border-2 rounded-xl py-2 px-6 w-full text-center"
            >
                Create new menu item
                <i className="fa-solid fa-arrow-right border-2 border-color-text rounded-full ml-3 p-1"></i>
            </button>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-5">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Edit products:</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {listProduct.map((product) => (
                            <div key={product._id} className="group relative cursor-pointer" onClick={() => handleShowAdjustDialog(product)}>
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                                    <img
                                        src={product.imgs[0]}
                                        alt={product.productName}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-700">
                                            <div>
                                                <span aria-hidden="true" className="absolute inset-0" />
                                                {product.productName}
                                            </div>
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.remaining}</p>
                                    </div>
                                    <p className="text-sm font-medium text-gray-900">{addDotToPrice(product.basePrice)}đ</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showCreateDialog && <CreateProductDialog open={showCreateDialog} setOpen={setShowCreateDialog} setIsUpdated={setIsUpdated}/>}
            {showAdjustDialog && <AdjustProductDialog open={showAdjustDialog} setOpen={setShowAdjustDialog} data={dataAdjust} setIsUpdated={setIsUpdated}/>}
        </>
    )
}