import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from "@nextui-org/react";
import { MdClose } from "react-icons/md";
import { LiaExpandSolid } from "react-icons/lia";

const ModalConnectionString = ({ buttonName, buttonIcon, modalHeader, formTypeModal, buttonColor, idOrganization, idApplication }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [connection, setConnection] = useState([]);
    const [ConnectionStringFetched, setConnectionStringFetched] = useState(false);
    const variants = ["underlined"];

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleConnectionModal = async () => {
        setIsModalOpen(!isModalOpen);
        if (!ConnectionStringFetched) {
            setIsLoading(true);
            try {
                const res = await axios.get(`/api/hotel/organizations/` + idOrganization + `/applications/` + idApplication);
                setConnection(res.data.response[0].connectionString);
                setConnectionStringFetched(true);
            } catch (error) {
                console.error("Erro ao encontrar as aplicação da organização:", error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            {formTypeModal === 1 && (
                <>
                    <Button onPress={toggleConnectionModal} color={buttonColor} className="w-fit">
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
                        onOpenChange={toggleConnectionModal}
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
                                                {variants.map((variant) => (
                                                    <div
                                                        key={variant}
                                                        className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                                                    >
                                                        <Input type="text" variant={variant} value={connection} label="Connection String" />
                                                    </div>
                                                ))}
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

export default ModalConnectionString;