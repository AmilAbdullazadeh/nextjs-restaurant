import type {NextApiRequest, NextApiResponse} from "next";
import {PrismaClient, PRICE} from "@prisma/client";
import validator from 'validator';
const prisma = new PrismaClient();
type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    //
    const obj={
        firstname:"hjdsd",
        email:"sddsdsd@gmail.com",
        password:"dhfffff"
    }

    const {firstname,password,email} = obj

    const validateSchema = [
        {
            valid: validator.isLength(firstname,{min:3,max:20}),
            errorMessage: "Name is invalid"
        },
        {
            valid: validator.isEmail(email),
            errorMessage: "Email is invalid"
        },
        {
            valid: validator.isLength(password,{min:3,max:20}),
            errorMessage: "password is invalid"
        },
    ]

    const valErr = validateSchema.map((item) => {
        if (!item.valid)  {
            return item.errorMessage
        }})
    const control = validateSchema.every(item => item.valid )
    const message = control ? obj : valErr


    if (req.method === "GET") {
        // @ts-ignore
        res.status(200).json(message);
        // res.status(200).json({name: "sign up is working with successfully"});
    }
}