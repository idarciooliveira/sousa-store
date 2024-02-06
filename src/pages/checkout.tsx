import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "next/link";

// Renders errors or successfull transactions on the screen.
function Message({ content }: any) {
  return <p>{content}</p>;
}

const initialOptions = {
  "clientId": "AWP0R2oes7y3Z6BJkuQICfF1BcL61y4DTuaZJrEZ4iZEC5rPiam67PFjVBtokXCh38Vnzd6vDTlC2ohi",
  "enable-funding": "",
  "disable-funding": "paylater,venmo,card",
  "data-sdk-integration-source": "integrationbuilder_sc",
};

export default function Checkout() {

  const [message, setMessage] = useState("");

  return (
    <div>
      <Header />
      <div className="flex flex-col container rounded-md mx-auto mb-2 max-w-3xl p-6 space-y-4 sm:p-10 bg-gray-100 text-gray-800">
        <h2 className="text-xl font-semibold">
          Checkout da Compra
        </h2>
        <div className="flex flex-col w-full space-y-2 sm:space-y-4">
          <div className="flex justify-between w-full items-center">
            <h3 className="text-md font-semibold leadi">  Total da Compra </h3>
            <p className="text-right text-md"> 599.999 AO </p>
          </div>
          <div className="flex justify-between w-full items-center">
            <h3 className="text-md font-semibold leadi"> Local de Entrega </h3>
            <select className="w-60 text-center h-10 text-md rounded ">
              <option value="LUBANGO">LUBANGO</option>
              <option value="MUTUNDO">MUTUNDO</option>
            </select>
          </div>
        </div>

        <div className="space-y-1 text-right">
          <p>Taxa de Entrega: <span className="font-semibold"> 599 AO</span> </p>
          <p>Total a Pagar: <span className="font-semibold"> 699.999 AO</span> </p>
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
                  const response = await fetch("/api/payments", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                      cart: [
                        {
                          id: "YOUR_PRODUCT_ID",
                          quantity: "YOUR_PRODUCT_QUANTITY",
                        },
                      ],
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

                    throw new Error(errorMessage);
                  }
                } catch (error) {
                  // console.error(error);
                  setMessage(`Could not initiate PayPal Checkout...${error}`);
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
                    throw new Error(
                      `${errorDetail.description} (${orderData.debug_id})`,
                    );
                  } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                    const transaction =
                      orderData.purchase_units[0].payments.captures[0];
                    setMessage(`Pagamento Concluido, Referência ${transaction.status}: ${transaction.id}`);

                  }
                } catch (error) {
                  console.error(error);
                  setMessage(
                    `Não foi possível concluir o seu pagamento...${error}`,
                  );
                }
              }}
            />
          </PayPalScriptProvider>
          <Message content={message} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

