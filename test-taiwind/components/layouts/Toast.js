import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Toast({ setShowToast, title, description }) {
    return (
        <div className="fixed z-[10] top-8 right-8">
                <div className="animate-bounce duration-300 p-4 flex min-w-80 max-w-96 bg-white items-center shadow-xl border rounded transition-opacity">
                    <CheckCircleIcon className="w-6 h-6 text-[#22c55e]"></CheckCircleIcon>
                    <div className="mx-4">
                        <h3 className="text-[#111827] text-base">{title}</h3>
                        <h3 className="text-[#6B7280] text-sm">{description}</h3>
                    </div>
                    <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={() => setShowToast(prev => !prev)}></XMarkIcon>
                </div>
            </div>
    )
}