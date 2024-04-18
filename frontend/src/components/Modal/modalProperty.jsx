"use client"
import React, { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import {
    Modal, Switch, ModalContent, Badge, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem,
    //imports de tabelas
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination,
} from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';


//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { FaUser, FaArrowLeft, FaPlug } from "react-icons/fa";
import { IoApps } from "react-icons/io5";
import { BiSpreadsheet } from "react-icons/bi";
import { FaLock } from "react-icons/fa";

import FormModals from "@/components/Modal/modals/modalApplications";
import FormModalsLicence from "@/components/Modal/modals/modalLicences"
import FormModalsFeature from "@/components/Modal/modals/modalFeatures"

import propertyInsert, { propertyEdit } from "../functionsForm/property/page";


const modalpropertie = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor, idProperty, editIcon, modalEditArrow, modalEdit }) => {

    const variants = ["underlined"];

    /* Variaveis de uso*/
    const [isExpanded, setIsExpanded] = useState(false);
    const [isInvisible, setIsInvisible] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { handleInputProperty, handleSubmitProperty } = propertyInsert();
    const { handleUpdateProperty, setValuesProperty, valuesProperty } = propertyEdit(idProperty);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    /* Modals Open*/
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [isThirdModalOpen, setIsThirdModalOpen] = useState(false);

    /*Array para listar */
    const [propertyUsers, setPropertyUsers] = useState([]);
    const [propertyApplication, setPropertyApplications] = useState([]);

    /*Data Info*/
    const [applicationFetched, setApplicationFetched] = useState(false);
    const [fetchUsers, setFetchUsers] = useState(false);
    const [userCount, setUserCount] = useState(null);

    const { data: session, status } = useSession()
    const isAdmin = () => {
        return session?.user?.role == 18;
    };

    /*Paths para os Modals*/
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };


    const toggleSecondModal = async () => {
        setIsSecondModalOpen(!isSecondModalOpen);
        if (!fetchUsers) {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/hotel/properties/` + idProperty + `/users`);
                console.log(response)
                setPropertyUsers(response.data.response);
                setFetchUsers(true);
            } catch (error) {
                console.error("Erro ao encontrar os utilizadores associados à propriedade:", error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    // const toggleThirdModal = async () => {
    //     setIsThirdModalOpen(!isThirdModalOpen);
    //     if (!applicationFetched) {
    //         setIsLoading(true);
    //         try {
    //             const response = await axios.get(`/api/hotel/properties/` + idProperty + `/applications`);
    //             setPropertyApplications(response.data.response);
    //             setApplicationFetched(true);
    //         } catch (error) {
    //             console.error("Erro ao encontrar as aplicações associadas à propriedade:", error.message);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    // };
    const [allApplications, setAllApplications] = useState([]);

    useEffect(() => {
        const fetchAllApplications = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/hotel/applications`);
                setAllApplications(response.data.response);
            } catch (error) {
                console.error("Erro ao buscar todas as aplicações:", error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllApplications();
    }, []);


const toggleThirdModal = async () => {
    setIsThirdModalOpen(!isThirdModalOpen);
    if (!applicationFetched) {
        setIsLoading(true);
        try {
            let response;
            if (isAdmin()) { // Se o usuário for um administrador
                response = await axios.get(`/api/hotel/applications`);
            } else { // Se o usuário não for um administrador
                response = await axios.get(`/api/hotel/properties/${idProperty}/applications`);
            }
            setPropertyApplications(response.data.response);
            setApplicationFetched(true);
        } catch (error) {
            console.error("Erro ao encontrar as aplicações:", error.message);
        } finally {
            setIsLoading(false);
        }
    }
};

    useEffect(() => {
        // Função para buscar o número de usuários quando o componente for montado
        async function fetchUserCount() {
            try {
                const response = await axios.get('/api/hotel/properties/' + idProperty + '/users/count');
                setUserCount(response.data.response);
            } catch (error) {
                console.error("Error fetching user count:", error);
            }
        }
        fetchUserCount();
    }, []); // Executar somente uma vez no montagem do componente




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
                                    <form onSubmit={handleSubmitProperty}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} type="submit"><TfiSave size={25} /></Button>
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
                                                        <Input type="text" name="Name" onChange={handleInputProperty} variant={variant} label="Name" />
                                                        <Input type="number" name="FiscalNumber" onChange={handleInputProperty} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input onChange={handleInputProperty} name="Email" type="text" variant={variant} label="Email" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="number" name="PhoneNumber" onChange={handleInputProperty} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" onChange={handleInputProperty} variant={variant} label="Address 1" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" onChange={handleInputProperty} variant={variant} label="Country" />
                                                        <Input type="text" name="District" onChange={handleInputProperty} variant={variant} label="District" />
                                                        <Input type="number" name="ZipCode" onChange={handleInputProperty} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Description" onChange={handleInputProperty} variant={variant} label="Description" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Abbreviation" onChange={handleInputProperty} variant={variant} label="Abbreviation" />
                                                        <Input type="text" name="Designation" onChange={handleInputProperty} variant={variant} label="Designation" />
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
                    <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3" >
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
                                    <form onSubmit={handleSubmitProperty}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-4">
                                            <div className="flex justify-end gap-2">
                                                <div className="bg-gray-100 p-1 rounded border border-gray-300 mr-2">
                                                    <Badge color="success" content={userCount} isInvisible={!userCount} shape="circle">
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
                                                                                    NAME
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    LASTNAME
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    EMAIL
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    PERFIL
                                                                                </TableColumn>
                                                                            </TableHeader>
                                                                            <TableBody>
                                                                                {propertyUsers.map((user, index) => (
                                                                                    <TableRow key={index}>
                                                                                        <TableCell>{user.name}</TableCell>
                                                                                        <TableCell>{user.surname}</TableCell>
                                                                                        <TableCell>{user.email}</TableCell>
                                                                                        <TableCell>{user.role}</TableCell>
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
                                                                    <Button color="transparent" onClick={toggleSecondModal}><FaArrowLeft size={25} /></Button>
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
                                                                                    SYSTEM
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    AVAILABLE
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    LICENCES
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    FEATURES
                                                                                </TableColumn>
                                                                            </TableHeader>
                                                                            <TableBody>
                                                                                {isAdmin() ? ( // Se o utilizador for admin
                                                                                    allApplications.map((application, index) => (
                                                                                        <TableRow key={index}>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                <FormModals
                                                                                                    buttonName={application.description}
                                                                                                    buttonColor={"transparent"}
                                                                                                    formTypeModal={1}
                                                                                                    idApplication={application.id}
                                                                                                    idProperty={idProperty}
                                                                                                ></FormModals>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Switch defaultSelected size="sm" color="success" />
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsLicence
                                                                                                        buttonName={<BiSpreadsheet size={25} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={2}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsLicence>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20}/></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsFeature
                                                                                                        buttonName={<FaPlug size={20} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={3}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsFeature>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20} /></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))
                                                                                ) : ( // Se o utilizador nao for admin
                                                                                    propertyApplication.map((application, index) => (
                                                                                        <TableRow key={index}>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                <FormModals
                                                                                                    buttonName={application.description}
                                                                                                    buttonColor={"transparent"}
                                                                                                    formTypeModal={1}
                                                                                                    idApplication={application.id}
                                                                                                    idProperty={idProperty}
                                                                                                ></FormModals>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Switch defaultSelected size="sm" color="success" />
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}> 
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsLicence
                                                                                                        buttonName={<BiSpreadsheet size={25} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={2}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsLicence>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20} 
                                                                                                    /></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsFeature
                                                                                                        buttonName={<FaPlug size={20} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={3}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsFeature>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20} /></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))
                                                                                )}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </div>
                                                                )}
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
                                                        <Input type="text" name="Name" value={valuesProperty.Name} onChange={handleInputProperty} variant={variant} label="Name" />
                                                        <Input type="number" name="FiscalNumber" value={valuesProperty.FiscalNumber} onChange={handleInputProperty} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input onChange={handleInputProperty} name="Email" value={valuesProperty.Email} type="text" variant={variant} label="Email" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="number" name="PhoneNumber" value={valuesProperty.PhoneNumber} onChange={handleInputProperty} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" value={valuesProperty.Address1} onChange={handleInputProperty} variant={variant} label="Address 1" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" value={valuesProperty.Country} onChange={handleInputProperty} variant={variant} label="Country" />
                                                        <Input type="text" name="District" value={valuesProperty.District} onChange={handleInputProperty} variant={variant} label="District" />
                                                        <Input type="number" name="ZipCode" value={valuesProperty.ZipCode} onChange={handleInputProperty} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Description" value={valuesProperty.Description} onChange={handleInputProperty} variant={variant} label="Description" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Abbreviation" value={valuesProperty.Abbreviation} onChange={handleInputProperty} variant={variant} label="Abbreviation" />
                                                        <Input type="text" name="Designation" value={valuesProperty.Designation} onChange={handleInputProperty} variant={variant} label="Designation" />
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


            {formTypeModal === 12 && ( //Properties edit
                <>
                    <Button fullWidth={true} size="md" onPress={onOpen} color={buttonColor} className="-h-3 flex justify-start -p-3" >
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
                                    <form onSubmit={(e) => handleUpdateProperty(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} type="submit"><TfiSave size={25} /></Button>
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
                                                                                    NAME
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    LASTNAME
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    EMAIL
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    PERFIL
                                                                                </TableColumn>
                                                                            </TableHeader>
                                                                            <TableBody>
                                                                                {propertyUsers.map((user, index) => (
                                                                                    <TableRow key={index}>
                                                                                        <TableCell>{user.name}</TableCell>
                                                                                        <TableCell>{user.surname}</TableCell>
                                                                                        <TableCell>{user.email}</TableCell>
                                                                                        <TableCell>{user.role}</TableCell>
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
                                                                {isLoading ? (<p>A Carregar...</p>
                                                                ) : (
                                                                    <div className="mx-5 h-[65vh] min-h-full ">
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
                                                                                    SYSTEM
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    AVAILABLE
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    LICENCE
                                                                                </TableColumn>
                                                                                <TableColumn className="bg-primary-600 text-white font-bold">
                                                                                    FEATURES
                                                                                </TableColumn>
                                                                            </TableHeader>
                                                                            <TableBody>
                                                                                {isAdmin() ? ( // Se o utilizador for admin
                                                                                    allApplications.map((application, index) => (
                                                                                        <TableRow key={index}>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                <FormModals
                                                                                                    buttonName={application.description}
                                                                                                    buttonColor={"transparent"}
                                                                                                    formTypeModal={1}
                                                                                                    idApplication={application.id}
                                                                                                    idProperty={idProperty}
                                                                                                ></FormModals>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Switch defaultSelected size="sm" color="success" />
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsLicence
                                                                                                        buttonName={<BiSpreadsheet size={25} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={2}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsLicence>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20}/></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsFeature
                                                                                                        buttonName={<FaPlug size={20} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={3}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsFeature>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20} /></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))
                                                                                ) : ( // Se o utilizador nao for admin
                                                                                    propertyApplication.map((application, index) => (
                                                                                        <TableRow key={index}>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                <FormModals
                                                                                                    buttonName={application.description}
                                                                                                    buttonColor={"transparent"}
                                                                                                    formTypeModal={1}
                                                                                                    idApplication={application.id}
                                                                                                    idProperty={idProperty}
                                                                                                ></FormModals>
                                                                                            </TableCell>
                                                                                            <TableCell>
                                                                                                <Switch defaultSelected size="sm" color="success" />
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}> 
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsLicence
                                                                                                        buttonName={<BiSpreadsheet size={25} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={2}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsLicence>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20} 
                                                                                                    /></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                            <TableCell style={{ textAlign: 'left' }}>
                                                                                                {application.description === "OnPremPMS" ? (
                                                                                                    <FormModalsFeature
                                                                                                        buttonName={<FaPlug size={20} />}
                                                                                                        buttonColor={"transparent"}
                                                                                                        formTypeModal={3}
                                                                                                        idApplication={application.id}
                                                                                                        idProperty={idProperty}
                                                                                                    ></FormModalsFeature>
                                                                                                ) : (
                                                                                                    <Button className={"bg-transparent hover:bg-transparent"}><FaLock size={20} /></Button>
                                                                                                )}
                                                                                            </TableCell>
                                                                                        </TableRow>
                                                                                    ))
                                                                                )}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </div>
                                                                )}
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
                                                        <Input type="text" name="Name" value={valuesProperty.Name} onChange={e => setValuesProperty({ ...valuesProperty, Name: e.target.value })} variant={variant} label="Name" />
                                                        <Input type="number" name="FiscalNumber" value={valuesProperty.FiscalNumber} onChange={e => setValuesProperty({ ...valuesProperty, FiscalNumber: e.target.value })} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input value={valuesProperty.Email} onChange={e => setValuesProperty({ ...valuesProperty, Email: e.target.value })} name="Email" type="text" variant={variant} label="Email" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="number" name="PhoneNumber" value={valuesProperty.PhoneNumber} onChange={e => setValuesProperty({ ...valuesProperty, PhoneNumber: e.target.value })} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" value={valuesProperty.Address1} onChange={e => setValuesProperty({ ...valuesProperty, Address1: e.target.value })} variant={variant} label="Address 1" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" value={valuesProperty.Country} onChange={e => setValuesProperty({ ...valuesProperty, Country: e.target.value })} variant={variant} label="Country" />
                                                        <Input type="text" name="District" value={valuesProperty.District} onChange={e => setValuesProperty({ ...valuesProperty, District: e.target.value })} variant={variant} label="District" />
                                                        <Input type="number" name="ZipCode" value={valuesProperty.ZipCode} onChange={e => setValuesProperty({ ...valuesProperty, ZipCode: e.target.value })} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Description" value={valuesProperty.Description} onChange={e => setValuesProperty({ ...valuesProperty, Description: e.target.value })} variant={variant} label="Description" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Abbreviation" value={valuesProperty.Abbreviation} onChange={e => setValuesProperty({ ...valuesProperty, Abbreviation: e.target.value })} variant={variant} label="Abbreviation" />
                                                        <Input type="text" name="Designation" value={valuesProperty.Designation} onChange={e => setValuesProperty({ ...valuesProperty, Designation: e.target.value })} variant={variant} label="Designation" />
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