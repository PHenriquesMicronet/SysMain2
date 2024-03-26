"use client"
import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from "@nextui-org/react";
import axios from 'axios';

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";


const modelprofile = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //inserção na tabela profile
    const [profile, setProfile] = useState({
        Name:'', 
        Description:'',
    })

    const handleInput = (event) => {
        setProfile({ ...profile, [event.target.name]: event.target.value })
    }
    function handleSubmit(event) {
        event.preventDefault()
        if (!profile.Name || !profile.Description ) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/hotel/profile',{
            data:{
                Name: profile.Name,
                Description: profile.Description
            }
        }) 
            .then(response => console.log(response))
            .catch(err => console.log(err))
            console.log(profile.Name)
    }

    //final da inserção na tabela profile

    return (
        <>
            {formTypeModal === 10 && ( //profile
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
                                            <Button color="transparent" type="submit" onPress={onClose}><TfiSave size={25} /></Button>
                                            <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                            <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                        </div>
                                    </ModalHeader>
                                    <ModalBody className="flex flex-col mx-10 my-5 space-y-8">
                                        <div className="w-full flex flex-col gap-16 max-w-xl">
                                            <Input type="text" name="Name" onChange={handleInput} variant="underlined" label="Name" />
                                            <Input type="text" name="Description" onChange={handleInput}  variant="underlined" label="Description" />
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

export default modelprofile;