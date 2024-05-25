"use client";
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { addDotToPrice } from './admin/generalData';
import { StateGlobalContext } from '../StateGlobal';



export default function CartPar({ open, setOpen, listCart, setDeletedItemCart }) {
  // const { addedCart, deletedItemCart, setDeletedItemCart } = useContext(StateGlobalContext);
  const { data: session } = useSession();
  const emailSession = session?.user?.email;

  // const [listUserCart, setUserCart] = useState();

  // useEffect(() => {
  //   getUserCart();

  // }, [addedCart, open, deletedItemCart]);
  // async function getUserCart() {
  //   try {
  //     if (emailSession) {
  //       const resGetUserCart = await fetch(`http://localhost:3000/api/cart?email=${emailSession}`, {
  //         method: "GET"
  //       })
  //       const { userCart } = await resGetUserCart.json();
  //       setUserCart(userCart);

  //     }
  //   } catch (error) {

  //   }
  // }

  async function handleDeleteUserCart(i, email) {
    try {
      const resDeleteItemCart = await fetch(`http://localhost:3000/api/cart`, {
        method: "PATCH",
        headers: {
          "content-type": "application.json"
        },
        body: JSON.stringify({ i, email })
      })
      if (resDeleteItemCart.ok) {
        setDeletedItemCart(prev => !prev);
      }
    } catch (error) {
    }
  }
  const subTotal = useMemo(() => {
    return listCart?.reduce((currItem, itemOrder) => {
      return currItem + itemOrder?.subPrice;
    }, 0)
  }, [listCart])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {listCart ? (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {listCart.map((product, i) => (
                                <li key={i} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.img}
                                      alt={product.productName}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          {/* <a href={product.href}>{product.name}</a> */}
                                          <div>{product.productName}</div>
                                        </h3>
                                        <p className="ml-4">{addDotToPrice(product.subPrice)}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">{product.activeColor}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty {product.quantityChosen}</p>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() => handleDeleteUserCart(i, emailSession)}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                              <div className="text-center">
                                <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-700 sm:text-4xl">Your shopping cart is empty</h1>
                                <p className="mt-6 text-base leading-7 text-gray-600">Take a look at our product list and order now.</p>
                                
                              </div>
                            </main>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{listCart ? addDotToPrice(subTotal) : "0"} đ</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <Link
                          href={"/checkout"}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{' '}
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root >
  )
}
