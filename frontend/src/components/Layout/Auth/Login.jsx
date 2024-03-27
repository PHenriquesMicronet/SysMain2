"use client"
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
import { FaEye } from "react-icons/fa";

const Contact = () => {
    const variants = ["underlined"];

    return (
        <div className="flex flex-row">
          <div className="w-8/12">
            <Image src="/images/imagem-login.png" alt="management hotel" className="h-dvh"></Image>
          </div>
          <div className="flex flex-col justify-center p-40">
            <div className="">
                <Image src="/images/Logo-Login.png" alt="Logotipo" width={250} height={250} />
            </div>
            <p className="text-sm text-gray-600">E-mail</p>
            <input type="text" placeholder="Insira o seu E-Mail" className="outline-none border-b border-gray-400 px-1 py-2 font-medium"/>
            <div className="my-5">
            <p className="text-sm text-gray-600">Palavra-passe</p>
            <div className="flex flex-row items-center">
            <input type="text" placeholder="Insira a palavra-passe" className="outline-none border-b border-gray-400 px-1 py-2 font-medium"/><FaEye size={20} className="text-gray-500"/>
            </div>
            </div>
            <button className="bg-primary-600 rounded-md h-9 text-white"><Link href="/Properties">Login</Link></button>
          </div>
        </div>
      );
};

export default Contact;