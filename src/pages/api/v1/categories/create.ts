import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestProps = NextApiRequest & {
    description: string
}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {

        const categorias = await prisma.category.create({
            data: req.body
        })
        res.status(200).json(categorias);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}