"use client";
import React from "react";

//import de axios para BD
import axios from "axios";

import { useState, useEffect } from "react";
import {
    Input,
    Button,
    useDisclosure,
    Badge,
    Pagination,
} from "@nextui-org/react"

//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import { BsTrash, BsPerson, BsPencil } from 'react-icons/bs'


import FormModals from "@/components/Modal/modalProfile";

const profilePage = () => {

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [searchValue, setSearchValue] = React.useState("");
    const [profile, setProfile] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isInvisible, setIsInvisible] = React.useState(false);

    const filteredItems = React.useMemo(() => {
        return profile.filter((profile) =>
            profile.name.toLowerCase().includes(
                searchValue.toLowerCase()
            ) ||
            profile.profileID.toString().toLowerCase().includes(
                searchValue.toLowerCase()
            )
        );
    }, [profile, searchValue]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/hotel/profile");
            setProfile(res.data.response);
        };
        getData();
    }, []);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);


    const handleSearchChange = (value) => {
        setSearchValue(value);
        setPage(1);
    };


    const handleDelete = async (profileID) => {
    
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este perfil?");
        
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/hotel/profile/` + profileID);
                alert("Perfil removido com sucesso!");
            } catch (error) {
                console.error("Erro ao remover Perfil:", error.message);
            }
        }
    };


    return (
        <>
            <main>
                <div className="flex flex-col mt-5 py-3">
                    <p className="text-xs px-6">Perfil</p>
                    <div className="flex flex-row justify-between items-center mx-5">
                        <div className="flex flex-row">
                            <div className="flex flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    className="mt-4 w-80"
                                    placeholder="Procurar..."
                                    labelPlacement="outside"
                                    startContent={
                                        <FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                    }
                                    value={searchValue}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <FormModals
                            buttonName={"Inserir Perfil"}
                            buttonIcon={<FiPlus size={15} />}
                            buttonColor={"primary"}
                            modalHeader={"Inserir Perfil"}
                            modalIcons={"bg-red"}
                            formTypeModal={10}
                        ></FormModals>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-24 p-4 mx-auto gap-y-8">
                        {items.map((profile, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow-md h-[250px] w-[350px] text-center">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold flex items-center">
                                        <span>ID {profile.profileID}</span>
                                        </h2>
                                    <div className="flex ml-2 space-x-2">
                                        <Badge color="success" content={5} isInvisible={isInvisible} shape="circle">
                                        <BsPerson size={25} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                        </Badge>
                                        <BsPencil size={25} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                        <BsTrash size={25}  onClick={() => handleDelete(profile.profileID)} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                    </div>
                                </div>
                                <h1 className="text-gray-600 mb-2 text-xl font-bold mb-4">{profile.name}</h1>
                                <Button color="transparent"><FaUserTie size={70} /></Button>
                                <p className="text-gray-600 mt-4">{profile.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default profilePage;