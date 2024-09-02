const express = require("express");
const app = express();

const route = require("./routes/client/index.route");
const port = 7000;

route(app);

app.set("view engine", "pug");
app.set("views", "./views");

app.listen(port, () => {
    console.log(`App listen on port ${port}`);

})