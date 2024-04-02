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
import { TfiSave } from "react-icons/tfi";


import FormModals from "@/components/Modal/modalRoles";
import roleEdit from "@/components/functionsForm/role/page";

const RolesPage = (roleID) => {

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [searchValue, setSearchValue] = React.useState("");
    const [roles, setRoles] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isInvisible, setIsInvisible] = React.useState(false);

    const filteredItems = React.useMemo(() => {
        return roles.filter((roles) =>
            roles.name.toLowerCase().includes(
                searchValue.toLowerCase()
            ) ||
            roles.roleID.toString().toLowerCase().includes(
                searchValue.toLowerCase()
            )
        );
    }, [roles, searchValue]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/hotel/roles");
            setRoles(res.data.response);
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


    const handleDelete = async (roleID) => {
    
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este perfil?");
        
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/hotel/roles/` + roleID);
                alert("Perfil removido com sucesso!");
            } catch (error) {
                console.error("Erro ao remover Perfil:", error.message);
            }
        }
    };

    const [editID, setEditID] = useState(-1)
    const [name, setName] = useState()
    const [description, setDescription] = useState()

    const handleEdit = (id) => {
        setEditID(id)
    }

    const { handleUpdateRole, setValuesRole, valuesRole } = roleEdit(roleID)

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
                        {items.map((roles, index) => (
                            roles.roleID === editID ?
                            <form onSubmit={(e) => handleUpdateRole(e)}>
                                <div key={index} className="border rounded-lg p-4 shadow-md h-[250px] w-[350px] text-center">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold flex items-center">
                                        <span>ID {roles.roleID}</span>
                                        </h2>
                                    <div className="flex ml-2 space-x-2">
                                        <Button type="submit" color="transparent" className="cursor-pointer text-gray-500 hover:text-gray-700"><TfiSave size={23} /></Button>
                                    </div>
                                </div>
                                <h1 className="text-gray-600 mb-2 text-xl font-bold mb-4"><input type="text" value={valuesRole.name} onChange={e => setValuesRole({ ...valuesRole, name: e.target.value })}/></h1>
                                <Button color="transparent"><FaUserTie size={70} /></Button>
                                <p className="text-gray-600 mt-4"><input color="transparent" type="text" value={valuesRole.description} onChange={e => setValuesRole({ ...valuesRole, description: e.target.value })}/></p>
                            </div>
                            </form>
                            :
                            <div key={index} className="border rounded-lg p-4 shadow-md h-[250px] w-[350px] text-center">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-bold flex items-center">
                                        <span>ID {roles.roleID}</span>
                                        </h2>
                                    <div className="flex ml-2 space-x-2">
                                        <Badge color="success" content={5} isInvisible={isInvisible} shape="circle">
                                        <BsPerson size={25} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                        </Badge>
                                        <BsPencil onClick={() => handleEdit(roles.roleID)} size={25} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                        <BsTrash size={25}  idRole={roles.roleID} onClick={() => handleDelete(roles.roleID)} className="cursor-pointer text-gray-500 hover:text-gray-700" />
                                    </div>
                                </div>
                                <h1 className="text-gray-600 mb-2 text-xl font-bold mb-4">{roles.name}</h1>
                                <Button color="transparent"><FaUserTie size={70} /></Button>
                                <p className="text-gray-600 mt-4">{roles.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default RolesPage;