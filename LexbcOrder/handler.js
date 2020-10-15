"use strict";
const request = require("request-promise");
const BigCommerce = require("node-bigcommerce");

const bigCommerce = new BigCommerce({
  logLevel: "info",
  clientId: process.env.BC_CLIENT,
  accessToken: process.env.BC_TOKEN,
  storeHash: process.env.STORE_HASH,
  responseType: "json",
  apiVersion: "v2"
});

async function createBCOrder(product) {
  const options = {
    method: "PUT",
    uri: `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v2/orders/`,
    headers: {
      accept: "application/json",
      "X-Auth-Client": process.env.BC_CLIENT,
      "X-Auth-Token": process.env.BC_TOKEN
    },
    body: {
      {
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
      }
    }
  };
  var transactionData = await request(options);
  console.log("transaction", transactionData);
  return transactionData;
}


module.exports.lexbcOrder = async function (event, context, callback) => {

  try{
    var productType = event.currentIntent.slots.productType,
    service = "We don't offer that service";

    console.log("productType", productType);

    if(productType !== null){
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
      }
    }

  } catch (error){
    callback(null, {
      "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
          "contentType": "PlainText",
          "content": "Your card was declined"
        }
      }
    }
  }


);



};
