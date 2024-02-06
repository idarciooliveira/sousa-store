

import Footer from '@/components/footer'
import HeaderAdmin from '@/components/header-admin'
import { AiFillEdit } from 'react-icons/ai'

export default function Dashboard() {
    return (
        <div>
            <HeaderAdmin />

            <div className="container p-2 mx-auto sm:p-4 text-gray-800">
                <div className='w-full flex flex-row items-center mb-2 justify-between'>
                    <h2 className="mb-4 text-2xl font-semibold leadi">Produtos</h2>
                    <button className='bg-green-600 p-2 w-32 rounded text-white'>
                        Novo Produto
                    </button>
                </div>
                <div className="overflow-x-auto ">
                    <table className="min-w-full text-xs ">
                        <thead className="bg-gray-300">
                            <tr className="text-left">
                                <th className="p-3"> #</th>
                                <th className="p-3">Descrição</th>
                                <th className="p-3">Preço</th>
                                <th className="p-3">Categoria</th>
                                <th className="p-3"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                                <td className="p-3">
                                    <p>97412378923</p>
                                </td>
                                <td className="p-3">
                                    <p>Asus Zenbook UX3049</p>
                                </td>
                                <td className="p-3">
                                    <p>258 599</p>
                                </td>
                                <td className="p-3">
                                    <p>Electrónicos </p>
                                </td>
                                <td className="p-3">
                                    <AiFillEdit className='text-green-600 cursor-pointer' size={16} />
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
