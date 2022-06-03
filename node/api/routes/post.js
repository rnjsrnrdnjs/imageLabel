const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { List, Label, Select } = require("../../models");

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
  router.post("/getLabelList", async (req, res, next) => {
    try {
      const list = await List.findOne({
        order: Sequelize.literal("rand()"),
        include: [{ model: Label }],
      });
      await Promise.all(
        list.Labels.map((item, idx) => {
          item["dataValues"].select = false;
        })
      );
      await Promise.all(
        await list.Labels.sort((a, b) => {
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        })
      );
      return res.json({ list });
    } catch (err) {
      console.error(err);
    }
  });
  router.post("/newLabelList", async (req, res, next) => {
    try {
      const { prevId } = req.body;
      const list = await List.findOne({
        where: {
          id: { [Op.ne]: prevId },
        },
        order: Sequelize.literal("rand()"),
        include: [{ model: Label }],
      });
      await Promise.all(
        list.Labels.map((item, idx) => {
          item["dataValues"].select = false;
        })
      );
      await Promise.all(
        await list.Labels.sort((a, b) => {
          return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
        })
      );
      return res.json({ list });
    } catch (err) {
      console.error(err);
    }
  });
  router.post("/selectLabel", async (req, res, next) => {
    try {
      const { selectList } = req.body;
      if (!selectList || selectList.length < 1)
        return res.json({ status: "false" });
      for (let i = 0; i < selectList.length; i++) {
        await Select.create({
          select: 1,
          LabelId: selectList[i].id,
        });
      }
      return res.json({ status: "true" });
    } catch (err) {
      console.error(err);
    }
  });
  router.post("/", async (req, res, next) => {
    try {
    } catch (err) {
      console.error(err);
    }
  });
};
