

import Footer from '@/components/footer'
import Header from '@/components/header'
import { ProductProps, getProductId } from '@/services/api'
import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

type Props = {
    productId: string
}

export default function ProductDetail({ productId }: Props) {

    const router = useRouter()
    const { addItem } = useCart()
    const [units, setUnits] = useState(1)
    const [product, setProduct] = useState<ProductProps>()

    useEffect(() => {
        (async () => {
            if (router.query) {
                const product = await getProductId(productId)
                setProduct(product)
            }
        })()
    }, [])


    function handleOnLowerUnits() {
        if (Number(units) == 1) return
        setUnits((value) => value - 1)
    }

    function handleOnUpperUnits() {
        setUnits((value) => value + 1)
    }

    function handleAddOnCart() {
        if (!product) return
        addItem({
            ...product,
            qts: units
        })

        toast.success('Produto adicionado', {
            position: 'bottom-right',
        })
    }

    return (
        <>
            <Header />

            <section className="py-10">
                <div className="max-w-6xl px-4 mx-auto">
                    <div className="flex flex-wrap mb-24 -mx-4">
                        <div className="w-full px-4 mb-8 md:w-1/2 md:mb-0">
                            <div className="sticky top-0 overflow-hidden ">
                                <div className="relative mb-6 lg:mb-10 lg:h-96">
                                    <a className="absolute left-0 transform lg:ml-2 top-1/2 translate-1/2" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-green-500 bi bi-chevron-left dark:text-green-200" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z">
                                            </path>
                                        </svg>
                                    </a>
                                    <img className="object-contain w-full lg:h-full" src={product?.imageUrl} alt="" />
                                    <a className="absolute right-0 transform lg:mr-2 top-1/2 translate-1/2" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-5 h-5 text-green-500 bi bi-chevron-right dark:text-green-200" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                                            </path>
                                        </svg>
                                    </a>
                                </div>

                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2">
                            <div className="lg:pl-20">
                                <div className="mb-6 ">
                                    <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide md:text-2xl ">
                                        {product?.description}
                                    </h2>
                                    <p className="inline-block text-2xl font-semibold  ">
                                        <span>{product?.price}</span>
                                    </p>
                                </div>

                                <div className="py-6 mb-6 border-t border-b border-gray-200">
                                    <span className="text-base text-green-600 ">Disponível</span>
                                    <p className="mt-2 text-sm text-green-500">
                                        <span className="text-gray-600 ">
                                            As entregas levam entre 3 - 4 dias úteis
                                        </span>
                                    </p>
                                </div>
                                <div className="mb-6 "></div>
                                <div className="flex flex-wrap items-center mb-6">
                                    <div className="mb-4 mr-4 lg:mb-0">
                                        <div className="w-28">
                                            <div className="relative flex flex-row w-full h-10 bg-transparent rounded-lg">
                                                <button onClick={handleOnLowerUnits} className="w-20 h-full text-gray-600 bg-gray-100 border-r rounded-l outline-none cursor-pointer  hover:text-gray-700  hover:bg-gray-300">
                                                    <span className="m-auto text-2xl font-thin">-</span>
                                                </button>
                                                <input readOnly type="number" className="flex items-center w-full font-semibold text-center placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black" value={units} />
                                                <button onClick={handleOnUpperUnits} className="w-20 h-full text-gray-600 bg-gray-100 border-l rounded-r outline-none cursor-pointer   hover:text-gray-700 hover:bg-gray-300">
                                                    <span className="m-auto text-2xl font-thin">+</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={handleAddOnCart} className="w-full px-4 py-3 text-center text-green-600 bg-green-100 border border-green-600 hover:bg-green-600 hover:text-gray-100 lg:w-1/2 rounded-xl">
                                        Adicionar no carrinho
                                    </button>
                                </div>
                                {/* <div className="flex gap-4 mb-6">
                                    <Link href="/cart" className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent hover:border-green-500 hover:text-green-700 hover:bg-green-100 rounded-xl">
                                        Comprar agora
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { slug } = query

    if (!slug) return {
        notFound: true,
        redirect: '/'
    }

    return {
        props: {
            productId: slug
        }
    }
}
