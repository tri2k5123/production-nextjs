"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import SearchPar from "@/components/icons/SearchPar";
import ListProduct from "@/components/layouts/ListProduct";
import Link from "next/link";

export default function CollectionPage({ params }) {
    const [inputSearch, setInputSearch] = useState("");
    const [products, setProducts] = useState([]);
    const listProduct = useRef([]);
    
    useEffect(() => {
        getProduct();

    }, [])
    async function getProduct() {
        try {
            const resGetProduct = await fetch("/api/menu-item", {
                method: "GET"
            })
            const { listProduct } = await resGetProduct.json();
            setProducts(listProduct)
        } catch (error) {

        }
    }

    if (params.collection[0] == "all") {
        listProduct.current = products;

    } else {
        listProduct.current = products.filter(product => {
            return params.collection[0] == product.category;
        })

    }

    const resultSearch = useMemo(() => {
        return products.filter((product) => {
            return product.productName.toLowerCase().includes(inputSearch)
        })
    }, [inputSearch]);
    return (
        <div className="lg:mt-28 mt-24 mx-1 sm:mx-9 mb-6">
            <div className="row">
                {params.collection.length == 1 && (
                    <>
                        <div className="col l-3 l-o-9 md-4 md-o-8 c-8 c-o-4">
                            <SearchPar inputSearch={inputSearch} setInputSearch={setInputSearch} />
                        </div>
                        {inputSearch ? resultSearch.map((product, index) => (
                            <div key={index} className="col l-2-4 md-4 c-6">
                                <ListProduct params={params} product={product} />
                            </div>
                        )) : listProduct.current.map((product, index) => (
                            <div key={index} className="col l-2-4 md-4 c-6">
                                <ListProduct params={params} product={product} />
                            </div>
                        ))
                        }
                        {listProduct.current.length == 0 && (
                            <main className="col l-12 md-12 c-12 grid min-h-full place-items-center bg-white px-6 py-16 sm:py-16 lg:px-8">
                                <div className="text-center">
                                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">There are no products for this category</h1>
                                <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the products you’re looking for.</p>
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link
                                        href={"/"}
                                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                    Go back home
                                    </Link>
                                    <Link href="/collections/all" className="text-sm font-semibold text-gray-900">
                                    Continue shopping <span aria-hidden="true">&rarr;</span>
                                    </Link>
                                </div>
                                </div>
                            </main>
                        )}
                    </>
                )}
            </div>

        </div>
    )
}

