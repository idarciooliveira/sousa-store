
import Footer from '@/components/footer'
import Header from '@/components/header'
import { getOrderId } from '@/services/api'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Orders({ orderId }: any) {

    const [order, setOrder] = useState<any>()

    useEffect(() => {
        (async () => {
            const order = await getOrderId(orderId)
            setOrder(order)
        })()
    }, [])

    console.log(order)
    return (
        <div>
            <Header />
            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <h2 className="mb-4 text-2xl font-semibold leadi">Detalhe do Pedido</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Referencia</th>
                                <th className="p-3">Cliente</th>
                                <th className="p-3">Data do Pedido</th>
                                <th className="p-3 text-right">Total</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                <td className="p-3">
                                    <p>{order?.id}</p>
                                </td>
                                <td className="p-3">
                                    <p>{order?.user?.name}</p>
                                </td>
                                <td className="p-3">
                                    <p>
                                        {new Date(order?.createdAt).toDateString()}
                                    </p>
                                </td>
                                <td className="p-3 text-right">
                                    <p>{order?.total} AO</p>
                                </td>
                                <td className="p-3 text-right">
                                    <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-gray-50">
                                        <Link href={`/orders/${order?.id}`}>{order?.status}</Link>
                                    </span>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="overflow-x-auto mt-4">
                    <h2>Produtos</h2>
                    <table className="min-w-full mt-4 text-xs">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">Descrição</th>
                                <th className="p-3">Qts</th>
                                <th className="p-3">Preço</th>
                                <th className="p-3 text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order?.OrderItem?.map((item: any) => (

                                <tr key={item.id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                    <td className="p-3">
                                        <p>{item?.product.description}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{item?.qts}</p>
                                    </td>
                                    <td className="p-3">
                                        <p>{item?.product.price}</p>
                                    </td>
                                    <td className="p-3 text-right">
                                        <p>{item.product.price * item.qts} AO</p>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { slug } = ctx.query
    const session = await getSession(ctx)

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: true
            }
        }
    }
    return {
        props: {
            orderId: slug,
        }
    }
}
