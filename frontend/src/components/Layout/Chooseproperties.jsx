import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Image, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react"
import axios from 'axios';

const ChooseOrganization = () => {
    const [isHovered1, setIsHovered1] = useState(false)
    const [properties, setProperties] = useState([])

    const { data: session, status } = useSession()

    useEffect(() => {
        const getData = async () => {
            if (status !== "loading") {
                try {
                    const userID = session.user.id;
                    const res = await axios.get('/api/hotel/users/'+userID+'/properties')
                    setProperties(res.data.response)
                } catch (error) {
                    console.error("Error fetching data:", error)
                }
            }
        };
        getData()
    }, [session])

    return (
        <>
            <p className="text-center text-3xl mt-24 antialiased">Selecione a propriedade que deseja abrir</p>
            <div className="flex justify-center items-center mt-20">
                <div className="grid grid-cols-2 gap-4">
                    {properties.map((property, index) => (
                        <a className="card-link" key={property.id}>
                            <div
                                className={`card mx-auto ${isHovered1 ? 'hover:scale-105 shadow-lg rounded-lg shadow-slate-300' : ''}`}
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                            >
                                <Card className="w-80 h-80 flex flex-col justify-center items-center">
                                    <CardHeader className="flex flex-col items-center justify-center">
                                        <Button color="transparent"className="text-large text-center mb-10"> {property.name}</Button>
                                        <Image className="w-52 h-52"
                                            src="/images/Logo-Login.png"
                                        />  
                                    </CardHeader>
                                </Card>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ChooseOrganization;
