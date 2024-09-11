const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
module.exports = (app) => {
    // app.use("/", homeRoutes);
    // app.get("/", homeRoutes);

    const PATH_ADMIN = systemConfig.profixAdmin;
    app.use("/admin/dashboard",dashboardRoutes);
    // app.use(PATH_ADMIN + `/products`,productRoutes);
    app.use("/admin/products", productRoutes);

   
}