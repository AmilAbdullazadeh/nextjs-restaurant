import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import Cookies from 'next-cookies';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // @ts-ignore
    const cookies = new Cookies(req, res);
    cookies.re('token');

    res.status(200).json({message: 'Logged out'});
}