"use client";
import React from "react";

//import de axios para BD
import axios from "axios";

import { useState, useEffect } from "react";
import {
    Input,
    Button,
    useDisclosure,

    //imports de tabelas
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,

    //imports de dropdown menu
    DropdownTrigger, Dropdown, DropdownMenu, DropdownItem,
} from "@nextui-org/react"

//imports de icons
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";


import FormModals from "@/components/modal/formModals";

export default function Contact() {

    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);
    const [searchValue, setSearchValue] = React.useState("");
    const [caracteristics, setCaracteristics] = useState([]);

    const filteredItems = React.useMemo(() => {
        return caracteristics.filter((caracteristic) =>
            caracteristic.Description.toLowerCase().includes(
                searchValue.toLowerCase()
            ) ||
            caracteristic.idCarateristics.toString().toLowerCase().includes(
                searchValue.toLowerCase()
            )
        );
    }, [caracteristics, searchValue]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    return (
        <>
            <main>
                <div className="flex flex-col mt-5 py-3">
                    <p className="text-xs px-6">Propriedades</p>
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
                            buttonName={"Inserir Propriedade"}
                            buttonIcon={<FiPlus size={15} />}
                            buttonColor={"primary"}
                            modalHeader={"Inserir Propriedade"}
                            modalIcons={"bg-red"}
                            formTypeModal={11}
                        ></FormModals>
                    </div>
                </div>
                <div className="mx-5 h-[65vh] min-h-full">
                    <Table
                        isHeaderSticky={"true"}
                        layout={"fixed"}
                        removeWrapper
                        classNames={{
                            wrapper: "min-h-[222px]",
                        }}
                        className="h-full overflow-auto"
                    >
                        <TableHeader>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                ID
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                NAME
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                FISCAL NUMBER
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                PHONE NUMBER
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                ADDRESS
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                COUNTRY
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                CITY
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                ZIP CODE
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white flex justify-center items-center">
                                <GoGear size={20} />
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((caracteristic, index) => (
                                <TableRow key={index}>
                                    <TableCell>Alterar</TableCell>
                                    <TableCell>Alterar</TableCell>
                                    <TableCell>Alterar</TableCell>
                                    <TableCell><p className="truncate ">Alterar</p></TableCell>
                                    <TableCell><p className="truncate ">Alterar</p></TableCell>
                                    <TableCell><p className="truncate ">Alterar</p></TableCell>
                                    <TableCell><p className="truncate ">Alterar</p></TableCell>
                                    <TableCell className="flex justify-center">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button
                                                    variant="light"
                                                    className="flex flex-row justify-center"
                                                >
                                                    <BsThreeDotsVertical size={20} className="text-gray-400" />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions" closeOnSelect={false} isOpen={true}>
                                                <DropdownItem key="edit">
                                                    <FormModals
                                                        buttonName={"Editar"}
                                                        buttonColor={"transparent"}
                                                        modalHeader={"Editar Grupo de Tipologias"}
                                                        formTypeModal={11}
                                                    ></FormModals>
                                                </DropdownItem>
                                                <DropdownItem key="delete">Remover</DropdownItem>
                                                <DropdownItem key="delete">Ver</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="bg-tableFooter border border-tableFooterBorder flex justify-end items-center lg:pl-72 w-full min-h-10vh fixed bottom-0 right-0 z-20 text-sm text-default-400 py-3">
                    <div className="flex flex-row items-center">
                        <Pagination
                            isCompact
                            showControls
                            color="primary"
                            variant="flat"
                            page={page}
                            //total={pages}
                            //onChange={(page) => setPage(page)}
                            className="mx-5"
                        />
                        <div>
                            <span className="text-sm text-black">
                                Items por página:
                            </span>
                            <select
                                value={rowsPerPage}
                                //onChange={handleChangeRowsPerPage}
                                className="ml-2 py-1 px-2 border rounded bg-transparent text-sm text-default-600 mx-5"
                            >
                                <option value={15}>15</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                        <div className="ml-5 mr-10 text-black">
                            {items.length > 0
                                ? `${(page - 1) * rowsPerPage + 1}-${Math.min(
                                    page * rowsPerPage,
                                    filteredItems.length
                                )} de ${filteredItems.length}`
                                : "0 resultados"}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};
