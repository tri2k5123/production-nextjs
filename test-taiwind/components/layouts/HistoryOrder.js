import { CheckIcon } from "@heroicons/react/24/solid";

export default function HistoryOrder() {
    return (
        <div className="mb-10">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-[#111827]">Order History</h1>
                <p className="text-[#6B7280] text-sm">Check the status of recent orders, manage returns, and discover similar products.</p>
            </div>
            <div className="mb-5">
                <div className="border rounded text-sm">
                    <div className="flex items-center justify-between p-6">
                        <div></div>
                        <div className="flex items-center gap-16">
                            <div className="">
                                <h4 className="font-bold text-[#111827]">Date placed</h4>
                                <p className="text-[#6B7280]">June 6, 2021</p>
                            </div>
                            <div className="">
                                <h4 className="font-bold text-[#111827]">Total amount</h4>
                                <p className="text-[#111827]">160.000đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t p-6">
                        <div className="flex">
                            <div>
                                <img src={"/asset/img/allproduct/product/soockaki/sooc_kaki.jpg"} className="w-40 h-40 aspect-square" />
                            </div>
                            <div className="ml-6 w-full flex-1">
                                <div className="flex justify-between items-center ">
                                    <div className="text-[#111827] font-bold">
                                        Micro Backpack
                                    </div>
                                    <div className="text-[#111827] font-bold">
                                        $70.00
                                    </div>
                                </div>
                                <div className="text-[#6B7280] mt-4"><p>Are you a minimalist looking for a compact carry option? </p></div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <CheckIcon className="w-5 h-5 rounded-full p-1 mr-3 bg-[#22c55e] text-white" />
                                <p>Delivered on July 12, 2021</p>
                            </div>
                            <div>
                                <div className="inline-block py-1.5 px-3 text-[#4F46E5] cursor-pointer">View product</div>
                                <div className="inline-block py-1 pl-3 ml-3 border-l text-[#4F46E5] cursor-pointer">Buy Again</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}