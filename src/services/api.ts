
const base = 'http://localhost:3000'
const productUrl = `${base}/api/v1/products`
const orderUrl = `${base}/api/v1/orders`

export type ProductProps = {
    id: string
    price: number
    imageUrl: string
    description: string
}

export async function getProducts(): Promise<ProductProps[]> {
    const response = await fetch(productUrl)
    const data = await response.json()
    return data
}

export async function getProductId(id: string): Promise<ProductProps> {
    const response = await fetch(`${productUrl}/${id}`)
    const data = await response.json()
    return data
}

export async function getUserOrders(): Promise<any[]> {
    const response = await fetch(`${orderUrl}/users`)
    const data = await response.json()
    return data
}

export async function getOrderId(id: string): Promise<any[]> {
    const response = await fetch(`${orderUrl}/${id}`)
    const data = await response.json()
    return data
}