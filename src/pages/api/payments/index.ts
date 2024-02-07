import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const BASE_URL = process.env.BASE_URL;
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET

interface RequestProps extends NextApiRequest {
  body: {
    currency: string
    items: {
      productId: string
      qts: number
      price: number
      total: number
    }[]
  }
}

export default async function handler(req: RequestProps, res: NextApiResponse<any>) {

  try {

    const token = await getToken({ req })

    const { items, currency } = req.body

    const user = await prisma.user.findFirst({
      where: {
        //@ts-ignore
        id: token.id
      }
    })


    if (!user) return res.status(401).json({ message: 'NOT ALLOWED' })

    const amount = items.reduce((prev, next) => prev + next.total, 0)

    const accessToken = await generateAccessToken();

    const url = `${BASE_URL}/v2/checkout/orders`;

    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
    };

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    });

    const paypalOrder = await response.json()

    const serializedOrder = items.map(item => {
      return {
        productId: item.productId,
        qts: item.qts,
      }
    })

    await prisma.order.create({
      data: {
        id: paypalOrder.id,
        total: amount,
        status: 'Pendente',
        userId: user.id,
        OrderItem: {
          createMany: {
            data: serializedOrder
          }
        }
      }
    })

    res.status(200).json(paypalOrder);

  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Erro no pagamento!' })
  }


}

export const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");

    const response = await fetch(`${BASE_URL}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};