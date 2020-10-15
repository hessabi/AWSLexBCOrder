"use strict";
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
  try{
    const resData = await bigCommerce.post('/orders', {
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
    })
    console.log("resData",resData);
    return resData;
  } catch(err){
    console.error(err);
  }
}


module.exports.lexbcOrder = async (event, context, callback) => {

  try{
    var productType = JSON.stringify(event.currentIntent.slots.ProductType);

    console.log("productType", productType);

    if(productType !== ""){
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
    }else {
      console.log("If statement failed");
    }


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
