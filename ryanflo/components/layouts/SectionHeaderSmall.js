import { Fragment, useEffect, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TabGroup,
    TabPanel,
    TabPanels,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { Bars3Icon, UserCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import IconCart from '../icons/IconCart'
import Link from 'next/link'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function SectionHeaderSmall({ listCategories }) {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession();
    const [openFormLogin, setOpenFormLogin] = useState(false);
    const [openFormRegister, setOpenFormRegister] = useState(false);
    const [ isChangeBg, setIsChangeBg ] = useState(false);

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
        <div>
            {/* Mobile menu */}
            <Transition show={open}>
                <Dialog className="relative lg:hidden" onClose={setOpen}>
                    <TransitionChild
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div className="fixed inset-0 z-40 flex">
                        <TransitionChild
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button
                                        type="button"
                                        className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                {/* Links */}
                                <TabGroup className="mt-2">
                                    <TabPanels as={Fragment}>
                                        <TabPanel className="space-y-10 px-4 pb-8 pt-10">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    Collections
                                                </p>
                                                <ul
                                                    role="list"
                                                    className="mt-6 flex flex-col space-y-6"
                                                >
                                                    {listCategories.map((item) => (
                                                        <li 
                                                            key={item.category}
                                                            className="flow-root" 
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <Link href={`/collections/${item.category}`} className="-m-2 block p-2 text-gray-500">
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </TabPanel>
                                    </TabPanels>
                                </TabGroup>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>

            <header className={`${isChangeBg ? `bg-white shadow-md` : ` bg-gradient-to-b from-white to-transparent`} fixed transition-all duration-700 z-20 top-0 left-0 right-0`}>
                {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
                    Get free delivery on orders over $100
                </p> */}

                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="flex h-16 items-center">
                            <button
                                type="button"
                                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                                onClick={() => setOpen(true)}
                            >
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>

                            {/* Logo */}
                            <div className="ml-4 flex lg:ml-0">
                                <Link href={"/"}>
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-9 w-auto"
                                        src="/asset/img/logo.PNG"
                                        alt=""
                                    />
                                </Link>
                            </div>
                            <div className="ml-auto flex items-center">
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
                                        <IconCart />
                                    </div>
                                ) : (
                                    <div onClick={() => setOpenFormLogin(true)} className=" cursor-pointer text-sm font-semibold leading-6 text-gray-900">
                                        Log in <span aria-hidden="true">&rarr;</span>
                                    </div>
                                )}
                                {openFormLogin && <LoginForm open={openFormLogin} setOpen={setOpenFormLogin} setRegisOpen={setOpenFormRegister} />}
                                {openFormRegister && <RegisterForm open={openFormRegister} setOpen={setOpenFormRegister} setLoginOpen={setOpenFormLogin} />}

                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}
