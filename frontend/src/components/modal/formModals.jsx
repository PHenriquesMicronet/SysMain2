"use client"
import React, { useState } from "react";
import { Modal, ScrollShadow, ModalContent, ModalHeader, ModalBody,Avatar, ModalFooter, Button, useDisclosure, Input, Textarea, Autocomplete, Divider, AutocompleteItem } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { RxExit } from "react-icons/rx";
import { MdClose } from "react-icons/md";


const formModals = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const variants = ["underlined"];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const Distritos = [
        { label: "Viana do Castelo", value: "VianadoCastelo", description: "" },
        { label: "Braga", value: "Braga", description: "" },
        { label: "Porto", value: "Porto", description: "" },
        { label: "Vila Real", value: "VilaReal", description: "" },
        { label: "Viseu", value: "Viseu", description: "" },
        { label: "Aveiro", value: "Aveiro", description: "" },
        { label: "Guarda", value: "Guarda", description: "" }
    ]

    return (
        <>
            {formTypeModal === 11 && ( //Properties
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
                        hideCloseButton= "true"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
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
                                                    <Input type="text" variant={variant} label="Name" />
                                                    <Input type="text" variant={variant} label="Fiscal Number" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            {variants.map((variant) => (
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="Email" variant={variant} label="Email" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="max-w-xs flex flex-col gap-4">
                                            {variants.map((variant) => (
                                                <div
                                                    key={variant}
                                                    className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Input type="" variant={variant} label="Phone Number" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            {variants.map((variant) => (
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant={variant} label="Address 1" />
                                                    <Input type="text" variant={variant} label="Address 2" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    label="Select country"
                                                >
                                                    <AutocompleteItem
                                                        key="Portugal"
                                                        startContent={<Avatar alt="Portugal" className="w-6 h-6" src="https://flagcdn.com/pt.svg" />}
                                                    >
                                                        Portugal
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="brazil"
                                                        startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
                                                    >
                                                        Brazil
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="switzerland"
                                                        startContent={
                                                            <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
                                                        }
                                                    >
                                                        Switzerland
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="germany"
                                                        startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
                                                    >
                                                        Germany
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="spain"
                                                        startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
                                                    >
                                                        Spain
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="france"
                                                        startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
                                                    >
                                                        France
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="italy"
                                                        startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
                                                    >
                                                        Italy
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="mexico"
                                                        startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
                                                    >
                                                        Mexico
                                                    </AutocompleteItem>
                                                </Autocomplete>
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                {variants.map((variant) => (
                                                    <div key={variant} className="w-full flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="outlined"
                                                            defaultItems={Distritos}
                                                            label="Distrito"
                                                            className="max-w-lg"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                        <Input type="text" variant={variant} label="Zip Code" />
                                                    </div>
                                                ))}</div>
                                                </div>
                                                
                                            </div>   
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}

{formTypeModal === 12 && ( //Properties
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
                        hideCloseButton= "true"
                        isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                        <div className='flex flex-row items-center mr-5'>
                                            <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
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
                                                    <Input type="text" variant={variant} label="Name" />
                                                    <Input type="text" variant={variant} label="Fiscal Number" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            {variants.map((variant) => (
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="Email" variant={variant} label="Email" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="max-w-xs flex flex-col gap-4">
                                            {variants.map((variant) => (
                                                <div
                                                    key={variant}
                                                    className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                >
                                                    <Input type="" variant={variant} label="Phone Number" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            {variants.map((variant) => (
                                                <div
                                                    key={variant}
                                                    className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                >
                                                    <Input type="text" variant={variant} label="Address 1" />
                                                    <Input type="text" variant={variant} label="Address 2" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="w-full flex flex-col gap-4">
                                            <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                <Autocomplete
                                                    label="Select country"
                                                >
                                                    <AutocompleteItem
                                                        key="Portugal"
                                                        startContent={<Avatar alt="Portugal" className="w-6 h-6" src="https://flagcdn.com/pt.svg" />}
                                                    >
                                                        Portugal
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="brazil"
                                                        startContent={<Avatar alt="Brazil" className="w-6 h-6" src="https://flagcdn.com/br.svg" />}
                                                    >
                                                        Brazil
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="switzerland"
                                                        startContent={
                                                            <Avatar alt="Switzerland" className="w-6 h-6" src="https://flagcdn.com/ch.svg" />
                                                        }
                                                    >
                                                        Switzerland
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="germany"
                                                        startContent={<Avatar alt="Germany" className="w-6 h-6" src="https://flagcdn.com/de.svg" />}
                                                    >
                                                        Germany
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="spain"
                                                        startContent={<Avatar alt="Spain" className="w-6 h-6" src="https://flagcdn.com/es.svg" />}
                                                    >
                                                        Spain
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="france"
                                                        startContent={<Avatar alt="France" className="w-6 h-6" src="https://flagcdn.com/fr.svg" />}
                                                    >
                                                        France
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="italy"
                                                        startContent={<Avatar alt="Italy" className="w-6 h-6" src="https://flagcdn.com/it.svg" />}
                                                    >
                                                        Italy
                                                    </AutocompleteItem>
                                                    <AutocompleteItem
                                                        key="mexico"
                                                        startContent={<Avatar alt="Mexico" className="w-6 h-6" src="https://flagcdn.com/mx.svg" />}
                                                    >
                                                        Mexico
                                                    </AutocompleteItem>
                                                </Autocomplete>
                                                <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                {variants.map((variant) => (
                                                    <div key={variant} className="w-full flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                                        <Autocomplete
                                                            variant="outlined"
                                                            defaultItems={Distritos}
                                                            label="Distrito"
                                                            className="max-w-lg"
                                                        >
                                                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                                        </Autocomplete>
                                                        <Input type="text" variant={variant} label="Zip Code" />
                                                    </div>
                                                ))}</div>
                                                </div>
                                                
                                            </div>   
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

export default formModals;