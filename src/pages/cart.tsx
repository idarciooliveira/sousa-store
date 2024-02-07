
import Footer from '@/components/footer'
import Header from '@/components/header'
import Link from 'next/link'
import { useCart } from './context/cart'

export default function Cart() {

    const { cart, removeItem } = useCart()

    return (
        <>
            <Header />
            <div className="flex flex-col container mx-auto max-w-3xl mb-2 rounded-md p-6 space-y-4 sm:p-10 bg-gray-100 text-gray-800">
                <h2 className="text-xl font-semibold">Carrinho de Compras</h2>
                <ul className="flex flex-col divide-y divide-gray-300">
                    {cart.length > 0 && cart.map(cartItem => (
                        <li key={cartItem.id} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                            <div className="flex w-full space-x-2 sm:space-x-4" key={cartItem.id}>
                                <img className="flex-shrink-0 object-cover w-20 h-20 border-transparent rounded outline-none sm:w-32 sm:h-32 bg-gray-500" src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&amp;ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80" alt="Polaroid camera" />
                                <div className="flex flex-col justify-between w-full pb-4">
                                    <div className="flex justify-between w-full pb-2 space-x-2">
                                        <div className="space-y-1">
                                            <h3 className="text-lg font-semibold leadi sm:pr-8">
                                                {cartItem.description}
                                            </h3>
                                            <p className="text-sm text-gray-600">Unidades {cartItem.qts}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-semibold">{cartItem.price * cartItem.qts} AO</p>
                                        </div>
                                    </div>
                                    <div className="flex text-sm divide-x">
                                        <button onClick={() => removeItem(cartItem.id)} type="button" className="flex items-center px-2 py-1 pl-0 space-x-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                                                <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                                                <rect width="32" height="200" x="168" y="216"></rect>
                                                <rect width="32" height="200" x="240" y="216"></rect>
                                                <rect width="32" height="200" x="312" y="216"></rect>
                                                <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                                            </svg>
                                            <span>Remover</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="space-y-1 text-right">
                    <p>Total a Pagar: {'  '}
                        <span className="font-semibold">
                            {cart?.reduce((prev, next) => (prev + next.price * next.qts), 0)} AO
                        </span>
                    </p>
                    <p className="text-sm text-gray-600">Não incluíndo a taxa de entrega</p>
                </div>
                <div className="flex justify-end space-x-4">
                    <Link href='/' className="px-6 py-2 border rounded-md border-green-600">
                        Continuar a comprar
                    </Link>
                    {cart.length > 0 &&
                        <Link href='/checkout' className="px-6 py-2 border rounded-md bg-green-600 text-gray-50 border-green-600">
                            Finalizar pedido
                        </Link>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
