const systemConfig = require("../../config/system");
const dashboardRoutes = require("./dashboard.route");
module.exports = (app) => {
    // app.use("/", homeRoutes);
    // app.get("/", homeRoutes);

    const PATH_ADMIN = systemConfig.profixAdmin;
    app.use("/admin/dashboard",dashboardRoutes);

   
}