import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request, context) {

    const { id } = context.params;

    console.log(id)

    const response = await prisma.organizations.findMany({
        where: {
            organizationID: parseInt(id)
        }
    })

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}