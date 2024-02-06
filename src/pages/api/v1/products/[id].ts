import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestProps = NextApiRequest & {}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {
        const { id } = req.query

        if (!id) return res.status(404).json({ message: 'not found' })

        const product = await prisma.product.findFirst({
            where: {
                //@ts-ignores
                id: id
            }
        })
        res.status(200).json(product);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}