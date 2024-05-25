"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ListCategories({ categories }) {
    const [editing, setEditing] = useState(false);
    const [nameUpdate, setNameUpdate] = useState("");
    const [slugUpdate, setSlugUpdate] = useState("");
    const [idUpdate, setIdUpdate] = useState("");

    const route = useRouter();

    async function handleUpdateCategory(e) {
        e.preventDefault();
        try {
            const resUpdateCategory = await fetch("./api/category", {
                method: "PUT",
                header: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ idUpdate, nameUpdate, slugUpdate })
            })
            if (resUpdateCategory.ok) {
                setEditing(false);
                route.refresh();
            }
        } catch (error) {

        }
    }

    function getFormEdit(id, name, category) {
        setIdUpdate(id);
        setNameUpdate(name);
        setSlugUpdate(category);
        setEditing(true);

    }

    async function handleDeleteCategory(id) {
        try {
            const resDeleteCategory = await fetch(`./api/category?id=${id}`, {
                method: "DELETE",
            })
            if(resDeleteCategory.ok) {
                route.refresh();
            }
        } catch (error) {
            
        }
    }

    return (
        <>
            {editing && (
                <div className="mb-10">
                    <label htmlFor="" className="text-sm text-gray-500">Form update</label>
                    <form className="flex flex-col gap-3 ">
                        <input
                            className="flex-1 border border-slate-500 bg-gray-100 px-4 py-2 text-base rounded-xl"
                            type="text"
                            placeholder="Name Category"
                            onChange={e => setNameUpdate(e.target.value)}
                            value={nameUpdate}
                        />
                        <input
                            className="flex-1 border border-slate-500 bg-gray-100 px-4 py-2 text-base rounded-xl"
                            type="text"
                            placeholder="Slug Category"
                            onChange={e => setSlugUpdate(e.target.value)}
                            value={slugUpdate}
                        />
                        <div>
                            <button
                                className="bg-green-600 font-bold text-white rounded-full py-3 px-6 w-fit"
                                type="submit"
                                onClick={handleUpdateCategory}
                            >
                                Update
                            </button>
                            <button
                                className="bg-white font-bold text-color-text border-2 rounded-full py-3 px-6 w-fit"
                                type="button"
                                onClick={() => setEditing(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
            <div className="">
                <label htmlFor="" className="text-sm text-gray-500">Existing categories</label>
                <div className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                    <div className="grow">Name</div>
                    <div className="grow">Slug</div>
                    <div className="flex-1 gap-1">
                        <span className="text-[#f3f4f6]">hello mý cưng </span>
                    </div>
                </div>
                {categories.map((itemCategory, i) => (
                    <div key={i} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
                        <div className="grow">{itemCategory.name}</div>
                        <div className="grow">{itemCategory.category}</div>
                        <div className="flex gap-1">
                            <button
                                className="bg-white font-bold text-color-text border-2 rounded-xl py-3 px-6 w-fit"
                                onClick={() => getFormEdit(itemCategory._id, itemCategory.name, itemCategory.category)}
                            >
                                Edit
                            </button>
                            <button
                                className="bg-white font-bold text-color-text border-2 rounded-xl py-3 px-6 w-fit"
                                onClick={() => handleDeleteCategory(itemCategory._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                ))}
            </div>
        </>
    )
}