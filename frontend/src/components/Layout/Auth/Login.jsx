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
    AvatarIcon,
    Checkbox,
} from "@nextui-org/react";

const Contact = () => {
    const variants = ["underlined"];

    return (
        <div style={{maxWidth: "900px", height: "50vh", borderRadius: "20px", overflow: "hidden", marginTop: "190px", boxShadow: "0px 0px 10px rgba(2, 2, 2, 0.5)" }} className="container mx-auto flex flex-row justify-center items-center">
            <div className="w-3/5 p-4" >
                <div className="max-w-lg mx-auto px-4 py-8">
                    <div className="flex flex-col gap-2 mb-4 flex gap-3 items-center">
                        <div className="flex flex-col gap-2 mb-10">
                            <p style={{ fontWeight: "bold", fontSize: "25px", textAlign: "center", marginBottom: "10px", color: "#11b175" }}>Sign In To account</p>
                            <hr style={{ height: "6px", backgroundColor: "#11b175", border: "none", width: "60px", marginLeft: "auto", marginRight: "auto", borderRadius: "3px" }}></hr>
                        </div>
                        {variants.map((variant) => (
                            <div key={variant} className="flex w-full flex-wrap gap-2">
                                <div className="flex-auto">
                                    <Input type="Email" variant={variant} label="Email" size="sm" />
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


                    <div className="flex items-center mt-4">
                        <Checkbox defaultSelected radius="none" size="sm" className="mr-14">Remember Me</Checkbox>
                        <p className="text-sm ml-20 text-gray-500">Forgot your password?</p>
                    </div>

                    <div className="flex gap-4 items-center justify-center mt-10">
                        <Button size="lg" color="primary" variant="bordered" >
                            Sign In
                        </Button>
                    </div>

                </div>
            </div>
            <Divider orientation="vertical" />
            <div className="w-2/5 text-center bg-emerald-500 text-white p-8 rounded-none h-full">
                <p className="text-2xl font-bold mt-24">Hello Friend!</p>
                <hr style={{ height: "6px", backgroundColor: "#f1f1f1", border: "none", width: "60px", marginLeft: "auto", marginRight: "auto", borderRadius: "3px", marginBottom:"50px", marginTop:"20px"}}></hr>
                <p>Fill up your personal information and start journey with us.</p>
                <Button size="lg" color="primary" variant="solid" radius="md" className="mt-8">
                            Sign In
                        </Button>
            </div>
        </div>
    );
};

export default Contact