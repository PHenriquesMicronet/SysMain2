
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"


export async function GET(request) {

    const propertyID = request.nextUrl.searchParams.get('property') || "";

    if (propertyID == "") {
        const response = await prisma.properties_users.findMany();

        return new NextResponse(JSON.stringify({ response, status: 200 }));
    }

    const property = await prisma.properties.findUnique({
        where: {
            propertyID: parseInt(propertyID),
        }
    });

    const organizationUsers = await prisma.users.findMany({
        where: {
            organizationID: parseInt(property.organizationID),
        },
        select: {
            userID: true,
            name: true,
            lastName: true,
            email: true
        }
    });

    const propertyUsers = await prisma.properties_users.findMany({
        where: {
            propertyID: parseInt(propertyID),
        }
    });

    const propertyUserIDs = propertyUsers.map((propertyUser) => propertyUser.userID);

    const usersNotInProperty = organizationUsers.filter(
        (user) => !propertyUserIDs.includes(user.userID)
    );

    const response = usersNotInProperty


    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}

export async function PUT(request) {

    try {
        const { data } = await request.json();
        const response = await prisma.properties_users.create({
            data: {
                propertyID: parseInt(data.propertyID),
                userID: parseInt(data.userID)
            }
        });

        return new NextResponse(JSON.stringify({ response, status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function DELETE(request, context) {

    try {
        const { data } = await request.json();

        const response = await prisma.properties_users.delete({
            where: {
                propertyID_userID: {
                    propertyID: data.propertyID,
                    userID: data.userID
                }
            }
        })

        return new NextResponse(JSON.stringify({ status: 200 }));

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}




