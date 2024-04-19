import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Input,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@nextui-org/react";
import { GoGear } from "react-icons/go";
import { BsThreeDotsVertical, BsArrowRight } from "react-icons/bs";
import { FiSearch, FiPlus, FiEdit3 } from "react-icons/fi";
import { IoMdDownload } from "react-icons/io"; 
import FormModals from "@/components/Modal/modalOrganizations";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

export default function Contact() {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [searchValue, setSearchValue] = useState("");
    const [organizations, setOrganizations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    // const filteredItems = organizations.filter(
    //     (organization) =>
    //         organization.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    //         organization.organizationID.toString().toLowerCase().includes(searchValue.toLowerCase())
    // );
    // const items = filteredItems.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    const filteredItems = React.useMemo(() => {
        return organizations.filter((organizations) =>
        organizations.name.toLowerCase().includes(
                searchValue.toLowerCase()
            ) ||
            organizations.organizationID.toString().toLowerCase().includes(
                searchValue.toLowerCase()
            )
        );
    }, [organizations, searchValue]);
        const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const handleChangePage = (page) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset page to 1 when changing rows per page
    };

    const exportToPDF = () => {
        const pdf = new jsPDF();
        pdf.autoTable({ html: "#TableToPDF" })
        pdf.save("Organizations.pdf")
    }
/*---------------------------------------------------------------------------------------- */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/hotel/organizations");
                setOrganizations(res.data.response);
            } catch (error) {
                console.error("Erro ao obter as organizações:", error.message);
            }
        };
        fetchData();
    }, []);

    const handleSearchChange = (value) => {
        setSearchValue(value);
        setPage(1);
    };

    const handleDelete = async (organizationID) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta organização?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/hotel/organizations/` + organizationID);
                alert("Organização removida com sucesso!");
            } catch (error) {
                console.error("Erro ao remover Organização:", error.message);
            }
        }
    };


    return (
        <>
            <main>
                <div className="flex flex-col mt-5 py-3">
                    <p className="text-xs px-6">Organizações</p>
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
                            buttonName={"Inserir Organização"}
                            buttonIcon={<FiPlus size={15} />}
                            buttonColor={"primary"}
                            modalHeader={"Inserir Organização"}
                            modalIcons={"bg-red"}
                            formTypeModal={10}
                        ></FormModals>
                    </div>
                </div>
                <div className="mx-5 h-[65vh] min-h-full">
                    <Table
                        id="TableToPDF"
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
                                ADDRESS
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                COUNTRY
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white font-bold">
                                PROPRIEDADES
                            </TableColumn>
                            <TableColumn className="bg-primary-600 text-white flex justify-center items-center">
                                <GoGear size={20} />
                            </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {items.map((organization, index) => (
                                <TableRow key={index}>
                                    <TableCell>{organization.organizationID}</TableCell>
                                    <TableCell>{organization.name}</TableCell>
                                    <TableCell>{organization.address1}</TableCell>
                                    <TableCell>{organization.country}</TableCell>
                                    <TableCell><FormModals
                                        buttonName={organization.properties }
                                        buttonColor={"transparent"}
                                        modalEdit={`ID: ${organization.organizationID}`}
                                        formTypeModal={13}
                                        idOrganization={organization.organizationID}
                                    ></FormModals>
                                    </TableCell>
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
                                            <DropdownMenu aria-label="Static Actions" isOpen={true} closeOnSelect={false}>
                                                <DropdownItem key="edit">
                                                    <FormModals
                                                        buttonName={"Editar"}
                                                        editIcon={<FiEdit3 size={25} />}
                                                        buttonColor={"transparent"}
                                                        modalHeader={"Editar Organizacao"}
                                                        modalEditArrow={<BsArrowRight size={25} />}
                                                        modalEdit={`ID: ${organization.organizationID}`}
                                                        formTypeModal={11}
                                                        idOrganization={organization.organizationID}
                                                    ></FormModals>
                                                </DropdownItem>
                                                <DropdownItem onClick={() => handleDelete(organization.organizationID)}>Remover</DropdownItem>
                                                <DropdownItem>
                                                    <FormModals
                                                        buttonName={"Ver"}
                                                        buttonColor={"transparent"}
                                                        modalHeader={"Ver Detalhes da Organizacao"}
                                                        formTypeModal={11}
                                                        modalEdit={`ID: ${organization.organizationID}`}
                                                        idOrganization={organization.organizationID}
                                                    ></FormModals>
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
                    <Button>                    <CSVLink
                        data={items.map((item) => ({
                            organizationID: item.organizationID,
                            Name: item.name,
                            Address1: item.address1, 
                            Country: item.country ,
                        }))}
                        filename={"Organizações"}
                        separator=";"
                        enclosingCharacter=""
                    >
                        CSV 
                    </CSVLink><IoMdDownload />
                    </Button>
                    </div>
                    <div className="flex flex-row items-center">
                        <Pagination
                            isCompact
                            showControls
                            color="primary"
                            variant="flat"
                            page={page}
                            total={Math.ceil(filteredItems.length / rowsPerPage)}
                            onChange={handleChangePage} 
                            className="mx-5"
                        />
                        <div>
                            <span className="text-sm text-black">Items por página:</span>
                            <select
                                value={rowsPerPage}
                                onChange={handleChangeRowsPerPage} 
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
}