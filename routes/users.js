const express = require("express");
const router = express.Router();
const joiMiddleware = require("../middlewares/joi");
const symbolValidator = require("../controllers/users/validator");
const sqlMiddleware = require("../middlewares/sql");
const UserSymbol = require('../models/sql/symbol');

router.use(sqlMiddleware);

router.get("/logout", (req, res) => {});
router.get("/dashboard", (req, res) => {
    res.send("dashboard");
});
router.post("/symbol", joiMiddleware(symbolValidator), async (req, res, next) => {
  try {
    const userSymbol = new UserSymbol(req.db);
    await userSymbol.add({
      userId: "1",
      symbol: req.body.symbol,
    });
    res.send("symbol added");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
