
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"


export async function GET(request) {

    try {
        const organizationID = request.nextUrl.searchParams.get('organization') || "";

        if (organizationID == "") {
            const response = await prisma.properties.findMany()
            return new NextResponse(JSON.stringify({ response, status: 200 }));
        }

        const response = await prisma.properties.findMany({
            where: {
                organizationID: parseInt(organizationID)
            }
        })

        return new NextResponse(JSON.stringify({ response, status: 200 }));
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const response = await prisma.properties.create({
            data: {
                name: data.Name,
                email: data.Email,
                fiscalNumber: parseInt(data.FiscalNumber),
                address1: data.Address1,
                country: data.Country,
                district: data.District,
                zipCode: data.ZipCode,
                phoneNumber: data.PhoneNumber,
                description: data.Description,
                abbreviation: data.Abbreviation,
                designation: data.Designation,
                organizationID: parseInt(data.OrganizationID)
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

/*
export async function PATCH(request) {

    const prisma = new PrismaClient()

    try {
        const { idCarateristics, Description, Abreviature, Details } = await request.json();
        const updateRecord = await prisma.characteristics.update({
            where: {
                characteristicID: idCarateristics,
            },
            data: {
                description: Description,
                abreviature: Abreviature,
                details: Details
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
*/



