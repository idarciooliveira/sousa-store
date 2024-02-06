import Footer from "@/components/footer";
import Header from "@/components/header";
import Products from "@/components/products";

export default function App() {
    return (
        <div>
            <Header />
            <Products products={[
                {
                    category: {
                        description: 'tecnologia'
                    },
                    description: 'ada',
                    id: 'id',
                    imageUrl: '',
                    price: 100
                }
            ]} />
            <Footer />
        </div>
    )
}
