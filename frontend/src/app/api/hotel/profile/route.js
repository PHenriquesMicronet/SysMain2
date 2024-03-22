
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const profileRecords = await prisma.profile.findMany()

    const response = profileRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const { Name, Description} = await request.json();
        const newRecord = await prisma.profile.create({
            data: {
                name: Name,
                description: Description,
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



