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


const modeluser = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const variants = ["underlined"];
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleSecondModal = () => {
        setIsSecondModalOpen(!isSecondModalOpen);
    };




    //inserção na tabela user
    const [user, setUser] = useState({
        Name: '',
        LastName: '',
        Email: '',
        FiscalNumber: '',
        PhoneNumber: '',
        Address1: '',
        Address2: '',
        Country: '',
        District: '',
        ZipCode: '',
        Password: '',
    })

    const handleInput = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        if (!user.Name || !user.LastName || !user.Email || !user.FiscalNumber || !user.PhoneNumber || !user.Address1 || !user.Address2 || !user.Country || !user.District || !user.ZipCode || !user.Password || !user.OrganizationID || !user.RoleID) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/hotel/users', {
            data: {
                Name: user.Name,
                LastName: user.LastName,
                Email: user.Email,
                FiscalNumber: user.FiscalNumber,
                PhoneNumber: user.PhoneNumber,
                Address1: user.Address1,
                Address2: user.Address2,
                Country: user.Country,
                District: user.Country,
                ZipCode: user.ZipCode,
                Password: user.Password,
                OrganizationID: user.OrganizationID,
                RoleID: user.RoleID
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //final da inserção na tabela user


    return (
        <>
            {formTypeModal === 10 && ( //Users
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
                                                                        <th>Perfil</th>
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
                                                        <Input type="text" name="LastName" onChange={handleInput} variant={variant} label="Last Name" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-full flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" name="Email" onChange={handleInput} variant={variant} label="Email" />
                                                        <Input type="text" name="FiscalNumber" onChange={handleInput} variant={variant} label="Fiscal Number" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="max-w-xs flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex max-w-xs flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 "
                                                    >
                                                        <Input type="text" name="PhoneNumber" onChange={handleInput} variant={variant} label="Phone Number" />
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
                                                        <Input type="text" name="Address2" onChange={handleInput} variant={variant} label="Address 2" />
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
                                                        <Input type="text" name="ZipCode" onChange={handleInput} variant={variant} label="zipCode" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="w-1/2 flex flex-col gap-4">
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-1/2flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="password" name="Password" onChange={handleInput} variant={variant} label="Password" />
                                                        <Input type="number" name="OrganizationID" onChange={handleInput} variant={variant} label="Organiztion ID" />
                                                        <Input type="number" name="RoleID" onChange={handleInput} variant={variant} label="Role ID" />
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
        </>
    );
};

export default modeluser;