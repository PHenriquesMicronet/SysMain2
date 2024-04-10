'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { FaUser } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { IoSettings } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import axios from 'axios';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem,
    Button,
} from "@nextui-org/react";
import { LuLogOut } from "react-icons/lu";

const Sidebar = ({ showSidebar, setShowSidebar, children, name }) => {

    const hotelSetup = process.env.NEXT_PUBLIC_HOTEL_SETUP === "true";

    const { data: session, status } = useSession()
    const [user, setUser] = useState([]);

    const items = [
        {
            key: "new",
            label: "New file",
        },
        {
            key: "copy",
            label: "Copy link",
        },
        {
            key: "edit",
            label: "Edit file",
        },
        {
            key: "delete",
            label: "Delete file",
        }
    ];

    /*const isAdmin = () => {
        return session?.user?.role == 18;
    };*/

    const listItems = {
        //"Dashboard": [],

        "Settings": {
            icon: <IoSettings size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/changePassword", label: "Change Password", active: true
                },
                {
                    ref: "/homepage/securitySettings", label: "Security Setting", active: true
                },
            ]
        },

        "Organization": {
            icon: <FaHotel size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/organization", label: "Account", active: true
                },
                {
                    ref: "/homepage/properties", label: "Properties", active: true
                },
                {
                    ref: "/homepage/organizations",
                    label: "Organizations",
                    active: true
                },
            ]
        },

        "Profiles": {
            icon: <FaUserTie size={20} />,
            active: true,
            items: [
                {
                    ref: "/homepage/profile", label: "Profiles", active: true
                },
                {
                    ref: "/homepage/users", label: "Manage Users", active: true
                },

            ]
        }

    }
    return (
        <>
            <aside className={(showSidebar ? "" : "hidden ") + "bg-white h-screen border-r border-bg-primary overflow-hidden w-72 flex shrink-0 fixed top-0 z-40 inset-0 lg:block z-100"} aria-label="Sidebar">
                <div className="h-full w-full no-scrollbar px-3 pb-4 bg-white text-bg-primary">
                    <Link href="/homepage">
                        <div className="flex justify-center">
                            <div className="w-30 h-30 mt-8">
                                <Image src="/images/logo.png" alt="Logotipo" width={150} height={150} />
                            </div>
                        </div>
                    </Link>

                    <hr className="border-t border-primary-800 my-4" />

                    <ul className="space-y-2 h-full max-h-[calc(100vh-330px)] overflow-y-auto">
                        {
                            children
                        }
                        {
                            Object.entries(listItems).map(([k, { icon, items, active }], i) =>
                                <li key={i}>
                                    <ProfileDropdown title={k} labels={items} icon={icon} active={active} />
                                </li>
                            )
                        }
                    </ul>

                    <hr className="border-t border-primary-800 my-4" />

                    <br />

                    <div className="flex items-center gap-x-2">


                                    <FaUser className="text-2xl text-primary-800" />
                                    {status === 'authenticated' && session && (
                                        <span className="text-md text-primary-800 font-semibold ">{`${session.user.name} ${session.user.lastname}`}
                                        </span>
                                    )}
                                    <Button size="sm" className="bg-red-500" onClick={() => signOut()}><LuLogOut className='text-white' size={17} /></Button>
                    </div>

                    <br />
                </div>
            </aside>

            <div
                className={(showSidebar ? "" : "hidden ") + "fixed inset-0 z-10 bg-gray-900/50 lg:hidden"}
                onClick={() => setShowSidebar(false)}
            />
        </>
    );
}


const ProfileDropdown = ({ title, labels, icon, active }) => {
    const pathname = usePathname()
    const router = useRouter();

    const actives = []
    labels.forEach((label) => {
        if (pathname != "/") actives.push(pathname.includes(label.ref))
    })
    const isActive = actives.some((val) => { return val == true })
    const [isOpen, setIsOpen] = useState(isActive)

    return (
        <>
            <header
                className={(isActive ? "text-primary-800 bg-primary-600" : "text-primary-800") + " flex items-center justify-between cursor-pointer p-1 pr-2 rounded-lg hover:bg-primary-600 hover:text-primary-800 transition ease-in-out duration-150"}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="ml-2 flex items-center">
                    {active ? icon && <span className="mr-2">{icon}</span> : null}
                    {active ? title && <h2 className="text-lg font-semibold">{title}</h2> : null}
                </div>
                {active ? ((isOpen) ? <IoIosArrowDown /> : <IoIosArrowForward />) : null}
            </header>

            <ul title={title} className={(isOpen) ? "my-2 " : "hidden" + " mb-2 "}>
                {labels.map(({ ref, label, active }, index) => {
                    const linkIsActive = pathname.includes(ref);
                    const disabled = !active && ref !== "/";

                    return (
                        <li
                            key={index}
                            className={(linkIsActive ? "text-primary-800 font-bold bg-primary-600" : "text-primary-800") + "  ml-2 my-1 p-2 text-sm  rounded-lg cursor-pointer hover:bg-primary-600 hover:text-primary-800 active:ring transition ease-in-out duration-150"}
                            onClick={() => !disabled && router.push(ref)}
                            style={{ opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                        >
                            {!disabled ? label : null}
                            {disabled && (
                                <span className="ml-2 text-red-500"></span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default Sidebar;