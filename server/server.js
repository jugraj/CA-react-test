const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 8282;
const expressApp = express();
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

class Server {
  constructor() {
    this.app = expressApp;
    this.app.use("/", express.static(path.join(__dirname, "public")));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // assign some endpoints
    this.assignEndpoints();
  }

  createObject(index) {
    const names =
      "John Stone Mia Wong Peter Stanbridge Natalie Lee-Walsh Ang Li Nguta Ithya Tamzyn French Salome Simoes Trevor Virtue Tarryn Campbell-Gillies".split(
        " "
      );
    return {
      id: Math.round(Math.random() * 100),
      name: names[Math.floor(Math.random() * (names.length - 1))].toString(),
      price: Math.random() * 5000,
      updated_at: "aaa",
    };
  }

  items = Array(10)
    .fill()
    .map((_, i) => this.createObject(i));

  assignEndpoints() {
    // add fruits:
    this.app.post("/add-fruit", (req, res, next) => {
      const result = {
        FruitName: req.body.name,
        Quantity: req.body.quantity,
      };

      res.send(result);
    });

    // get items:
    this.app.get("/get-items", (_, res) => {
      res.send(this.items);
    });

    // // remove fruits:
    // this.app.post("/remove-fruit", (req, res, next) => {
    //     const result = db
    //         .getCollection("fruits")
    //         .findAndRemove({ FruitName: req.body.name });
    //     const addedUp = db.getCollection("fruits").data.reduce((c, v) => {
    //         c[v.FruitName] = (c[v.FruitName] || 0) + v.Quantity;
    //         return c;
    //     }, {});
    //     // console.log(addedUp);
    //     res.send(addedUp);
    // });
  }

  start() {
    this.app.listen(PORT, () =>
      console.log(`[Server is running on port ${PORT}]`)
    );
  }
}

const server = new Server();
server.start();
