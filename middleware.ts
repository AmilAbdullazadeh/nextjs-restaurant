import type {NextApiRequest, NextApiResponse} from "next";
import validator from 'validator';
import * as jose from 'jose'
import {NextRequest, NextResponse} from "next/server";

export default async function middleware(
    req: NextApiRequest,
    res: NextApiResponse
) {

    console.log('middleware test')

    // @ts-ignore
    const bearerToken: string = req.headers.get('Authorization');

    if (!bearerToken) {
        return new NextResponse(JSON.stringify({status: 200, errorMessage: "Unauthorized ( not token )"}))
    }

    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTY0NjQ0NjE3"
    const token: string = bearerToken?.split(' ')[1];

    if (!token) {
        return new NextResponse(JSON.stringify({status: 200, errorMessage: "Unauthorized ( not token )"}))
    }

    const secret = new TextEncoder().encode(process.env["JWT_SECRET_TOKEN"])

    const {payload} = await jose.jwtVerify(token, secret)

    if (!payload) {
        return new NextResponse(JSON.stringify({status: 200, errorMessage: "Unauthorized ( not token )"}))
    }

}

export const config = {
    matcher: ['/auth/api/user'],
}