"use client"
import React from "react";
import { FormEvent } from "react";
import { Image, Link} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter()
    const handleSubmit = async(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      const response = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false
      })

      console.log(response)

      if (!response?.error) {
        router.push("/")
        router.refresh()
      }
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row">
          <div className="w-8/12">
            <Image src="/images/imagem-login.png" alt="management hotel" className="h-dvh"></Image>
          </div>
          <div className="flex flex-col justify-center p-40">
            <div className="">
                <Image src="/images/Logo-Login.png" alt="Logotipo" width={250} height={250} />
            </div>
            <p className="text-sm text-gray-600">E-mail</p>
            <input type="email" name="email" placeholder="Insira o seu E-Mail" className="outline-none border-b border-gray-400 px-1 py-2 font-medium"/>
            <div className="my-5">
            <p className="text-sm text-gray-600">Palavra-passe</p>
            <div className="flex flex-row items-center">
            <input type="password" name="password" placeholder="Insira a palavra-passe" className="outline-none border-b border-gray-400 px-1 py-2 font-medium"/><FaEye size={20} className="text-gray-500"/>
            </div>
            </div>
            <button type="submit" className="bg-primary-600 rounded-md h-9 text-white">Login</button>
          </div>
        </div>
      </form>
      );
}