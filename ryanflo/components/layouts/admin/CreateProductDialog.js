"use client";
import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { sizes, divideIntoArray, figureOutInitialPrice } from './generalData';
import Toast from '../Toast';



export default function CreateProductDialog({ open, setOpen, setIsUpdated }) {
    const cancelButtonRef = useRef(null);

    const [listCategory, setListCategory] = useState([]);

    const [productName, setProductName] = useState("");
    const [colors, setColors] = useState("");
    const [checkedSizes, setCheckedSizes] = useState([])
    const [price, setPrice] = useState(0);
    const [percentPrice, setPercentPrice] = useState(0);
    const [imgs, setImgs] = useState("");
    const [category, setCategory] = useState("");
    const [remaining, setRemaining] = useState(0);

    const [showToast, setShowToast] = useState(false);

    const initialPrice = figureOutInitialPrice(price, percentPrice);

    async function getCategory() {
        try {
            const resGetCategory = await fetch("api/category", {
                method: 'GET'
            })
            const { listCategories } = await resGetCategory.json();
            setListCategory(listCategories)
        } catch (error) {

        }
    }
    useEffect(() => {
        getCategory()
    }, [])

    function handleCheckSize(i) {
        setCheckedSizes(prev => {
            if (checkedSizes.includes(i)) {
                return checkedSizes.filter(item => item !== i)
            }
            return [...prev, i]
        })
    }

    useEffect(() => {
        const toastInterval = setTimeout(() => {
            setShowToast(false)
        }, 3000)
        return () => {
            clearTimeout(toastInterval)
        }
    }, [showToast]);

    async function handleCreateProduct(e) {
        const listColor = divideIntoArray(colors);
        const listImg = divideIntoArray(imgs);
        try {
            const resCreateProduct = await fetch("api/menu-item", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ productName, listColor, checkedSizes, price, percentPrice, initialPrice, listImg, category, remaining })
            })
            if (resCreateProduct.ok) {
                setIsUpdated(prev => !prev);
                setShowToast(true)

            }
        } catch (error) {

        }

    }

    return (
        <Transition.Root show={open} as={Fragment}>
            {showToast && <Toast setShowToast={setShowToast} title={`Successfully Created!`} description={`The product has been created.`}/>}
            <Dialog className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="">
                                        {/* start */}
                                        <form>
                                            <div className="space-y-12">
                                                <div className="border-b border-gray-900/10 pb-12">
                                                    <h2 className="text-3xl font-semibold leading-7 text-gray-900">Create new product</h2>

                                                    <div className="mt-10">
                                                        <div className="mb-5">
                                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Name Product
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="  flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                        onChange={e => setProductName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="colors" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Colors Product (các chỉ số cách nhau bởi dấu ",")
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                    <input
                                                                        type="text"
                                                                        name="colors"
                                                                        id="colors"
                                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                        onChange={e => setColors(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="sizes" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Sizes Product
                                                            </label>
                                                            <div className="mt-2">
                                                                {sizes.map((size, i) => (
                                                                    <div key={i}>
                                                                        <input
                                                                            type='checkbox'
                                                                            checked={checkedSizes.includes(i)}
                                                                            onChange={() => handleCheckSize(i)}
                                                                            className='mr-4'
                                                                        />
                                                                        {size}
                                                                    </div>
                                                                ))}
                                                            </div>

                                                        </div>
                                                        <div className='flex gap-3 mb-5'>
                                                            <div className="">
                                                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Price (VNĐ)
                                                                </label>
                                                                <div className="mt-2">
                                                                    <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                        <input
                                                                            type="text"
                                                                            name="price"
                                                                            id="price"
                                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                            onChange={e => setPrice(e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1">
                                                                <label htmlFor="promoPercent" className="block text-sm font-medium leading-6 text-gray-900">
                                                                    Promo percent (%)
                                                                </label>
                                                                <div className="mt-2">
                                                                    <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                        <input
                                                                            type="text"
                                                                            name="promoPercent"
                                                                            id="promoPercent"
                                                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                            onChange={e => setPercentPrice(e.target.value)}
                                                                            value={percentPrice}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="listImg" className="block text-sm font-medium leading-6 text-gray-900">
                                                                List imgs  (các chỉ số cách nhau bởi dấu ",")
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                    <input
                                                                        type="text"
                                                                        name="listImg"
                                                                        id="listImg"
                                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                        onChange={e => setImgs(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="nameCategory" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Name category
                                                            </label>
                                                            <div className="mt-2">
                                                                {listCategory.map(item => (
                                                                    <div key={item._id}>
                                                                        <input
                                                                            type='radio'
                                                                            checked={item.category == category}
                                                                            onChange={() => setCategory(`${item.category}`)}
                                                                            className='mr-4'
                                                                        />
                                                                        {item.name}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <div className="mb-5">
                                                            <label htmlFor="remain" className="block text-sm font-medium leading-6 text-gray-900">
                                                                Remaining
                                                            </label>
                                                            <div className="mt-2">
                                                                <div className="px-4 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                                    <input
                                                                        type="text"
                                                                        name="remain"
                                                                        id="remain"
                                                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                                        onChange={e => setRemaining(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-[#16A34A] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#178c42] sm:ml-3 sm:w-auto"
                                                    onClick={handleCreateProduct}
                                                >
                                                    Create
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={() => setOpen(false)}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                        {/* end */}
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

