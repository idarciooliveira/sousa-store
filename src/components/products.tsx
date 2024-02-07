
import { ProductProps } from '@/services/api'
import Link from 'next/link'

type Props = {
    products: ProductProps[]

}

export default function Products({ products }: Props) {
    return (
        <section className="py-6 sm:py-12 bg-gray-100 text-gray-800">
            <div className="container p-6 mx-auto space-y-8">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold">Os melhores produtos com os melhores preços</h2>
                    <p className="font-serif text-sm text-gray-600">Explore o Maior Catálogo de Produtos da Região Sul.</p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                    {products && products.map(product => (
                        <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col bg-gray-50">
                            <div aria-label="image">
                                <img className="object-cover w-full h-52 bg-gray-500" src={product.imageUrl} />
                            </div>
                            <div className="flex flex-col flex-1 p-6">
                                <span className="text-xs tracki uppercase hover:underline text-green-600">
                                    Categoria
                                </span>
                                <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                                    {product.description}
                                </h3>
                                <div className="flex flex-wrap text-xl font-semibold text-green-600">
                                    <span>{product.price} Kz</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
