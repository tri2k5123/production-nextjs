
import { useEffect, useState } from 'react'
import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Transition,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import IconCart from '../icons/IconCart'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SectionHeaderLarge({ listCategories }) {
    const [ isChangeBg, setIsChangeBg ] = useState(false);
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormRegister, setOpenFormRegister] = useState(false);
    
    const { data: session } = useSession();

    useEffect(() => {
        const handleScroll = () => {
            setIsChangeBg(window.scrollY > 0);

        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return (
        <header className={`${isChangeBg ? `bg-white  shadow-md` : ` bg-gradient-to-b from-white to-transparent`} fixed transition-all duration-700 z-20 top-0 left-0 right-0`}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href={"/"} className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-11 w-auto" src="/asset/img/logo.PNG" alt="" />
                    </Link>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                            Product
                            <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                        </PopoverButton>
                        <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-56 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-3">
                                    {listCategories.map((item) => (
                                        <div
                                            key={item.category}
                                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                        > 
                                            <div className="flex-auto">
                                                <Link href={`/collections/${item.category}`} className="block font-semibold text-gray-900">
                                                    {item.name}
                                                    <span className="absolute inset-0" />
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </PopoverPanel>
                        </Transition>
                    </Popover>
                    <Link href="#about" className="text-sm font-semibold leading-6 text-gray-900">
                        About
                    </Link>
                    <Link href="#introduce" className="text-sm font-semibold leading-6 text-gray-900">
                        Introduce
                    </Link>
                    <Link href="#contact" className="text-sm font-semibold leading-6 text-gray-900">
                        Contact
                    </Link>
                </PopoverGroup>
                <div className="cursor-pointer hidden lg:flex lg:flex-1 lg:justify-end">
                    {session ? (
                        <div className="ml-4  lg:ml-6 flex items-center">
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <MenuButton className="relative flex rounded-full text-sm">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <UserCircleIcon className="w-6 h-6 cursor-pointer mr-4"></UserCircleIcon>
                                    </MenuButton>
                                </div>
                                <Transition
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        {session?.user?.role == "admin" ? (
                                            <MenuItem>
                                                {({ focus }) => (
                                                    <Link
                                                        href={"/admin/profile-admin"}
                                                        className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </Link>
                                                )}
                                            </MenuItem>
                                        ) : (
                                            <>
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <Link
                                                            href={"/profile-user"}
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </Link>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ focus }) => (
                                                        <Link
                                                            href={"/detail-history-order"}
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Detail Order
                                                        </Link>
                                                    )}
                                                </MenuItem>
                                            </>
                                        )}
                                        <MenuItem>
                                            {({ focus }) => (
                                                <div
                                                    onClick={() => signOut()}
                                                    className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                >
                                                    Sign out
                                                </div>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                            <IconCart/>
                        </div>

                    ) : (
                        <div onClick={() => setOpenFormLogin(true)} className="text-sm font-semibold leading-6 text-gray-900">
                            Log in <span aria-hidden="true">&rarr;</span>
                        </div>
                    )}
                </div>
                {openFormLogin && <LoginForm open={openFormLogin} setOpen={setOpenFormLogin} setRegisOpen={setOpenFormRegister} />}
                {openFormRegister && <RegisterForm open={openFormRegister} setOpen={setOpenFormRegister} setLoginOpen={setOpenFormLogin} />}
            </nav>
        </header>
    )
}
