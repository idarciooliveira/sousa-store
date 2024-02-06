import type { NextApiRequest, NextApiResponse } from "next";
import { generateAccessToken } from "..";

const BASE_URL = process.env.BASE_URL;

type RequestProps = NextApiRequest & {
    amount: number
    currency: string
}

export default async function handler(req: RequestProps, res: NextApiResponse) {
    const { query: { orderID }, method } = req

    if (method === 'POST') {

        const accessToken = await generateAccessToken();
        const url = `${BASE_URL}/v2/checkout/orders/${orderID}/capture`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json()
        return res.status(200).json(data)

    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Método ${method} não permitido`)
    }
}
