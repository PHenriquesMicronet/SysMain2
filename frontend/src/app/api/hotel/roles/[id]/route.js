import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@prisma/client";

export async function DELETE(request, context) {

    const prisma = new PrismaClient()

    try {
        const { id } = context.params;

        console.log(id)

        const deleteRecord = await prisma.roles.delete({
            where: {
                roleID: parseInt(id),
            }
        })
        return new NextResponse(JSON.stringify({status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }

}