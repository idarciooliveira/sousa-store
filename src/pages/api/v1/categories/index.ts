import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestProps = NextApiRequest & {}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {
    try {

        const categories = await prisma.category.findMany()
        res.status(200).json(categories);

    } catch (error) {
        res.status(400).json({ message: error })
    }
}