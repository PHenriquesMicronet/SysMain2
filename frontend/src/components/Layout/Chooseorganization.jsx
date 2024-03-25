import React, { useState } from 'react';
import { Card, CardHeader, Image } from "@nextui-org/react";

const ChooseOrganization = () => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);

    return (
        <>
         <p className="text-center text-3xl mt-24 antialiased text-emerald-500">Selecione a organização na qual quer trabalhar</p>
            <div className="flex justify-center items-center mt-20">
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className={`card mx-auto ${isHovered1 ? 'hover:scale-105 shadow-lg rounded-lg shadow-slate-300' : ''}`}
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}
                    >
                        <Card className="w-80 h-80 flex flex-col justify-center items-center">
                            <CardHeader className="flex flex-col items-center justify-center">
                                <p className="text-large text-center mb-10">Organização 1</p>
                                <Image className="w-52 h-52"
                                    src="/images/Logo-Login.png"
                                />
                            </CardHeader>
                        </Card>
                    </div>
                    <div
                        className={`card mx-auto ${isHovered2 ? 'hover:scale-105 shadow-lg rounded-lg shadow-slate-300' : ''}`}
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}
                    >
                        <Card className="w-80 h-80 flex flex-col justify-center items-center">
                            <CardHeader className="flex flex-col items-center justify-center">
                                <p className="text-large text-center mb-10">Organização 2</p>
                                <Image className="w-52 h-52"
                                    src="/images/Logo-Login.png"
                                />
                            </CardHeader>
                        </Card>
                    </div>
                    <div
                        className={`card mx-auto ${isHovered3 ? 'hover:scale-105 shadow-lg rounded-lg shadow-slate-300' : ''}`}
                        onMouseEnter={() => setIsHovered3(true)}
                        onMouseLeave={() => setIsHovered3(false)}
                    >
                        <Card className="w-80 h-80 flex flex-col justify-center items-center">
                            <CardHeader className="flex flex-col items-center justify-center">
                                <p className="text-large text-center mb-10">Organização 3</p>
                                <Image className="w-52 h-52"
                                    src="/images/Logo-Login.png"
                                />
                            </CardHeader>
                        </Card>
                    </div>
                    <div
                        className={`card mx-auto ${isHovered4 ? 'hover:scale-105 shadow-lg rounded-lg shadow-slate-300' : ''}`}
                        onMouseEnter={() => setIsHovered4(true)}
                        onMouseLeave={() => setIsHovered4(false)}
                    >
                        <Card className="w-80 h-80 flex flex-col justify-center items-center">
                            <CardHeader className="flex flex-col items-center justify-center">
                                <p className="text-large text-center mb-10">Organização 4</p>
                                <Image className="w-52 h-52"
                                    src="/images/Logo-Login.png"
                                />
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChooseOrganization;