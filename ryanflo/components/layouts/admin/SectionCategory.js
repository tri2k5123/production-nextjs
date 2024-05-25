"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SectionCategory() {
    const [ nameCategory, setNameCategory] = useState("");
    const [ slugCategory, setSlugCategory] = useState("");

    const route = useRouter();

    async function handleCreateCategory(e) {
        e.preventDefault();
        try {
            const resCreateCategory = await fetch("./api/category", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ nameCategory, slugCategory })
            })
            if(resCreateCategory.ok) {
                route.refresh()
            }
        } catch (error) {
            
        }
    }

    function resetFormCategory() {
        setNameCategory("");
        setSlugCategory("")
    }

    return (
        <div className="mb-10">
            <label htmlFor="" className="text-sm text-gray-500">New category name</label>
            <form className="flex flex-col gap-3 ">
                <input
                    className="flex-1 border border-slate-500 bg-gray-100 px-4 py-2 text-base rounded-xl"
                    type="text"
                    placeholder="Name Category"
                    onChange={e => setNameCategory(e.target.value)}
                    value={nameCategory}
                />
                <input
                    className="flex-1 border border-slate-500 bg-gray-100 px-4 py-2 text-base rounded-xl"
                    type="text"
                    placeholder="Slug Category"
                    onChange={e => setSlugCategory(e.target.value)}
                    value={slugCategory}
                />
                <div>
                    <button
                        className="bg-green-600 font-bold text-white rounded-full py-3 px-6 w-fit"
                        type="submit"
                        onClick={handleCreateCategory}
                    >
                        Create
                    </button>
                    <button
                        className="bg-white font-bold text-color-text border-2 rounded-full py-3 px-6 w-fit"
                        type="button"
                        onClick={resetFormCategory}
                    >
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    )
}