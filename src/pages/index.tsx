import Footer from "@/components/footer";
import Header from "@/components/header";
import Products from "@/components/products";
import { ProductProps, getProducts } from "@/services/product";
import { GetServerSideProps } from "next";

type Props = {
    products: ProductProps[]
}

export default function App({ products }: Props) {

    return (
        <>
            <Header />
            <Products products={products} />
            <Footer />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {

    const products = await getProducts()

    return {
        props: {
            products
        }
    }
}
