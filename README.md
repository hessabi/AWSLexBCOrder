## What

Boilerplate serverless function to enable AWS Lex voice chat bot to interact with BigCommerce store

## What does this application do?

This Application connects with the AWS Lex Chat bot and is able to make orders on BigCommerce
## Contributing

Amir Hessabi

### Running the project

To get started you will need to have a BigCommerce Store.

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


```
