
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function GET(request) {

    const prisma = new PrismaClient()

    const rolesRecords = await prisma.roles.findMany()

    const response = rolesRecords

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const {data} = await request.json();
        const newRecord = await prisma.roles.create({
            data: {
                name: data.Name,
                description: data.Description,
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


export async function PATCH(request) {

    const prisma = new PrismaClient()

    try {
        const { ProfileID, Name, Description } = await request.json();
        const updateRecord = await prisma.profile.update({
            where: {
                profileID: ProfileID,
            },
            data: {
                name:Name,
                description: Description,
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




