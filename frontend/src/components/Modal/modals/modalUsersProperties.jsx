"use client"
import React, { useState, useEffect } from "react";
import { Modal, ScrollShadow, ModalContent, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Checkbox,} from "@nextui-org/react";
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
    const [usersFetched, setUsersFetched] = useState(false);
    const [usersproperties, setUsersProperties] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const getData = async () => {
            if (!usersFetched){
                setIsLoading(true);
                try {
                    const response = await axios.get(`/api/hotel/properties-users?user=`+ idUser);
                    setUsersProperties(response.data.response);
                    console.log("aaaaa" + response.data.response)
                    setUsersFetched(true);
                } catch (error) {
                    console.error("Erro ao encontrar os utilizadores não associadas à propriedade:", error.message);
            }finally {
                setIsLoading(false);
            }
        };
        }
        getData();
    }, []);


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
                                                                PROPERTY ID
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                NAME
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                ADD
                                                            </TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                        {usersproperties.map((usersproperties, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{usersproperties.propertyID}</TableCell>
                                                                <TableCell>{usersproperties.name}</TableCell>
                                                                <TableCell><Checkbox/></TableCell>
                                                            </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </div>
                                            )}
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