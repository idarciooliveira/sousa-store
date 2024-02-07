
const base = process.env.NEXT_PUBLIC_API
const productUrl = `${base}/api/v1/products`
const orderUrl = `${base}/api/v1/orders`
const userUrl = `${base}/api/v1/auth/users`


export type UserProps = {
    name: string
    phoneNumber: string
    email: string
    password: string
}

export async function createUser(props: UserProps): Promise<UserProps[]> {
    const response = await fetch(`${userUrl}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(props)
    })
    const data = await response.json()
    return data
}

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