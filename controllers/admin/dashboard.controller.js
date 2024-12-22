//[GET] /admin/dashboard
const ProductCategory = require("../../models/product-category.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };

    statistic.ProductCategory.total = await ProductCategory.countDocuments({deleted: false});
    statistic.productCategory.active = await ProductCategory.countDocuments({deleted: false, status: true});
    statistic.productCategory.inactive = await ProductCategory.countDocuments({deleted: false, status: false});
    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang chủ",
        statistic: statistic

    });

};

    
