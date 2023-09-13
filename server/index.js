const express = require("express");
const app = express();
app.use(express.json());
const db = require("./models");
require("dotenv").config();

// routers
// const usersRouter = require("./routes/Users");
// app.use("/users", usersRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(3001, () => {
      console.log("Server running on port 3001");
    });
  })
  .catch((err) => {
    console.error("Failed to start the server: ", err);
  });
