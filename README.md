
# Dabadoo
A proof of concept for a booksmarting app
Using React, Apollo, GraphQL and Graphcool with some server stuff

## Getting Started


### 2. Configure your GraphQL Endpoint

```sh
export REACT_APP_GRAPHQL_ENDPOINT="https://api.graph.cool/simple/v1/__PROJECT_ID__"
```

### 3. Run the example

You're done configuring the example application. Please run the following command and open [localhost:3000](http://localhost:3000) in your browser. Have fun exploring! 🎉

```sh
npm install
npm start
```

## FAQ


### How to run this example on Windows?

Replace this line in `package.json`

```json
"start": "REACT_APP_GRAPHQL_ENDPOINT=${REACT_APP_GRAPHQL_ENDPOINT:=https://api.graph.cool/simple/v1/__PROJECT_ID__} react-scripts start",
```

with

```json
"start": "set REACT_APP_GRAPHQL_ENDPOINT=https://api.graph.cool/simple/v1/__PROJECT_ID__&&react-scripts start",
```