"use client"

import { useEffect, useState } from "react";
import SectionHeaderLarge from "./SectionHeaderLarge";
import SectionHeaderSmall from "./SectionHeaderSmall";

export default function Header() {
    const [ listCategories, setListCategories ] = useState([]);

    useEffect(() => {
        getCategories()
    }, [])
    async function getCategories() {
        try {
            const resGetCategory = await fetch("/api/category", {
                method: "GET",
            })
            const {listCategories} = await resGetCategory.json();
            setListCategories(listCategories)
        } catch (error) {
            
        }

    }
    return (
        <>
            <div className="block lg:hidden">
                <SectionHeaderSmall listCategories={listCategories}/>
            </div>
            <div className="hidden lg:block">
                <SectionHeaderLarge listCategories={listCategories}/>
            </div>
        </>
    )
}