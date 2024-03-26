
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"


/*export async function PATCH(request, context) {

    const prisma = new PrismaClient()

    try {
        const { id } = context.params;
        const { data } = await request.json();

        const updateRecord = await prisma.property.update({
            where: {
                userID: parseInt(id),
            },
            data: {
                name: data.Name,
                lastName: data.LastName,
                email: data.Email,
                fiscalNumber: data.FiscalNumber,
                phoneNumber: data.PhoneNumber,
                address1 : data.Address1,
                address2 : data.Address2,
                country : data.Country,
                district : data.District,
                zipCode : data.ZipCode,
                password: data.Password
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}*/
export async function DELETE(request, context) {

    try {
        const { id } = context.params;

        const response = await prisma.properties.delete({
            where: {
                propertyID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




