const express = require("express");
const router = express.Router();

const { List, Label } = require("../../models");

module.exports = (app) => {
  app.use("/", router);
  router.post("/tokenCheck", (req, res, next) => {
    try {
      const { loginID, password } = req.body;
      if (loginID === "admin" && password === "1234")
        return res.json({ status: "true" });
      return res.json({ status: "false" });
    } catch (err) {
      console.error(err);
    }
  });

  router.post("/selectLabel", (req, res, next) => {
    try {
    } catch (err) {
      console.error(err);
    }
  });
};
