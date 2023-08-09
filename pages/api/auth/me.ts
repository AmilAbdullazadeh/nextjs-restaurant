import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient, User} from "@prisma/client";
import validator from 'validator';
import * as jose from 'jose';
import jwt from "jsonwebtoken";
import Cookies from 'cookie';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // @ts-ignore
    const bearerToken: string = req.headers['Authorization'];

    const token: string = bearerToken?.split(' ')[1];

    const secret = new TextEncoder().encode(process.env["JWT_SECRET_TOKEN"])

    const {payload} = await jose.jwtVerify(token, secret)

    const email = payload.email as string

    if (!email) {
        return res.status(401).json({errorMessage: "Unauthorized ( not payload )"})
    }

    // fetch db from user.email
    const user: User | null = await prisma.user.findUnique({
        where: {
            email
        },
    })

    res.status(200).json({data: user});

}