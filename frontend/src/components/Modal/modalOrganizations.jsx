"use client"
import React, { useState } from "react";
import { Modal, ScrollShadow, ModalContent, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Switch } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import organizationInsert, { organizationEdit } from "../functionsForm/organizations/page";


const modaluser = ({
    idOrganization,
    buttonName,
    buttonIcon,
    modalHeader,
    formTypeModal,
    buttonColor,
    editIcon,
    modalEditArrow,
    modalEdit,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const variants = ["underlined"];
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const [organizationProperties, setOrganizationProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);
    const [isSelected, setIsSelected] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleSecondModal = async () => {
        setIsSecondModalOpen(!isSecondModalOpen);
        if (!dataFetched) {
            setIsLoading(true);
            try {
                const response = await axios.get(`/api/hotel/organizations/` + idOrganization + `/properties`);
                setOrganizationProperties(response.data.response);
                setDataFetched(true);
            } catch (error) {
                console.error("Erro ao encontrar os propriedades associados à Organização:", error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };


    const { handleInputOrganization, handleSubmitOrganization } = organizationInsert();
    const { handleUpdateOrganization, setValuesOrganization, valuesOrganization } = organizationEdit(idOrganization);

    return (
        <>
            {formTypeModal === 10 && ( //create organizations
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
                                    <form onSubmit={handleSubmitOrganization}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Name" onChange={handleInputOrganization} variant={variant} label="Name" />
                                                        <Input type="text" name="E-Mail" onChange={handleInputOrganization} variant={variant} label="E-Mail" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="FiscalNumber" onChange={handleInputOrganization} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="text" name="PhoneNumber" onChange={handleInputOrganization} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" onChange={handleInputOrganization} variant={variant} label="Address 1" />
                                                        <Input type="text" name="Address2" onChange={handleInputOrganization} variant={variant} label="Address 2" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" onChange={handleInputOrganization} variant={variant} label="Country" />
                                                        <Input type="text" name="District" onChange={handleInputOrganization} variant={variant} label="District" />
                                                        <Input type="text" name="ZipCode" onChange={handleInputOrganization} variant={variant} label="zipCode" />
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
            )
            }


            {formTypeModal === 11 && ( //edit organizations
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
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form onSubmit={(e) => handleUpdateOrganization(e)}>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                            <div className="flex flex-row justify-start gap-4">
                                                {editIcon} {modalHeader} {modalEditArrow} {modalEdit}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={toggleSecondModal}><FaRegUser size={25} /></Button>
                                                <Button color="transparent" onPress={onClose} type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Name" value={valuesOrganization.Name} onChange={e => setValuesOrganization({ ...valuesOrganization, Name: e.target.value })} variant={variant} label="Name" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Email" value={valuesOrganization.Email} onChange={e => setValuesOrganization({ ...valuesOrganization, Email: e.target.value })} variant={variant} label="Email" />
                                                        <Input type="text" name="FiscalNumber" value={valuesOrganization.FiscalNumber} onChange={e => setValuesOrganization({ ...valuesOrganization, FiscalNumber: e.target.value })} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="text" name="PhoneNumber" value={valuesOrganization.PhoneNumber} onChange={e => setValuesOrganization({ ...valuesOrganization, PhoneNumber: e.target.value })} variant={variant} label="Phone Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Address1" value={valuesOrganization.Address1} onChange={e => setValuesOrganization({ ...valuesOrganization, Address1: e.target.value })} variant={variant} label="Address 1" />
                                                        <Input type="text" name="Address2" value={valuesOrganization.Address2} onChange={e => setValuesOrganization({ ...valuesOrganization, Address2: e.target.value })} variant={variant} label="Address 2" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Country" value={valuesOrganization.Country} onChange={e => setValuesOrganization({ ...valuesOrganization, Country: e.target.value })} variant={variant} label="Country" />
                                                        <Input type="text" name="District" value={valuesOrganization.District} onChange={e => setValuesOrganization({ ...valuesOrganization, District: e.target.value })} variant={variant} label="District" />
                                                        <Input type="text" name="ZipCode" value={valuesOrganization.ZipCode} onChange={e => setValuesOrganization({ ...valuesOrganization, ZipCode: e.target.value })} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                                <Switch isSelected={isSelected} onValueChange={setIsSelected}>
                                                    Desativar Organização
                                                </Switch>
                                            </div>
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )
            }
            {formTypeModal === 13 && (
                <>
                    <Button onPress={toggleSecondModal} color={buttonColor} className="w-fit">
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
                        isOpen={isSecondModalOpen}
                        onOpenChange={toggleSecondModal}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onPress={onClose}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        {isLoading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            <div className="mx-5 h-[65vh] min-h-full overflow-auto">
                                                <Table
                                                    isHeaderSticky={true}
                                                    layout="fixed"
                                                    removeWrapper
                                                    classNames={{
                                                        wrapper: "min-h-[222px]",
                                                    }}
                                                    className="h-full"
                                                >
                                                    <TableHeader>
                                                        <TableColumn className="bg-primary-600 text-white font-bold">ID</TableColumn>
                                                        <TableColumn className="bg-primary-600 text-white font-bold">NAME</TableColumn>
                                                        <TableColumn className="bg-primary-600 text-white font-bold">ADDRESS</TableColumn>
                                                        <TableColumn className="bg-primary-600 text-white font-bold">COUNTRY</TableColumn>
                                                        <TableColumn className="bg-primary-600 text-white font-bold">EMAIL</TableColumn>
                                                        <TableColumn className="bg-primary-600 text-white flex justify-center items-center">
                                                        </TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {organizationProperties.map((organization, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{organization.propertyID}</TableCell>
                                                                <TableCell>{organization.name}</TableCell>
                                                                <TableCell>{organization.address1}</TableCell>
                                                                <TableCell>{organization.country}</TableCell>
                                                                <TableCell>{organization.email}</TableCell>
                                                                <TableCell className="flex justify-center" />
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        )}
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
};

export default modaluser;