import React, { createContext, useContext, useState } from "react";

type CartProps = {
    id: string
    qts: number
    price: number
    imageUrl: string
    description: string
}

type CartContextProps = {
    cart: CartProps[]
    addItem: (props: CartProps) => void
    removeItem: (productId: string) => void
    updateUnits: (productId: string, newQts: number) => void
    cleanCart: () => void
}

export const CartContext = createContext({} as CartContextProps)


export function useCart() {
    return useContext(CartContext);
}

export default function CartProvider({ children }: any) {

    const [cart, setCart] = useState<CartProps[]>([]);

    const addItem = (product: CartProps) => {

        const foundIndex = cart.findIndex(item => item.id == product.id);

        // Optimized code
        if (foundIndex >= 0) {
            const newArr = cart.map((item, index) => {
                if (foundIndex == index) {
                    return {
                        ...item,
                        qts: item.qts + 1
                    }
                }
                else {
                    return item
                }
            })
            setCart([...newArr])
        } else {
            setCart([...cart, product])
        }
    }

    const removeItem = (id: string) => {
        const newCart = cart.filter(item => item.id !== id)
        setCart([...newCart])
    }

    const updateUnits = (productId: string, newQts: number) => {

        const foundIndex = cart.findIndex(item => item.id === productId)

        if (foundIndex == -1) return
        if (newQts == cart[foundIndex].qts) return
        if (newQts == 0) return

        cart[foundIndex].qts = newQts
        setCart([...cart])
    }

    const cleanCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{
            addItem,
            cart,
            cleanCart,
            removeItem,
            updateUnits,
        }}>
            {children}
        </CartContext.Provider>
    )
}


