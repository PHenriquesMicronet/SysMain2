import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request) {

    const response = await prisma.organizations.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const response = await prisma.organizations.create({
            data: {
                name: data.name,
                fiscalNumber: data.fiscalNumber,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address1: data.address1,
                address2: data.address2,
                country: data.country,
                district: data.district,
                zipCode: data.zipCode
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}