# Serverless Typescript complete sample project

[![serverless][sls-image]][sls-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Welcome to Ricardo serverless typescript aws sample project.

## Installation

```
npm install
```

## To run

This project use serverless-offline to run the project locally.

```
sls offline start --port=3001
```

If you don't have serverless installed globally, you can run this one:

```
./node_modules/serverless/bin/serverless.js offline start --port=3001
```

## Deploy

### Requirements to deploy

- Mongodb Server
- VPC(securityGroup and subnet) with access to mongodb
- deployment bucket ` (bucket to deploy the lambda code)`
- An aws user with the following privileges: iam, lambda, apigateway, log, event and s3.

```
sls deploy --verbose
```

You can test your api by taking the endpoint in the log at the end of the deploy

```bash

Stack Outputs
ServiceEndpoint: https://xxxxxxx.execute-api.sa-east-1.amazonaws.com/dev
```

note: You must change de custom.yml file to update mongo_host, securityGroup, subnet, accountId and deployment bucket from your aws account.

## Mongodb

There are two indexes to be create

```
partners.createIndex({ document: 1 }, { unique: true });
partners.createIndex( { 'coverageArea' : "2dsphere" } )
```

## Run unit and integration tests

To run all test

```
npm test
```

## Save partner

curl:

```js
curl --location --request POST 'https://xxxxxxx.execute-api.sa-east-1.amazonaws.com/dev/partners' \
--header 'Content-Type: application/json' \
--data-raw '{
  "tradingName": "Partner store - Pinheiros",
  "ownerName": "partner name",
  "document": "1432132123891/0001",
  "coverageArea": {
    "type": "MultiPolygon",
    "coordinates": [
      [[[30, 20], [45, 40], [10, 40], [30, 20]]],
      [[[15, 5], [40, 10], [10, 20], [5, 10], [15, 5]]]
    ]
  },
  "address": {
    "type": "Point",
    "coordinates": [-46.57421, -21.785741]
  }
}'

```

# GET Partner

curl:

```js
curl --location --request GET 'https://xxxxxxx.execute-api.sa-east-1.amazonaws.com/dev/partners/91e87cbc-8e2f-4c87-902a-c0c3d239c20a'
```

# Get Partners by coordinates

curl:

```js
curl --location --request GET 'https://xxxxxxx.execute-api.sa-east-1.amazonaws.com/dev/partners/latitude/20/longitude/30'
```

## Contributing

- Keep the [CHANGELOG.md](CHANGELOG.md) file updated, with [standard-version](https://github.com/conventional-changelog/standard-version). Make sure to use conventional commit messages as specified at: https://www.conventionalcommits.org/en/v1.0.0/.
- Update the release notes at [CHANGELOG.md](CHANGELOG.md) and bump the version by running:
  ```
  npm run release
  ```
- Examine the [CHANGELOG.md](CHANGELOG.md) and update if still required.
- Don't forget to commit the files modified by `npm run release` (the auto-commit option is disabled).
- Once the PR is approved and merged into master, travis-ci run.

[sls-image]: http://public.serverless.com/badges/v3.svg
[sls-url]: http://www.serverless.com
[travis-image]: https://travis-ci.com/MozartLino/serverless-typescript-complete-sample.svg?token=aJRRfnEXpnSoXxWf96zv&branch=master
[travis-url]: https://travis-ci.com/github/MozartLino/serverless-typescript-complete-sample
[coveralls-image]: https://coveralls.io/repos/github/MozartLino/serverless-typescript-complete-sample/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/MozartLino/serverless-typescript-complete-sample?branch=master
