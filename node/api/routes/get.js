const express = require("express");
const router = express.Router();
const path = require("path");

module.exports = (app) => {
  app.use("/", router);
  router.use((req, res, next) => {
    /* res.locals 값추가 가능*/
    next();
  });

  router.get("/public", (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
  });
  router.get("/", (req, res, next) => {
    //console.log(path.join(__dirname, "../../../imagelabel/build/index.html"));
    try {
      res.json(
        express.static(
          path.join(__dirname, "../../../imagelabel/build/index.html")
        ),
        {
          token: "123",
        }
      );
    } catch (err) {
      console.error(err);
    }
  });
};
