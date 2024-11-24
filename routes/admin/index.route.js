const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const productCategoryRoutes = require("./product-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");

module.exports = (app) => {
    // app.use("/", homeRoutes);
    // app.get("/", homeRoutes);

    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use("/admin/dashboard",dashboardRoutes);
    // app.use(PATH_ADMIN + `/products`,productRoutes);
    app.use(PATH_ADMIN + `/products`, productRoutes);
    
    app.use(PATH_ADMIN + `/products-category`, productCategoryRoutes);
    app.use(PATH_ADMIN + `/roles`, roleRoutes);
    app.use(PATH_ADMIN + `/accounts`, accountRoutes);



   
}