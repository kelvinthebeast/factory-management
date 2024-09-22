const express = require("express");
const app = express();

require("dotenv").config();
const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");
const methodOverride = require('method-override');

const port = process.env.PORT;
// routes
route(app);
adminRoute(app);
app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", "./views");



const systemConfig = require("./config/system")
const database = require("./config/database");
database.connect();

// app local variables 
app.locals.prefixAdmin = systemConfig.prefixAdmin; // tu h prefixAdmin se xuat hien trog tat ca file pug
//change to patch methods
app.use(methodOverride('_method'));
app.listen(port, () => {
    console.log(`App listen on port ${port}`);

})