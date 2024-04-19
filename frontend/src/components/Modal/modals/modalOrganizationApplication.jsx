"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure , Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import axios from 'axios';

//icons

import { MdClose } from "react-icons/md";
import { LiaExpandSolid } from "react-icons/lia";


const modalOrganizationApplication = ({buttonName,
    buttonIcon,
    modalHeader,
    formTypeModal,
    buttonColor,
    idOrganization
    }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [OrganizationApplications, setOrganizationApplications] = useState([]);
    const [OrganizationApplicationsFetched, setOrganizationApplicationsFetched] = useState(false);



    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    const toggleModal = async () => {
        setIsModalOpen(!isModalOpen);
        if (!OrganizationApplicationsFetched) {
            setIsLoading(true);
            try {
                    const res = await axios.get(`/api/hotel/organizations/` + idOrganization + `/applications/`);
                    setOrganizationApplications(res.data.response);
                    console.log(res.data.response)
                    setOrganizationApplicationsFetched(true);
                } catch (error) {
                    console.error("Erro ao encontrar as aplicação da organização:", error.message);
            } finally {
                setIsLoading(false);
            }
    }
    }

    return (
        <>
            {formTypeModal === 1 && (
                <>
                    <Button onPress={toggleModal} color={buttonColor} className="w-fit">
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
                        isOpen={isModalOpen}
                        onOpenChange={toggleModal}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                    >
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        {modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
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
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                APPLICATION
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                CONNECTION STRING
                                                            </TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {OrganizationApplications.map((organization, index) => (
                                                                <TableRow key={index}>
                                                                    <TableCell>{organization.applications.description}</TableCell>
                                                                    <TableCell>Teste</TableCell>
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
export default modalOrganizationApplication;