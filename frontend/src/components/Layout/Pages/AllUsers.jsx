"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import {
    Input,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch, FiPlus, FiEdit3 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";
import Modaluser from "@/components/Modal/modalUser";
import PaginationComponent from "@/components/Pagination/Pagination";

export default function AllUsers() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [searchValue, setSearchValue] = useState("");
    const [users, setUsers] = useState([]);
    const { data: session, status } = useSession();

    const filteredItems = React.useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.userID.toString().toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [users, searchValue]);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
        setPage(1);
    };

    const handleDelete = async (userID) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir este utilizador?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/hotel/users/` + userID);
                alert("Utilizador removido com sucesso!");
            } catch (error) {
                console.error("Erro ao remover Utilizador:", error.message);
            }
        }
    };

    const exportToPDF = () => {
        const pdf = new jsPDF();
        pdf.autoTable({ html: "#TableToPDF" });
        pdf.save("Utilizadores.pdf");
    };

    useEffect(() => {
        const getData = async () => {
            if (status !== "loading") {
                const res = await axios.get(`/api/hotel/users`);
                setUsers(res.data.response);
            }
        };
        getData();
    }, [status]);

    return (
        <>
            <main>
                <div className="flex flex-col mt-5 py-3">
                    <p className="text-xs px-6">Utilizador</p>
                    <div className="flex flex-row justify-between items-center mx-5">
                        <div className="flex flex-row">
                            <div className="flex flex-wrap md:flex-nowrap gap-4">
                                <Input
                                    className="mt-4 w-80"
                                    placeholder="Procurar..."
                                    labelPlacement="outside"
                                    startContent={<FiSearch color={"black"} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                    value={searchValue}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                />
                            </div>
                        </div>
                        <Modaluser
                            buttonName={"Inserir Utilizador"}
                            buttonIcon={<FiPlus size={15} />}
                            buttonColor={"primary"}
                            modalHeader={"Inserir Utilizador"}
                            modalIcons={"bg-red"}
                            formTypeModal={10}
                        />
                    </div>
                </div>
                <div className="mx-5 h-[65vh] min-h-full">
                    <Table
                        id="TableToPDF"
                        isHeaderSticky={"true"}
                        layout={"fixed"}
                        removeWrapper
                        classNames={{ wrapper: "min-h-[222px]" }}
                        className="h-full overflow-auto"
                    >
                        <TableHeader>
                            {/* <TableColumn className="bg-primary-600 text-white font-bold">ID</TableColumn> */}
                            <TableColumn className="bg-primary-600 text-white font-bold">NAME</TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">EMAIL</TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">ORGANIZATION</TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">PROPERTY</TableColumn>
                            <TableColumn className="bg-primary-600 text-white flex justify-center items-center">
                                <GoGear size={20} />
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((user, index) => (
                                <TableRow key={index}>
                                    {/* <TableCell>{user.userID}</TableCell> */}
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.organization}</TableCell>
                                    <TableCell>{user.properties}</TableCell>
                                    <TableCell className="flex justify-center">
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button variant="light" className="flex flex-row justify-center">
                                                    <BsThreeDotsVertical size={20} className="text-gray-400" />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Static Actions">
                                                <DropdownItem key="edit">
                                                    <Modaluser
                                                        buttonName={"Editar"}
                                                        editIcon={<FiEdit3 size={25} />}
                                                        buttonColor={"transparent"}
                                                        modalHeader={"Editar Utilizador"}
                                                        modalEditArrow={<BsArrowRight size={25} />}
                                                        modalEdit={`ID: ${user.userID}`}
                                                        formTypeModal={11}
                                                        idUser={user.userID}
                                                        NameUser={user.name}
                                                        OrganizationUserName={user.organization}
                                                        PropertiesUserName={user.properties}
                                                    />
                                                </DropdownItem>
                                                <DropdownItem>
                                                    <button onClick={() => handleDelete(user.userID)}>Remover</button>
                                                </DropdownItem>
                                                <DropdownItem key="view">
                                                    <Modaluser
                                                        buttonName={"Ver"}
                                                        editIcon={<FiEdit3 size={25} />}
                                                        modalEditArrow={<BsArrowRight size={25} />}
                                                        buttonColor={"transparent"}
                                                        modalHeader={"Ver Utilizador"}
                                                        modalEdit={`ID: ${user.userID}`}
                                                        formTypeModal={11}
                                                        idUser={user.userID}
                                                        NameUser={user.name}
                                                        OrganizationUserName={user.organization}
                                                        PropertiesUserName={user.properties}
                                                    />
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="bg-tableFooter border border-tableFooterBorder flex justify-end items-center lg:pl-72 w-full min-h-10vh fixed bottom-0 right-0 z-20 text-sm text-default-400 py-3">
                    <div className="space-x-4">
                        <Button onClick={exportToPDF}>PDF <IoMdDownload /></Button>
                        <Button>
                            <CSVLink
                                data={items.map((item) => ({
                                    Name: item.name,
                                    Email: item.email,
                                    Organization: item.organization,
                                    Properties: item.properties,
                                }))}
                                filename={"Utilizadores"}
                                separator=";"
                                enclosingCharacter=""
                            >
                                CSV
                            </CSVLink><IoMdDownload />
                        </Button>
                    </div>
                    <PaginationComponent
                        page={page}
                        totalItems={filteredItems.length}
                        rowsPerPage={rowsPerPage}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </div>
            </main>
        </>
    );
};
