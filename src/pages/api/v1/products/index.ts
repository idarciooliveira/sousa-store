import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}