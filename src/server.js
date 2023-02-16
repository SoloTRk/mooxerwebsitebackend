const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const { indexRouter } = require("./routes/index.router");

dotenv.config({
  path: path.join(__dirname, "config", ".env"),
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", ""], // https://blogfly-front.vercel.app  http://localhost:3000
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use("/", indexRouter);

const port = process.env.PORT || 3001;
const version = process.env.NODE_ENV;

app.listen(port, () => {
  console.log(`Api start on port: ${port} -- version: ${version}`);
});
