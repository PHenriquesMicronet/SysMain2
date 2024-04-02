"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
    Input,
    Checkbox,
    Divider,
    Autocomplete, AutocompleteItem, Avatar, Button
} from "@nextui-org/react"
import axios from "axios";

//icons
import { TfiSave } from "react-icons/tfi";
import { LiaExpandSolid } from "react-icons/lia";
import { MdClose } from "react-icons/md";

const Contact = () => {

    const variants = ["underlined"];
    const [isExpanded, setIsExpanded] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [page, setPage] = React.useState(1);
    const [searchValue, setSearchValue] = React.useState("");
    const [rowsPerPage, setRowsPerPage] = React.useState(15);


    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    const handleInput = (event) => {
        setUser({ ...organizations, [event.target.name]: event.target.value })
    }
    const filteredItems = React.useMemo(() => {
        return organizations.filter((organizations) =>
        organizations.name.toLowerCase().includes(
                searchValue.toLowerCase()
            ) ||
            organizations.organizationID.toString().toLowerCase().includes(
                searchValue.toLowerCase()
            )
        );
    }, [organizations, searchValue]);


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("/api/hotel/organizations");
            setOrganizations(res.data.response);
        };
        getData();
    }, []);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    return (
        <>
            <div className='flex flex-row items-center mr-5'>
                <Button color="transparent" type="submit"><TfiSave size={25} /></Button>
                <Button color="transparent" onClick={toggleExpand}><LiaExpandSolid size={30} /></Button>
                <Button color="transparent" variant="light"><MdClose size={30} /></Button>
            </div>
            {items.map((organizations, index) => (
                <div key={index} className="flex flex-col mx-16 my-8">
                    <div className="w-full flex flex-col gap-4 my-4">
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-1/2 flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input type="text" variant={variant} label="Name" value={organizations.name}/> 
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col gap-4 my-4">
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input type="text" variant={variant} label="Company Name" value={organizations.name}/>
                                <Input type="text" variant={variant} label="Fiscal Number" value={organizations.fiscalNumber}/>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col gap-4 my-4">
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input type="text" variant={variant} label="Email" value={organizations.email}/>
                                <Input type="text" variant={variant} label="Phone Number" value={organizations.phoneNumber}/>
                            </div>
                        ))}
                    </div>

                    <Divider className="my-8 horizontal" />

                    <div className="w-full flex flex-col gap-4">
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input variant={variant} label="Address 1" value={organizations.address1}/>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col gap-4 my-4">
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                                <Input variant={variant} label="Address 2" value={organizations.address2}/>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex flex-col gap-4">
                        {variants.map((variant) => (
                            <div
                                key={variant}
                                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                            >
                                <Input type="text" name="Country" onChange={handleInput} variant={variant} label="Country" value={organizations.country}/>
                                <Input type="text" name="District" onChange={handleInput} variant={variant} label="District" value={organizations.district}/>
                                <Input type="number" name="ZipCode" onChange={handleInput} variant={variant} label="zipCode" value={organizations.zipCode}/>
                            </div>
                        ))}
                    </div>
                    <Divider className="my-8 horizontal" />
                </div>
            ))}
        </>
    );
};

export default Contact;