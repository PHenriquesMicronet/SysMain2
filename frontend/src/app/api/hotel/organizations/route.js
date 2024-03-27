import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"

export async function GET(request) {

    const response = await prisma.organizations.findMany()

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}