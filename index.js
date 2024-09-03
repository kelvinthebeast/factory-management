const express = require("express");
const app = express();
require("dotenv").config();
const route = require("./routes/client/index.route");
const port = process.env.PORT;

route(app);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(port, () => {
    console.log(`App listen on port ${port}`);

})