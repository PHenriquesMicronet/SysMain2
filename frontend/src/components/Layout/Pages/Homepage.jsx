"use client"
import react from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button } from "@nextui-org/react";


const HomePage = () => {

    return (
        <>
            <div className="flex justify-center items-center h-screen">
            <div className="grid grid-cols-3 gap-4">
                <div className="card mx-auto">
                    <Card className="w-72 h-72 aspect-w-1 aspect-h-1 flex flex-col justify-center items-center">
                            <CardHeader className="flex gap-3 items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-md">Informações de Segurança</h1>
                                    <p className="text-small text-default-500">Mantenha os métodos de verificação e as informações de segurança atualizadas.</p>
                                </div>
                                <Image
                                    alt="ícone de segurança"
                                    height={40}
                                    src="lock-icon.svg"
                                    width={40}
                                />
                            </CardHeader>
                            <CardFooter>
                                <a>ATUALIZAR INFORMAÇÕES</a>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="card mx-auto aspect-w-1 aspect-h-1">
                    <Card className="w-72 h-72 ">
                            <CardHeader className="flex gap-3 items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-md">Palavra Passe</h1>
                                    <p className="text-small text-default-500">Utilize uma palavra-passe mais segura ou altere-a se alguém tiver conhecimento da mesma.</p>
                                </div>
                                <Image
                                    alt="ícone de segurança"
                                    height={40}
                                    src="lock-icon.svg"
                                    width={40}
                                />
                            </CardHeader>
                            <CardFooter>
                                <a>Alterar Palavra-Passe</a>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="card mx-auto aspect-w-1 aspect-h-1">
                    <Card className="w-72 h-72">
                            <CardHeader className="flex gap-3 items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-md">Definições de Provacidade</h1>
                                    <p className="text-small text-default-500">Personalize as definições da sua conta e veja como os seus dados são utilizados</p>
                                </div>
                                <Image
                                    alt="ícone de segurança"
                                    height={40}
                                    src="lock-icon.svg"
                                    width={40}
                                />
                            </CardHeader>
                            <CardFooter>
                                <a>VER DEFINIÇÕES DE PRIVACIDADE</a>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="card mx-auto aspect-w-1 aspect-h-1">
                    <Card className="w-72 h-72">
                            <CardHeader className="flex gap-3 items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-md">Dispositivos</h1>
                                    <p className="text-small text-default-500">Desative um dispositivo perdido e reveja os seus dispositivos ligados</p>
                                </div>
                                <Image
                                    alt="ícone de segurança"
                                    height={40}
                                    src="lock-icon.svg"
                                    width={40}
                                />
                            </CardHeader>
                            <CardFooter>
                                <a>GERIR DISPOSITIVOS</a>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="card mx-auto aspect-w-1 aspect-h-1">
                    <Card className="w-72 h-72">
                            <CardHeader className="flex gap-3 items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-md">Organizações</h1>
                                    <p className="text-small text-default-500">AAAAAAAAAAAAAAAAAAAAAAAAAAAAA Veja todas as Organizações às quais pertence</p>
                                </div>
                                <Image
                                    alt="ícone de segurança"
                                    height={40}
                                    src="lock-icon.svg"
                                    width={40}
                                />
                            </CardHeader>
                            <CardFooter>
                                <a>GERIR ORGANIZAÇÕES</a>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="card mx-auto aspect-w-1 aspect-h-1">
                    <Card className="w-72 h-72">
                            <CardHeader className="flex gap-3 items-center justify-between">
                                <div className="flex flex-col">
                                    <h1 className="text-md">Os meus inicíos de sessão</h1>
                                    <p className="text-small text-default-500">Veja quando e onde iniciou sessão e verifique se algo parece fora do comum</p>
                                </div>
                                <Image
                                    alt="ícone de segurança"
                                    height={40}
                                    src="lock-icon.svg"
                                    width={40}
                                />
                            </CardHeader>
                            <CardFooter>
                                <a>ANALIZAR ATIVIDADE RECENTE</a>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;