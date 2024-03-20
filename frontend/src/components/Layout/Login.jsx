import React from "react";
import { useState } from "react";
import {
    Input,
    Divider,
    Autocomplete,
    AutocompleteItem,
    Avatar,
    Button,
    Image,
    Link,
} from "@nextui-org/react";

const Contact = () => {
    const variants = ["bordered"];

    const Distritos = [
        { label: "Viana do Castelo", value: "VianadoCastelo", description: "" },
        { label: "Braga", value: "Braga", description: "" },
        { label: "Porto", value: "Porto", description: "" },
        { label: "Vila Real", value: "VilaReal", description: "" },
        { label: "Viseu", value: "Viseu", description: "" },
        { label: "Aveiro", value: "Aveiro", description: "" },
        { label: "Guarda", value: "Guarda", description: "" }
    ];

    return (
        <div style={{ backgroundColor: "#f7f7f7", maxWidth: "900px", height: "50vh", borderRadius: "20px", overflow: "hidden", marginTop: "190px", boxShadow:"0px 0px 10px rgba(2, 2, 2, 0.3)"}} className="container mx-auto flex flex-row justify-center items-center">
            <div className="w-1/2 p-4">
                <div className="max-w-lg mx-auto px-4 py-8">
                    <div className="flex flex-col gap-2 mb-4">
                    <p style={{fontWeight: "bold", fontSize: "25px", textAlign:"center", marginBottom:"20px"}}>Sign In</p>
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-full flex-wrap gap-2">
                                <div className="flex-1">
                                    <Input type="First Name" variant={variant} label="First Name" size="sm" />
                                </div>
                                <div className="flex-1">
                                    <Input type="Last Name" variant={variant} label="Last Name" size="sm" />
                                </div>
                            </div>
                    ))}
                </div>
            <div className="flex flex-col gap-2 mb-4">
                {variants.map((variant) => (
                    <div key={variant} className="flex w-full flex-wrap gap-2">
                        <Input type="Password" variant={variant} label="Password" size="sm" />
                    </div>
                ))}
            </div>

            <Divider className="my-4 horizontal" />
                    
            
            <div className="flex gap-4 items-center">  
                <Button size="lg" color="primary">
                    Login
                </Button>   
            </div>
            
        </div>
    </div>
    <Divider  orientation="vertical"/>
    <div className="w-1/2 mt-4 text-center">
                <Image src="/images/Logo-Login.png" width={500} height={300} alt="Your Image" />
                <p>If you don´t have an account? <Link href="#"> Try this! </Link>
</p>
            </div>
</div>
    );
};

export default Contact