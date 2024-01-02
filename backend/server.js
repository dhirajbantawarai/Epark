require("./db.js");
const express = require("express");
const { json, urlencoded } = require("express");
const userrouter = require("./routes/userrouter");

const app = express();

app.set("PORT", process.env.PORT || 9000);

app.listen(app.get("PORT"), function (err, done) {
  if (err) {
    console.log("Server failed to run");
  } else {
    console.log("Server running on port - ", app.get("PORT"));
  }
});

app.use('/api/user', userrouter);

//localhost:9000/api/user/6593ce7ec409ca6145cb7f0c    ..get method, postman api url