import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "@/components/header";
import Footer from "@/components/footer";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useCart } from "./context/cart";
import { useRouter } from "next/navigation";

const initialOptions = {
  "clientId": "AWP0R2oes7y3Z6BJkuQICfF1BcL61y4DTuaZJrEZ4iZEC5rPiam67PFjVBtokXCh38Vnzd6vDTlC2ohi",
  "enable-funding": "",
  "disable-funding": "paylater,venmo,card",
  "data-sdk-integration-source": "integrationbuilder_sc",
};


export default function Checkout() {

  const router = useRouter()
  const { cart, cleanCart } = useCart()
  const total = cart.reduce((prev, next) => prev + (next.price * next.qts), 0)

  if (cart.length <= 0) return <></>
  return (
    <div>
      <Header />
      <div className="flex flex-col container rounded-md mx-auto mb-2 max-w-3xl p-6 space-y-4 sm:p-10 bg-gray-100 text-gray-800">
        <h2 className="text-xl font-semibold">
          Pagamento
        </h2>
        <div className="space-y-1 text-right">
          <p>Total a Pagar: <span className="font-semibold"> {total} AO</span> </p>
        </div>
        <div className="flex justify-end space-x-4">
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              className="px-6 py-2 w-full"
              style={{
                shape: "rect",
                layout: "vertical",
              }}
              createOrder={async () => {
                try {

                  const cartItems: any = []

                  cart.forEach(item => {
                    cartItems.push({
                      productId: item.id,
                      qts: item.qts,
                      price: item.price,
                      total: item.price * item.qts
                    })
                  })

                  const response = await fetch("/api/payments", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                      items: cartItems,
                      currency: 'USD'
                    }),
                  });

                  const orderData = await response.json();

                  if (orderData.id) {
                    return orderData.id;
                  } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                      : JSON.stringify(orderData);

                    toast.error(errorMessage)
                  }
                } catch (error) {
                  toast.error(`Ocorreu um erro ${error}`)
                }
              }}
              onApprove={async (data, actions) => {
                try {
                  const response = await fetch(
                    `/api/payments/${data.orderID}/capture`,
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                  );

                  const orderData = await response.json();

                  const errorDetail = orderData?.details?.[0];

                  if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                    return actions.restart();
                  } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                    toast.error(
                      `${errorDetail.description} (${orderData.debug_id})`,
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction = orderData.purchase_units[0].payments.captures[0];
                    toast.success(`Pagamento Concluido, Referência ${transaction.status}: ${transaction.id}`);
                    cleanCart()
                    router.push('/orders')
                  }
                } catch (error) {
                  toast.error(
                    `Não foi possível concluir o seu pagamento...${error}`,
                  );
                }
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        permanent: true,
        destination: 'auth/signin'
      }
    }
  }
  return {
    props: {

    }
  }
}
