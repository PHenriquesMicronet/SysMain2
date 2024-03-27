
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma"


export async function GET(request, context) {

    const { id } = context.params;

    // const propertiesApplications = await prisma.properties_applications.findMany({
    //     where: {
    //         propertyID: parseInt(id)
    //     },
    // })

    // const usersPropertiesApplications = await prisma.users_properties_applications.findMany({
    //     where: {
    //         propertyApplicationID: {
    //             in: propertiesApplications.map(propertyApplication => propertyApplication.propertyApplicationID)
    //         }
    //     },
    // })

    // const users = await prisma.users.findMany({
    //     where: {
    //         userID: {
    //             in: usersPropertiesApplications.map(userPropertyApplication => userPropertyApplication.userID)
    //         }
    //     },
    // })

    const users = await prisma.users.findMany({
        where: {
            users_properties_applications: {
                some: {
                    properties_applications: {
                        propertyID: parseInt(id)
                    }
                }
            }
        },
        include: {
            users_properties_applications: {
                include: {
                    properties_applications: true
                }
            }
        },
        distinct: ["userID"]
    })

    const response = await Promise.all(users.map(async (user) => {
        const userData = {
            id: user.userID,
            name: user.name,
            surname: user.lastName,
            email: user.email,
            role: ''
        };

        const role = await prisma.roles.findUnique({
            where: {
                roleID: user.roleID
            }
        });

        if (role) {
            userData.role = role.name;
        }

        return userData;
    }));

    if (!response) {
        return new NextResponse(JSON.stringify({ status: 404 }));
    }

    prisma.$disconnect()

    return new NextResponse(JSON.stringify({ response, status: 200 }));
}