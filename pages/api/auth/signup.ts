import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient, PRICE, User} from "@prisma/client";
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {
        firstName = "test",
        lastName = 'test555',
        phone = '+994550000000',
        city = 'Toronto',
        password = 'Test123@',
        email = 'test2@gmail.com'
    } = req.body

    const errors: string[] = []


    const validateSchema = [
        {
            valid: validator.isLength(firstName, {min: 3, max: 20}),
            errorMessage: "Name is invalid"
        },

        {
            valid: validator.isLength(lastName, {min: 5, max: 25}),
            errorMessage: "Sirname is invalid"
        },
        {
            valid: validator.isLength(city, {min: 3, max: 20}),
            errorMessage: "City is invalid"
        },
        {
            valid: validator.isMobilePhone(phone, "az-AZ"),
            errorMessage: "Phone is invalid"
        },
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

    const isUserExist = await prisma.user.findUnique({
        // @ts-ignore
        where: {
            email
        },
    })

    if (isUserExist) {
        return res.status(400).json({errorMessage: "User already exist"});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            password: hashedPassword,
            email,
            city,
            phone
        }
    });

    const secret = new TextEncoder().encode(process.env["JWT_SECRET_TOKEN"])
    const alg = 'HS256'

    const sign = await new jose.SignJWT({email: user.email})
        .setProtectedHeader({alg})
        .setExpirationTime('24h')
        .sign(secret)

    res.status(200).json({data: sign});

    if (req.method === "GET") {
    }
}