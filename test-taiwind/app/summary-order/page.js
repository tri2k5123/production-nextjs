import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default function SummaryOrderPage() {
    return (
        <div className="mt-[72px] mx-12 mb-6">
            <div className="flex">
                <div className="w-1/2">
                    <img className="w-full" src={"/asset/img/allproduct/product/soockaki/sooc_kaki.jpg"} />
                </div>
                <div className="w-1/2 m-10">
                    <div className="mb-6">
                        <p className="text-[#4F46E5] text-sm font-bold">Payment successful</p>
                        <h1 className="text-[#111827] text-5xl font-bold my-3">Thanks for ordering</h1>
                        <p className="text-base text-[#6B7280]">We appreciate your order, we’re currently processing it. So hang tight and we’ll send you confirmation very soon!</p>
                    </div>
                    <div className="border-b py-5">
                        <h2 className="text-2xl text-[#111827]">Order Summary</h2>
                    </div>
                    <div className="border-b py-5 flex text-sm">
                        <Image width={96} height={96} src={"/asset/img/allproduct/product/soockaki/sooc_kaki.jpg"} />
                        <div className="flex flex-1 justify-between">
                            <div className="ml-4">
                                <div className="text-[#111827]">Basic Tee</div>
                                <div className="text-[#6B7280]">Charcoal</div>
                                <div className="text-[#6B7280]">L</div>
                            </div>
                            <div className="text-[#111827]">$36.00</div>
                        </div>
                    </div>
                    <div className="border-b py-5">
                        <div className="flex justify-between">
                            <div className="text-[#6B7280]">Subtotal</div>
                            <div className="text-[#111827]">$72.00</div>
                        </div>
                        <div className="flex  justify-between">
                            <div className="text-[#6B7280]">Shipping</div>
                            <div className="text-[#111827]">$8.00</div>
                        </div>
                        <div className="flex  justify-between">
                            <div className="text-[#6B7280]">Taxes</div>
                            <div className="text-[#111827]">$6.40</div>
                        </div>
                    </div>
                    <div className="py-5">
                        <div className="flex  justify-between">
                            <div className="text-[#111827]">Total</div>
                            <div className="text-[#111827]">$86.40</div>
                        </div>
                    </div>
                    <div className="border-b py-7">
                        <div className="flex justify-between">
                            <div>
                                <h3 className="text-[#111827]">Shipping Address</h3>
                                <p className="text-[#6B7280]">Kristin Watson</p>
                                <p className="text-[#6B7280]">7363 Cynthia Pass</p>
                                <p className="text-[#6B7280]">Toronto, ON N3Y 4H8</p>
                            </div>
                            <div>
                                <h3 className="text-[#111827]">Payment Information</h3>
                                <p className="text-[#6B7280]">COD</p>
                            </div>
                        </div>
                    </div>
                    <Link href={"/"} className="mt-5 block text-[#4F46E5]">Continue Shopping <ArrowRightIcon className="w-4 h-4 inline-block"/></Link>
                </div>
            </div>

        </div>
    )
}