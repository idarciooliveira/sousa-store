import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestProps = NextApiRequest & {
    email: string
    password: string
    name: string
    phoneNumber: string
    isAdmin?: boolean
}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {

        const user = await prisma.user.create({
            data: req.body
        })

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}