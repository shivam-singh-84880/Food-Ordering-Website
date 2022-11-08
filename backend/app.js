const express = require("express");
const mongoose = require("mongoose");
const router = require("./Router/index");
const cors = require("cors");

const port = 8989;
const hostname = "localhost";
const serverDB = "mongodb connection url";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose
  .connect(serverDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(port, hostname, () => {
      console.log(`Server is running at ${hostname}:${port}`);
    });
  })
  .catch((err) => console.log(err));
