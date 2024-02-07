
import prisma from "@/lib/prisma"
import { NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"


export default async function handler(req: any, res: NextApiResponse) {
    const { method } = req

    if (method === 'GET') {

        const token = await getToken({ req })

        const orders = await prisma.order.findMany({
            where: {
                //@ts-ignore
                userId: token.id
            },
            include: {
                user: true
            }
        })

        return res.status(200).json(orders)

    } else {
        res.status(400).json(`Ocorreu um erro`)
    }
}
