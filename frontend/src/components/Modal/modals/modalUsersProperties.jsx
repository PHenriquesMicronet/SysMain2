"use client"
import React, { useState } from "react";
import { Modal, ScrollShadow, ModalContent, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";



const modalusersproperties = ({
    buttonName,
    buttonIcon,
    modalHeader,
    formTypeModal,
    buttonColor,
    modalEditArrow,
    idUser,
    OrganizationUserName,
    PropertiesUserName,
    NameUser
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {formTypeModal === 10 && ( 
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
                                    <form>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        <div className="flex flex-row justify-start gap-4">
                                            {modalHeader}{modalEditArrow} {NameUser}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={onClose} type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                            
                                        </ModalBody>
                                    </form>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )
            }
        </>
    );
};

export default modalusersproperties;