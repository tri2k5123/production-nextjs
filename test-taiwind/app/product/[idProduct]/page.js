"use client"
import SideDetailProduct from "@/components/layouts/SideDetailProduct";
import SliderProduct from "@/components/layouts/SliderProduct";
import { useEffect, useState } from "react";

export default function ProductPage({ params }) {
    const [ product, setProduct ] = useState();

    useEffect(() => {
        getProduct();
    }, [params.idProduct])
    async function getProduct() {
        try {
            const resGetProduct = await fetch(`http://localhost:3000/api/menu-item/${params.idProduct}`, {
                method: "GET"
            })
            const { product } = await resGetProduct.json();
            setProduct(product);
        } catch (error) {
    
        }
    }
    return (
        <div className="mt-20 mx-4 md:mx-12 mb-6">
            <div className="row">
                {product && (
                    <>
                    
                        <div className="col l-5 l-o-1 md-10 md-o-1 c-12 ">
                            <SliderProduct imageUrls={product.imgs}></SliderProduct>
                        </div>
                        <div className="mt-5 lg:mt-0 col l-5 l-o-1 md-10 md-o-1 c-10 c-o-1">
                            <SideDetailProduct product={product}></SideDetailProduct>
                        </div>
                    </>

                )}
            </div>

        </div>
    )
}