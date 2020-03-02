const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/api/accounts", async (req, res, next) => {
  try {
    const accounts = await db.select("*").from("accounts");
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

server.get("/api/accounts/:id", async (req, res, next) => {
  try {
    const account = await db
      .first("*")
      .from("accounts")
      .where("id", req.params.id);
    res.json(account);
  } catch (err) {
    next(err);
  }
});

server.post("/api/accounts", async (req, res, next) => {
  try {
    const newAccountID = await db("accounts").insert(req.body);
    const newAccount = await db("accounts")
      .where("id", newAccountID)
      .first();
    res.json(newAccount);
  } catch (err) {
    next(err);
  }
});

server.put("/api/accounts/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .update(req.body);
    const updatedAccount = await db("accounts")
      .where("id", req.params.id)
      .first();

    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

server.delete("/api/accounts/:id", async (req, res, next) => {
  try {
    await db("accounts")
      .where("id", req.params.id)
      .del();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = server;
