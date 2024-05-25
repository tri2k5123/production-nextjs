import Link from "next/link";

export default function SectionAdmin({ children }) {
    return (
        <div className="gridIn wide shadow-md mt-16">
            <ul className="flex justify-center items-center mb-5">
                <Link
                    href={"https://ryanflo.vercel.app/admin/profile-admin"} 
                    className="py-4 px-6 rounded shadow-sm text-base text-color-text bg-white"
                >
                    Profile
                </Link>
                <Link
                    href={"https://ryanflo.vercel.app/admin/categories"} 
                    className="py-4 px-6 rounded shadow-sm text-base text-color-text bg-white"
                >
                    Categories
                </Link>
                <Link
                    href={"https://ryanflo.vercel.app/admin/menu-items"} 
                    className="py-4 px-6 rounded shadow-sm text-base text-color-text bg-white"
                >
                    Menu items
                </Link>
                <Link
                    href={"https://ryanflo.vercel.app/admin/users"} 
                    className="py-4 px-6 rounded shadow-sm text-base text-color-text bg-white"
                >
                    Users
                </Link>
                <Link
                    href={"https://ryanflo.vercel.app/admin/orders"} 
                    className="py-4 px-6 rounded shadow-sm text-base text-color-text bg-white"
                >
                    Orders
                </Link>
                <Link
                    href={"https://ryanflo.vercel.app/admin/history-orders"} 
                    className="py-4 px-6 rounded shadow-sm text-base text-color-text bg-white"
                >
                    History Orders
                </Link>
            </ul>
            <div className="p-6">
                {children}

            </div>
        </div>
    )
}