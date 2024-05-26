"use client";
import { useEffect, useState } from "react";
import ListCategories from "./ListCategory";
import SectionCategory from "./SectionCategory";



export default function AdCategory() {
    const [ listCategories, setListCategories ] = useState();
 
    useEffect(() => {
        getCategories()
    }, [])
    const getCategories = async () => {
        try {
            const resGetCategory = await fetch("/api/category", {
            method: "GET"
        })
        const { listCategories } =  await resGetCategory.json();
        setListCategories(listCategories)
        } catch (error) {
            
        }
    }

    return (
        <>
            <SectionCategory />
            {listCategories && <ListCategories categories={listCategories}/>}
        </>
    )
}