## What

Boilerplate serverless function to enable AWS Lex voice chat bot to interact with BigCommerce store

## What does this application do?

This application can be used as a fulfilment method for an Amazon Lex: https://aws.amazon.com/lex/

the AWS Lex Chat bot is able to make orders on BigCommerce by triggering this application

## Contributing

Amir Hessabi
George FitzGibbons @gje4 - Thank you for the serverless app starter 
Chancellor Clark @chanceaclark - Code Review 


### Running the project

To get started you will need to have a BigCommerce Store.

You will need an AWS account 

You will need to have made an Lex bot already: 

You will need to have +v10 node.

You will need Serverless

```https://serverless.com/

In this example the serverless.yml is configured for AWS.
https://serverless.com/framework/docs/providers/aws/guide/installation/

You can easily update the yml for your desired FAAS providers
```

You will need to generate BigCommerce API keys, these keys need to have read permissions for products.

In the serverless.yml file update the environment with your site API Keys

```
environment:
  STORE_HASH: {YOUR STORE HASH}
  BC_CLIENT: {BC CLIENT ID}
  BC_TOKEN: {BC TOKEN ID}
  STRIPE_SECRET: {STRIPE SECRET KEY}

```

Now run to set up

```bash
npm install
```

Now you're ready to deploy

```bash
cd lexbcOrder
sls deploy
```
### Now that you have deployed your function to the AWS Lambda
Do the following steps: 

### Create a Lex Chat bot

Follow the instructions on: 
https://docs.aws.amazon.com/lex/latest/dg/gs-bp-create-bot.html

Point the lex bot fulfilment method to the function on your AWS Labmda. 

### Presenting the chat box

``` Step 1

You will need to Go to your Amazon Cognito

Then "Manage Identity Pools"

Then "Create new identity pool"
    Name the identity pool 
    Make sure to "Enable access to unauthenticated identities"
Then "Create Pool"

Copy the "Identity pool ID" and use it in the next step 

``` Step 2

The easiest way to test drive the chatbot UI is to deploy it using the AWS CloudFormation templates provided by this project. Once you have launched the CloudFormation stack, you will get a fully working demo site hosted in your account.

https://github.com/aws-samples/aws-lex-web-ui#getting-started

Launch the Stack and go through the creation prcess

Use the "WebAppUrl" to interacte with the bot. 




```
