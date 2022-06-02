const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");
const port = 3000;
mongoose
  .connect(process.env.DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    throw err;
  });
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
