const express = require("express");
const nunjucks = require("nunjucks");

require("./db/connect");

const app = express();
const router = express.Router();

app.use(router);

nunjucks.configure("views", {
  autoescape: true,
  express: app,
});

app.set("view engine", "njk");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("*", (req, res) => {
  res.render("404");
});

app.listen(3000, () => {
  console.log(` Server started on: http://localhost:3000`);
});
