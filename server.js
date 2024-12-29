//Importaciones
const express = require("express");
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");

let store = {};
store.accounts = [];

let app = express(); //inicializamos express
app.use(bodyParser.json()); //Middlewares bodyParser
app.use(logger("dev")); //Middlewares morgan
app.use(errorhandler()); //Middlewares errorhandler

app.get("/accounts", (req, res) => {
  res.status(200).send(store.accounts);
});
//Nuevo endpoint
app.get("/accounts/:id", (req, res) => {
  const accountId = [req.params.id];
  const account = store.accounts[accountId];

  if (account) {
    res.status(200).send(account);
  } else {
    res.status(404).send({ error: "Cuenta no encontrada" });
  }
});

app.post("/accounts", (req, res) => {
  let newAccount = req.body;
  let id = store.accounts.length;
  store.accounts.push(newAccount);
  res.status(201).send({ id: id });
});

app.put("/accounts/:id", (req, res) => {
  store.accounts[req.params.id] = req.body;
  res.status(200).send(store.accounts[req.params.id]);
});

app.delete("/accounts/:id", (req, res) => {
  store.accounts.splice(req.params.id, 1);
  res.status(204).send();
});

app.listen(3000);
console.log("Servidor ejecutándose en puerto 3000");
