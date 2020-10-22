"use strict";
const request = require("request-promise");

async function createBCOrder(product_id) {

  try {

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

      {
        status_id: 8,
        customer_id: 2,
        billing_address:
        {
          first_name: 'Hailey',
          last_name: 'Morris',
          street_1: '123 Main Street',
          city: 'Austin',
          state: 'Texas',
          zip: '78751',
          country: 'United States',
          country_iso2: 'US',
          email: 'hailey.morris@AwesomeCompany.com'
        },
        shipping_addresses:
          [{
            first_name: 'Hailey',
            last_name: 'Morris',
            company: 'Awesome Company',
            street_1: '123 Main Street',
            city: 'Austin',
            state: 'Texas',
            zip: '78751',
            country: 'United States',
            country_iso2: 'US',
            email: 'hailey.morris@AwesomeCompany.com'
          }],
        products: [{
          product_id: product_id,
          quantity: 2
        }]
      },
      json: true
    };
    console.log("orderCreate", orderCreate);
    var resData = await request(orderCreate);

    console.log("resData", resData);
    return resData;

  } catch (err) {
    console.error(err);
  }

}

function getProductID(type) {

  switch (type) {
    case "oil change":
      return 112;

    case "wiper blades":
      return 119;

    case "brake fluid service":
      return 118;

    case "battery service":
      return 117;

    case "radiator service":
      return 116;

    case "cooling service":
      return 120;

    case "filters":
      return 114;

    case "differential fluid service":
      return 113;

    case "transmission system service":
      return 115;

    default:
      return 0;

  }

}

module.exports.lexbcOrder = async (event, context, callback) => {

  try {
    var productType = event.currentIntent.slots.ProductType;

    const prodID = getProductID(productType)

    console.log("productType", productType);

    console.log("productID", prodID);
    console.log("productID type", typeof prodID);

    if (productType !== "" && prodID) {
      console.log("productType", productType);
      console.log("productID", prodID);
      console.log("productID type", typeof prodID);
      const createOrder = await createBCOrder(prodID);
      console.log("createOrder", createOrder);


      callback(null, {
        "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Fulfilled",
          "message": {
            "contentType": "PlainText",
            "content": "Order Completed, We will see you shortly"
          }
        }
      })
    } else {
      console.log("We don't have a matching product", productType);

      callback(null, {
        "dialogAction": {
          "type": "Close",
          "fulfillmentState": "Failed",
          "message": {
            "contentType": "PlainText",
            "content": "We don't offer that service"
          }
        }
      })
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
