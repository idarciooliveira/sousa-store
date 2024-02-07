import prisma from "@/lib/prisma"
import { NextApiResponse } from "next"


export default async function handler(req: any, res: NextApiResponse) {
    const { query: { id }, method } = req

    if (method === 'GET') {


        const order = await prisma.order.findFirst({
            where: {
                id: id
            },
            include: {
                OrderItem: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        })

        return res.status(200).json(order)

    } else {
        res.status(400).json(`Ocorreu um erro`)
    }
}
