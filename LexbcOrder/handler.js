"use strict";
const request = require("request-promise");


async function createBCOrder(product) {
  const options = {
    method: "PUT",
    uri: `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v2/orders/`,
    headers: {
      accept: "application/json",
      "X-Auth-Client": process.env.BC_CLIENT,
      "X-Auth-Token": process.env.BC_TOKEN
    },
    body: JSON.stringify({

      "status_id": 0,
      "customer_id": 11,
      "billing_address": {
        "first_name": "Jane",
        "last_name": "Doe",
        "street_1": "123 Main Street",
        "city": "Austin",
        "state": "Texas",
        "zip": "78751",
        "country": "United States",
        "country_iso2": "US",
        "email": "janedoe@email.com"
      },
      "shipping_addresses": [
        {
          "first_name": "Jane",
          "last_name": "Doe",
          "company": "Acme Pty Ltd",
          "street_1": "123 Main Street",
          "city": "Austin",
          "state": "Texas",
          "zip": "78751",
          "country": "United States",
          "country_iso2": "US",
          "email": "janedoe@email.com"
        }
      ],
      "products": [
        {
          "name": product,
          "quantity": 1,
          "price_inc_tax": 10.98,
          "price_ex_tax": 10
        }
      ]

    })
  };
  var transactionData = await request(options);
  console.log("transaction", transactionData);
  return transactionData;
}


module.exports.lexbcOrder = async (event, context, callback) => {

  try{
    var productType = JSON.stringify(event.currentIntent.slots.ProductType);

    console.log("productType", productType);

      const createOrder = await createBCOrder(productType);
      console.log("createOrder", createOrder);


      callback(null, {
        "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Fulfilled",
          "message": {
            "contentType": "PlainText",
            "content": "Order Compeleted, We will see you shortly"
          }
        }
      })



  } catch (err) {
    callback(null, {
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": "Your card was declined"
        }
      }
    })
  }



};
