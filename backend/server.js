import "./db.js";
import express, { json, urlencoded } from "express";

const app = express();

app.set("PORT", process.env.PORT || 9000);


app.listen(app.get("PORT"), function (err, done) {
    if (err) {
      console.log("Server failed to run");
    } else {
      console.log("Server running on port - ", app.get("PORT"));
    }
  });