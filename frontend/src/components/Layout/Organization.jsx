"use client";
import React from "react";
import { useState, useEffect } from "react";
import {
    Input,
    Checkbox,
    Divider,
    Autocomplete, AutocompleteItem, Avatar,
} from "@nextui-org/react"
import axios from "axios";


const Contact = () => {

    const variants = ["underlined"];

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
        <><div className="flex flex-col mx-16 my-8">
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant={variant} label="Name" />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant={variant} label="Company Name" />
                        <Input type="text" variant={variant} label="Fiscal Number" />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="text" variant={variant} label="Email" />
                        <Input type="text" variant={variant} label="Phone Number" />
                    </div>
                ))}
            </div>

            <Divider className="my-8 horizontal" />

            <div className="w-full flex flex-col gap-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input variant={variant} label="Address 1" />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input variant={variant} label="Address 2" />
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
                                    label="District"
                                    className="max-w-lg"
                                >
                                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                                </Autocomplete>
                                <Input type="text" variant={variant} label="Zip Code" />
                            </div>
                        ))}</div>
                </div>
            </div>
            <div className="flex flex-row max-w-4xl mt-4">
                <Checkbox defaultSelected>Tick to configure as sub-account with client area access</Checkbox>
            </div>
            <Divider className="my-8 horizontal" />
        </div></>
    );
};

export default Contact;