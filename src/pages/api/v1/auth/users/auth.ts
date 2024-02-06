import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcryptjs'

type RequestProps = NextApiRequest & {
    email: string
    password: string
}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {

        const { password, email } = req.body

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user) return res.status(400).json({ message: 'Credenciais Invalidas' })

        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Credenciais Invalidas' })
        }


        return res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    } catch (error) {
        res.status(400).json({ message: error })
    }
}