"use client";
import React from "react";
import { useState } from "react";
import {
    Input,
    Checkbox,
    Divider,
    Autocomplete, AutocompleteItem, Avatar,
} from "@nextui-org/react"


const Details = () => {

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
    const Payment =[
        {label: "Use Default (Set Per Order)", value:"payments", description:""}
    ]
    const Billing =[
        {label: "Use Default Contact (Details Above)", value:"billings", description:""}
    ]

    return (
        <><div className="flex flex-col mx-16 my-8">
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="First Name" variant={variant} label="First Name" />
                        <Input type="Last Name" variant={variant} label="Last Name" />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="Company Name" variant={variant} label="Company Name" />
                        <Input type="Fiscal Number" variant={variant} label="Fiscal Number" />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="Email Adress" variant={variant} label="Email Adress" />
                        <Input type="Phone Number" variant={variant} label="Phone Number" />
                    </div>
                ))}
            </div>

            <Divider className="my-8 horizontal" />

            <div className="w-full flex flex-col gap-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="Adress 1" variant={variant} label="Adress 1" />
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="Adress 2" variant={variant} label="Adress 2" />
                    </div>
                ))}
            </div>
            <div className="w-full">
                <div className="max-w-2xl flex flex-row gap-4 my-4 mr-8">
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
                    {variants.map((variant) => (
                        <div key={variant} className=" max-w-xl flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                            <Autocomplete
                                variant="outlined"
                                defaultItems={Distritos}
                                label="Distrito"
                                className="max-w-lg"
                            >
                                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                            </Autocomplete>
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Input type="City" variant={variant} label="City" />
                        <Input type="Zip Code" variant={variant} label="Zip Code" />
                    </div>
                ))}
            </div>

            <Divider className="my-8 horizontal" />

            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Autocomplete
                            variant="outlined"
                            defaultItems={Payment}
                            label="Payment Method"
                            className="max-w-lg"
                        >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                ))}
            </div>
            <div className="w-full flex flex-col gap-4 my-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                        <Autocomplete
                            variant="outlined"
                            defaultItems={Billing}
                            label="Default Billing Contact"
                            className="max-w-lg"
                        >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                ))}
            </div>
            <div className="flex flex-row max-w-4xl mt-4">
            <p className="mr-8 font-bold">Factura Electronica Opt-Out</p><Checkbox defaultSelected>Não pretendo aderir a faturação eletrónica</Checkbox>
            </div>
            <div className="flex flex-row max-w-4xl mt-4">
            <p className="mr-8 font-bold">Informações Promocionais</p><Checkbox defaultSelected>Yes, I agree to receive information about promotional offers ...</Checkbox>
            </div>
        </div></>
    );
};

export default Details;