"use client"
import { useState, createContext } from 'react';

const StateGlobalContext = createContext();

function StateGlobalProvider({ children}) {
    let [ listCart, setListCart ] = useState([
        {
            currentImg: "/asset/img/allproduct/product/soockaki/sooc_kaki.jpg",
            size: "S",
            color: "red",
            quantity: 3,
            price: "650,000",
            name: "LITHE BOXY HOODIE"
        },
        {
            currentImg: "/asset/img/allproduct/product/soockaki/sooc_kaki.jpg",
            size: "S",
            color: "red",
            quantity: 3,
            price: "650,000",
            name: "LITHE BOXY HOODIE"
        },
        {
            currentImg: "/asset/img/allproduct/product/soockaki/sooc_kaki.jpg",
            size: "S",
            color: "red",
            quantity: 3,
            price: "650,000",
            name: "LITHE BOXY HOODIE"
        },
        {
            currentImg: "/asset/img/allproduct/product/soockaki/sooc_kaki.jpg",
            size: "S",
            color: "red",
            quantity: 3,
            price: "650,000",
            name: "LITHE BOXY HOODIE"
        },
        {
            currentImg: "/asset/img/allproduct/product/soockaki/sooc_kaki.jpg",
            size: "S",
            color: "red",
            quantity: 3,
            price: "650,000",
            name: "LITHE BOXY HOODIE"
        },
        {
            currentImg: "/asset/img/allproduct/product/soockaki/sooc_kaki.jpg",
            size: "S",
            color: "red",
            quantity: 3,
            price: "650,000",
            name: "LITHE BOXY HOODIE"
        }
    ])
    const [ addedCart, setAddedCart ] = useState(false)
    const [ deletedItemCart, setDeletedItemCart ] = useState(false);

    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormRegister, setOpenFormRegister] = useState(false);

    const value = {
        listCart,
        setListCart,
        addedCart,
        setAddedCart,
        deletedItemCart,
        setDeletedItemCart,
        openFormLogin,
        setOpenFormLogin,
        openFormRegister,
        setOpenFormRegister
    }
    
    return (
        <StateGlobalContext.Provider value={value}>
            {children}
        </StateGlobalContext.Provider>
    )
}

export { StateGlobalContext, StateGlobalProvider }