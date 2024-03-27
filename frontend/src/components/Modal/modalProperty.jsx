"use client"
import React, { useState, useEffect } from "react";
import {
    Modal, ScrollShadow, ModalContent, Badge, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem,
    //imports de tabelas
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
} from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { IoApps } from "react-icons/io5";
import {GoGear} from "react-icons/fa";


const modalpropertie = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor, idProperty }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInvisible, setIsInvisible] = React.useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);
    const [propertyUsers, setPropertyUsers] = useState([]);
    const variants = ["underlined"];
    const [isLoading, setIsLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const toggleSecondModal = async () => {
        setIsSecondModalOpen(!isSecondModalOpen);
        if (!dataFetched) {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/hotel/properties/` + idProperty + `/users`);
                setPropertyUsers(response.data.response);
                setDataFetched(true);
            } catch (error) {
                console.error("Erro ao encontrar os utilizadores associados à propriedade:", error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const toggleThirdModal = () => {
        setIsThirdModalOpen(!isThirdModalOpen)
    }

    //inserção na tabela property
    const [property, setProperty] = useState({
        Name: '',
        Email: '',
        FiscalNumber: '',
        Address1: '',
        Country: '',
        District: '',
        ZipCode: '',
        PhoneNumber: '',
        Description: '',
        Abbreviation: '',
        Designation: '',
    })

    const handleInput = (event) => {
        setProperty({ ...property, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        if (!property.Name || !property.Email || !property.PhoneNumber || !property.FiscalNumber || !property.Address1 || !property.Country || !property.District || !property.ZipCode || !property.Abbreviation || !property.Description || !property.Designation || !property.OrganizationID) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/hotel/properties', {
            data: {
                Name: property.Name,
                Email: property.Email,
                FiscalNumber: property.FiscalNumber,
                Address1: property.Address1,
                Country: property.Country,
                District: property.District,
                ZipCode: property.ZipCode,
                PhoneNumber: property.PhoneNumber,
                Description: property.Description,
                Abbreviation: property.Abbreviation,
                Designation: property.Designation,
                OrganizationID: property.OrganizationID
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //final da inserção na tabela property

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/hotel/properties");
            setProperty(res.data.response);
        };
        getData();
    }, []);

    return (
        <>
            {formTypeModal === 10 && ( //Properties
                <>
                    <Button onPress={onOpen} color={buttonColor} className="w-fit">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full ",
                        }}
                        size="full"
                        hideCloseButton="true"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-4">
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Name" onChange={handleInput} variant={variant} label="Name" />
                                                        <Input type="number" name="FiscalNumber" onChange={handleInput} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input onChange={handleInput} name="Email" type="text" variant={variant} label="Email" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="number" name="PhoneNumber" onChange={handleInput} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" onChange={handleInput} variant={variant} label="Address 1" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" onChange={handleInput} variant={variant} label="Country" />
                                                        <Input type="text" name="District" onChange={handleInput} variant={variant} label="District" />
                                                        <Input type="number" name="ZipCode" onChange={handleInput} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Description" onChange={handleInput} variant={variant} label="Description" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Abbreviation" onChange={handleInput} variant={variant} label="Abbreviation" />
                                                        <Input type="text" name="Designation" onChange={handleInput} variant={variant} label="Designation" />
                                                        <Input type="number" name="OrganizationID" onChange={handleInput} variant={variant} label="Organization" />
                                                    </div>
                                                ))}
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}


            {formTypeModal === 11 && ( //Properties view
                <>
                    <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3">
                        {buttonName} {buttonIcon}
                    </Button>
                    <Modal
                        classNames={{
                            base: "max-h-screen",
                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                            body: "h-full ",
                        }}
                        size="full"
                        hideCloseButton="true"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={handleSubmit}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-4">
                                            <div className="flex justify-end gap-2">
                                                <div className="bg-gray-100 p-1 rounded border border-gray-300 mr-2">
                                                    <Badge color="success" content={5} isInvisible={isInvisible} shape="circle">
                                                        <Button color="transparent" onPress={toggleSecondModal}>
                                                            <FaUser size={20} className="text-gray-500" />
                                                        </Button>
                                                    </Badge>
                                                    <Modal
                                                        classNames={{
                                                            base: "max-h-screen",
                                                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                                                            body: "h-full",
                                                        }}
                                                        size="full"
                                                        hideCloseButton="true"
                                                        isOpen={isSecondModalOpen}
                                                        onClose={toggleSecondModal}
                                                        isDismissable={false}
                                                        isKeyboardDismissDisabled={true}
                                                    >
                                                        <ModalContent>
                                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                                {modalHeader}
                                                                <div className='flex flex-row items-center mr-5'>
                                                                    <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                                </div>
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                {isLoading ? (<p>A Carregar...</p>
                                                                ) : (
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
                                                                                Name
                                                                            </TableColumn>
                                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                LASTNAME
                                                                            </TableColumn>
                                                                        </TableHeader>
                                                                        <TableBody>
                                                                                {propertyUsers.map((user, index) => (
                                                                                    <TableRow key={index}>
                                                                                    <TableCell>{user.name}</TableCell>
                                                                                    <TableCell>{user.lastName}</TableCell>
                                                                                    </TableRow>
                                                                                ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                    </div>
                                                                )}
                                                            </ModalBody>
                                                        </ModalContent>
                                                    </Modal>
                                                </div>
                                                <div className="bg-gray-100 p-1 rounded border border-gray-300">
                                                    <Button color="transparent" onPress={toggleThirdModal}>
                                                        <IoApps size={20} className="text-gray-500" />
                                                    </Button>
                                                    <Modal
                                                        classNames={{
                                                            base: "max-h-screen",
                                                            wrapper: isExpanded ? "w-full h-screen" : "lg:pl-72 h-screen w-full",
                                                            body: "h-full",
                                                        }}
                                                        size="full"
                                                        hideCloseButton="true"
                                                        isOpen={isThirdModalOpen}
                                                        onClose={toggleThirdModal}
                                                        isDismissable={false}
                                                        isKeyboardDismissDisabled={true}
                                                    >
                                                        <ModalContent>
                                                            <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                                                {modalHeader}
                                                                <div className='flex flex-row items-center mr-5'>
                                                                    <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                                    <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                                </div>
                                                            </ModalHeader>
                                                            <ModalBody>
                                                                <table>
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Aplicações</th>
                                                                            <th>Propriedade</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Data 1</td>
                                                                            <td>Data 2</td>
                                                                            {/* Add more rows and data as needed */}
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </ModalBody>
                                                        </ModalContent>
                                                    </Modal>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Name" onChange={handleInput} variant={variant} label="Name" />
                                                        <Input type="number" name="FiscalNumber" onChange={handleInput} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input onChange={handleInput} name="Email" type="text" variant={variant} label="Email" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="number" name="PhoneNumber" onChange={handleInput} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" onChange={handleInput} variant={variant} label="Address 1" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" onChange={handleInput} variant={variant} label="Country" />
                                                        <Input type="text" name="District" onChange={handleInput} variant={variant} label="District" />
                                                        <Input type="number" name="ZipCode" onChange={handleInput} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Description" onChange={handleInput} variant={variant} label="Description" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Abbreviation" onChange={handleInput} variant={variant} label="Abbreviation" />
                                                        <Input type="text" name="Designation" onChange={handleInput} variant={variant} label="Designation" />
                                                        <Input type="number" name="OrganizationID" onChange={handleInput} variant={variant} label="Organization" />
                                                    </div>
                                                ))}
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default modalpropertie;