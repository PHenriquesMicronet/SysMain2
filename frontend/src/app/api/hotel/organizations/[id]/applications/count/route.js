
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"


export async function GET(request, context) {

    const { id } = context.params;

    const properties = await prisma.properties.findMany({
        where: {
            organizationID: parseInt(id)
        }
    })

    const propertiesApplications = await prisma.properties_applications.findMany({
        where: {
            propertyID: {
                in: properties.map(property => property.propertyID)
            }
        },
    })

    const applications = await prisma.applications.findMany();

    // Objeto para mapear os nomes das aplicações pelos IDs
    const applicationNames = {};
    applications.forEach(application => {
        applicationNames[application.id] = application.description;
    });

    // Iterar sobre o array propertiesApplications para calcular a contagem de registros por nome da aplicação
    const countsByName = {};
    propertiesApplications.forEach(item => {
        const { applicationID } = item;
        const applicationName = applicationNames[applicationID];
        // Se o nome da aplicação já existir no objeto countsByName, incrementar o contador, senão, inicializá-lo com 1
        countsByName[applicationName] = (countsByName[applicationName] || 0) + 1;
    });

    console.log(countsByName)

    const response = countsByName

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}