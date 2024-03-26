"use client"
import React, { useState } from "react";
import { Modal, ScrollShadow, ModalContent, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";


const modalpropertie = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
    const variants = ["underlined"];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const toggleSecondModal = () => {
        setIsSecondModalOpen(!isSecondModalOpen);
    };


    //inserção na tabela property
    const [property, setProperty] = useState({
                Name: '',
                Email: '',
                FiscalNumber: '',
                Address1 :'',
                Country : '',
                District : '',
                ZipCode : '',
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
        if (!property.Name || !property.Email || !property.PhoneNumber || !property.FiscalNumber || !property.Address1 || !property.Country || !property.District || !property.ZipCode || !property.Abbreviation || !property.Description || !property.Designation) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/hotel/property',{
            data:{
                Name: property.Name,
                Email: property.Email, 
                FiscalNumber: property.FiscalNumber, 
                Address1 : property.Address1,
                Country : property.Country,
                District : property.District,
                ZipCode : property.ZipCode,
                PhoneNumber: property.PhoneNumber,
                Description: property.Description,
                Abbreviation: property.Abbreviation,
                Designation: property.Designation,
            }
        }) 
        .then(response => console.log(response))
        .catch(err => console.log(err))
    }   
    //final da inserção na tabela property
    
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
                                        <Button color="transparent" onPress={toggleSecondModal}><FaRegUser size={25} /></Button>
                                                <Modal
                                                    classNames={{
                                                        base: "max-h-screen",
                                                        wrapper: isExpanded
                                                            ? "w-full h-screen"
                                                            : "lg:pl-72 h-screen w-full",
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
                                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">{modalHeader}
                                                        <div className='flex flex-row items-center mr-5'>
                                                            <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                                        </div>
                                                        </ModalHeader>
                                                        <ModalBody>
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Utilizador</th>
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