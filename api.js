const express = require('express');
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const path = require('path');
const app = express();

const schema = buildSchema(`
  type Query {
    sommeDeXPremierNombres(nombres: Int!): Int
    fact(n: Int!): Int
    fibonacci(n: Int!): Int
  }
`);

const root = {
  sommeDeXPremierNombres: ({ nombres }) => {
    let somme = 0;
    for (let i = 0; i <= nombres; i++) {
      somme += i;
    }
    return somme;
  },
  fact: ({ n }) => {
    if (n === 0) {
      return 1;
    }
    return n * root.fact({ n: n - 1 });
  },
  fibonacci: ({ n }) => {
    if (n === 0) {
      return 0;
    }
    if (n === 1) {
      return 1;
    }
    return root.fibonacci({ n: n - 1 }) + root.fibonacci({ n: n - 2 });
  },
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

app.use(express.static(path.join(__dirname, '/')));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
