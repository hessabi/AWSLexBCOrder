"use strict";
//const BigCommerce = require("node-bigcommerce");
const request = require("request-promise");

// const bigCommerce = new BigCommerce({
//   logLevel: "info",
//   clientId: process.env.BC_CLIENT,
//   accessToken: process.env.BC_TOKEN,
//   storeHash: process.env.STORE_HASH,
//   responseType: "json",
//   apiVersion: "v2"
// });

async function createBCOrder() {

  try{

    const orderCreate = {
      method: "POST",
      uri: `https://api.bigcommerce.com/stores/${process.env.STORE_HASH}/v2/orders`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-Auth-Client": process.env.BC_CLIENT,
        "X-Auth-Token": process.env.BC_TOKEN
      },
      body:

          { status_id: 8,
            customer_id: 1,
            billing_address:
            { first_name: 'Amir',
            last_name: 'Hessabi',
            street_1: '123 Main Street',
            city: 'Austin',
            state: 'Texas',
            zip: '78751',
            country: 'United States',
            country_iso2: 'US',
            email: 'amir.hessabi@bigcommerce.com' },
            shipping_addresses:
            [ { first_name: 'Amir',
            last_name: 'Hessabi',
            company: 'BigCommerce',
            street_1: '123 Main Street',
            city: 'Austin',
            state: 'Texas',
            zip: '78751',
            country: 'United States',
            country_iso2: 'US',
            email: 'amir.hessabi@bigcommerce.com' } ],
            products: [ {
              product_id: 112,
              quantity: 2
            } ]
          },
      json: true
    };
    console.log("orderCreate",orderCreate);
    var resData = await request(orderCreate);

    console.log("resData",resData);
    return resData;

    // var body =
    // {
    //     "status_id": 8,
    //     "customer_id": 1,
    //     "billing_address": {
    //       "first_name": "Amir",
    //       "last_name": "Hessabi",
    //       "street_1": "123 Main Street",
    //       "city": "Austin",
    //       "state": "Texas",
    //       "zip": "78751",
    //       "country": "United States",
    //       "country_iso2": "US",
    //       "email": "amir.hessabi@bigcommerce.com"
    //     },
    //     "shipping_addresses": [
    //       {
    //         "first_name": "Amir",
    //         "last_name": "Hessabi",
    //         "company": "BigCommerce",
    //         "street_1": "123 Main Street",
    //         "city": "Austin",
    //         "state": "Texas",
    //         "zip": "78751",
    //         "country": "United States",
    //         "country_iso2": "US",
    //         "email": "amir.hessabi@bigcommerce.com"
    //       }
    //     ],
    //     "products": [
    //       {
    //         "product_id": 112,
    //         "quantity": 2
    //       }
    //     ]
    //   }
    //   console.log(body)
    // const resData = await bigCommerce.post('/orders', {body})
    // console.log(body)
    // console.log("resData",resData);
    //
    // return resData;
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
      const createOrder = await createBCOrder();
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
