"use client"
import React, { useState, useEffect } from "react";
import { Modal, ScrollShadow, ModalContent, ModalHeader, ModalBody, Avatar, ModalFooter, Button, useDisclosure, Input, Autocomplete, AutocompleteItem, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Checkbox, } from "@nextui-org/react";
import { AiOutlineGlobal } from "react-icons/ai";
import axios from 'axios';

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";

import {useTranslations} from 'next-intl';




const modalpropertiesusers = ({
    buttonName,
    buttonIcon,
    modalHeader,
    formTypeModal,
    buttonColor,
    modalEditArrow,
    propertyID
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [dataUserFetched, setDataUserFetched] = useState(false);
    const [usersProperties, setUsersProperties] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const t = useTranslations('Index');

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        const getUsersData = async () => {
            if (!dataUserFetched){
                setIsLoading(true);
                try {
                    console.log(propertyID)
                    const response = await axios.get(`/api/hotel/properties-users?property=`+ propertyID);
                    setUsersProperties(response.data.response);
                    setDataUserFetched(true);
                } catch (error) {
                    console.error("Erro ao encontrar os utilizadores não associadas à propriedade:", error.message);
            }finally {
                setIsLoading(false);
            }
        };
        }
        getUsersData();
    }, []);

    const [selectedUsersProperties, setSelectedUsersProperties] = useState([]);

    const handleCheckboxChange = (userID) => {
        setSelectedUsersProperties(prevState =>
            prevState.includes(userID)
                ? prevState.filter(id => id !== userID)
                : [...prevState, userID]
        );
    };

    const handleSave = async () => {
        try {
            const dataToSave = selectedUsersProperties.map(userID => ({
                propertyID,
                userID : userID
            }));
            const response = await axios.put(`/api/hotel/properties-users`, {
                dataToSave
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            {formTypeModal === 10 && (
                <>
                    <Button onPress={onOpen} color={buttonColor} className="bg-gray-300 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">
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
                        isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"transparent"} isDismissable={false} isKeyboardDismissDisabled={true}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <form>
                                        <ModalHeader className="flex flex-row justify-between items-center gap-1 bg-primary-600 text-white">
                                        <div className="flex flex-row justify-start gap-4">
                                            {modalHeader}{modalEditArrow} {propertyID}
                                            </div>
                                            <div className='flex flex-row items-center mr-5'>
                                                <Button color="transparent" onPress={handleSave} type="submit"><TfiSave size={25} /></Button>
                                                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                                                <Button color="transparent" variant="light" onPress={onClose}><MdClose size={30} /></Button>
                                            </div>
                                        </ModalHeader>
                                        <ModalBody className="flex flex-col mx-5 my-5 space-y-8">
                                        {isLoading ? (<p>{t("general.loadingStatus")}</p>
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
                                                                {t("organization.properties.users.datatable.id")}
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                {t("organization.properties.users.datatable.name")}
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                {t("organization.properties.users.datatable.lastName")}
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                {t("organization.properties.users.datatable.email")}
                                                            </TableColumn>
                                                            <TableColumn className="bg-primary-600 text-white font-bold">
                                                                {t("organization.properties.users.datatable.add")}
                                                            </TableColumn>
                                                        </TableHeader>
                                                        <TableBody>
                                                        {usersProperties.map((propertiesUsers) => (
                                                            <TableRow key={propertiesUsers.userID}>
                                                                <TableCell>{propertiesUsers.userID}</TableCell>
                                                                <TableCell>{propertiesUsers.name}</TableCell>
                                                                <TableCell>{propertiesUsers.lastName}</TableCell>
                                                                <TableCell>{propertiesUsers.email}</TableCell>
                                                                <TableCell>
                                                                    <Checkbox
                                                                        checked={selectedUsersProperties.includes(propertiesUsers.userID)}
                                                                        onChange={() => handleCheckboxChange(propertiesUsers.userID)}
                                                                    />
                                                                </TableCell>
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

export default modalpropertiesusers;