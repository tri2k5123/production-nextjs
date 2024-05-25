"use client"
import { useState, createContext } from 'react';

const StateGlobalContext = createContext();

function StateGlobalProvider({ children}) {
    
    const [ addedCart, setAddedCart ] = useState(false)
    const [ deletedItemCart, setDeletedItemCart ] = useState(false);

    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormRegister, setOpenFormRegister] = useState(false);

    const value = {
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