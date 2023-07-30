import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient, PRICE, User} from "@prisma/client";
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import jwt from "jsonwebtoken";
import Cookies from 'next-cookies';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {



    const {
        password = 'Test123@',
        email = 'test1@gmail.com'
    } = req.body

    const errors: string[] = []

    const validateSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid"
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password is invalid"
        },
    ]

    validateSchema.forEach(item => {
        if (!item.valid) {
            errors.push(item.errorMessage)
        }
    })

    if (errors.length) {
        return res.status(400).json({errorMessage: errors[0]});
    }

    const userData = await prisma.user.findUnique({
        // @ts-ignore
        where: {
            email
        },
    })

    if (!userData) {
        return res.status(400).json({errorMessage: "User date not found"});
    }

    const isMatch: boolean = await bcrypt.compare(password, userData.password)

    if (!isMatch) {
        return res.status(400).json({errorMessage: "Password is incorrect"});
    }

    // @ts-ignore
    const token = jwt.sign({ email: userData.email }, 'secret', { expiresIn: '1h' });

    // @ts-ignore
    const cookies = new Cookies(req, res);
    cookies.set('token', token, {
        httpOnly: true,
        sameSite: 'lax', // CSRF protection
        secure: process.env.NODE_ENV === 'production', // Only send cookies over HTTPS in production
        maxAge: 60 * 60, // Expires after 1 hour
        path: '/',
    });

    res.status(200).json({data: userData});

    if (req.method === "GET") {
    }
}