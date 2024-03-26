
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
import organization from "@/app/homepage/organization/page";

export async function GET(request) {

    const prisma = new PrismaClient()

    const usersRecords = await prisma.users.findMany()

    const response = usersRecords

    prisma.$disconnect()
    
    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {
    const prisma = new PrismaClient();

    try {
        const { data } = await request.json();
        const newRecord = await prisma.users.create({
            data: {
                name: data.Name,
                lastName: data.LastName,
                email: data.Email,
                fiscalNumber: parseInt(data.FiscalNumber),
                phoneNumber: parseInt(data.PhoneNumber),
                address1 : data.Address1,
                address2 : data.Address2,
                country : data.Country,
                district : data.District,
                zipCode : data.ZipCode,
                password: data.Password,
                roleID: parseInt(data.RoleID),
                organizationID: parseInt(data.OrganizationID)
            }
        });

        return new NextResponse(JSON.stringify({newRecord, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




