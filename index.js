const express = require("express");
const path = require('path');
const methodOverride = require('method-override');
const flash = require('express-flash');

const moment = require('moment');




const app = express();
// config for account

//end account config
//change to patch methods
app.use(methodOverride('_method'));
require("dotenv").config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require("express-session");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// flask
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// end flask

//TINY MCE
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
//END TINYMCE

const route = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");


const port = process.env.PORT;
// routes
route(app);
adminRoute(app);
app.use(express.static(`${__dirname}/public`));
app.set("view engine", "pug");
app.set("views", `${__dirname}/views`);



const systemConfig = require("./config/system")
const database = require("./config/database");
database.connect();

// app local variables 
app.locals.prefixAdmin = systemConfig.prefixAdmin; // tu h prefixAdmin se xuat hien trog tat ca file pug
app.locals.moment = moment;

app.listen(port, () => {
    console.log(`App listen on port ${port}`);

})