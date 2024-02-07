import Footer from "@/components/footer";
import Header from "@/components/header";
import Products from "@/components/products";
import { ProductProps, getProducts } from "@/services/api";
import { useEffect, useState } from "react";

export default function App() {

    const [products, setProducts] = useState<ProductProps[]>([])

    useEffect(() => {
        (async () => {
            const products = await getProducts()
            setProducts(products)
        })()
    }, [])

    return (
        <>
            <Header />
            <Products products={products} />
            <Footer />
        </>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {

//     const products = await getProducts()

//     return {
//         props: {
//             products,
//         }
//     }
// }
