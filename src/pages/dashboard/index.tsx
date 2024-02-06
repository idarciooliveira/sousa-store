

import Footer from '@/components/footer'
import HeaderAdmin from '@/components/header-admin'
import React from 'react'

export default function Dashboard() {
    return (
        <div>
            <HeaderAdmin />

            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <h2 className="mb-4 text-2xl font-semibold leadi">Pedidos</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3">#REF</th>
                                <th className="p-3">Cliente</th>
                                <th className="p-3">Total</th>
                                <th className="p-3">Forma de Pagamento</th>
                                <th className="p-3">Data do Pedido</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                <td className="p-3">
                                    <p>97412378923</p>
                                </td>
                                <td className="p-3">
                                    <p>Idarcio Oliveira</p>
                                </td>
                                <td className="p-3">
                                    <p>12 000 AO </p>
                                </td>
                                <td className="p-3">
                                    <p>Paypal</p>
                                </td>
                                <td className="p-3">
                                    <p>14 Jan 2022</p>
                                </td>
                                <td className="p-3">
                                    <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-gray-50">
                                        <span>Pendente</span>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>
    )
}
