
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const propertiesRecords = await prisma.property.findMany()

    const response = propertiesRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const { Name, Email, FiscalNumber, Address1, Address2, Country, District, ZipCode, PhoneNumber, Description, Abbreviation, Designation } = await request.json();
        const newRecord = await prisma.user.create({
            data: {
                name: Name,
                email: Email,
                FiscalNumber: FiscalNumber,
                address1 : Address1,
                address2 : Address2,
                country : Country,
                district : District,
                zipCode : ZipCode,
                phoneNumber: PhoneNumber,
                description: Description,
                abbreviation: Abbreviation,
                designation: Designation
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

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



