import { useSession } from "next-auth/react"

const url = 'http://localhost:3000/api/v1/products'

export type ProductProps = {
    id: string
    price: number
    imageUrl: string
    description: string
}

export async function getProducts(): Promise<ProductProps[]> {
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export async function getProductId(id: string): Promise<ProductProps> {
    const response = await fetch(`${url}/${id}`)
    const data = await response.json()
    return data
}