const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
const productCategoryHelper = require("../../helpers/products-category");
const ProductCategory = require("../../models/product-category.model");
// GET /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        deleted: false
    }).sort({ position: "desc" });

    const newProducts = productsHelper.priceNewProducts(products);
    // console.log(newProducts);

    res.render("client/pages/products/index", {
        pageTitle: "Trang danh sách sản phẩm",
        products: newProducts

    })

};


// // // [GET] /products/detail/:slugProduct
// module.exports.detail = async (req, res) => {
//     // try {
//         const find = {
//             deleted: false,
//             slug: req.params.slugProduct,
//             status: "active"
//         }

//         const product = await Product.findOne(find);

//         if (product.product_category_id) {
//             const category = await ProductCategory.findOne({
//                 _id: product.product_category_id,
//                 deleted: false,
//                 status: "active"
//             });
//         }

//         product.category = category;

//         product.priceNew = productsHelper.priceNewProduct(product);// tự động thêm key product price new
//         // console.log(product)
//         res.render("client/pages/products/detail", {
//             pageTitle: product.title,
//             product: product
//         });
//     // } catch (error) {
//     //     req.flash("error", "Không tìm thấy sản phẩm này");
//     //     res.redirect(`/products`);

//     // }
// }

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        };

        const product = await Product.findOne(find);

        if (!product) {
            req.flash("error", "Không tìm thấy sản phẩm này");
            return res.redirect(`/products`);
        }

        let category = null;
        if (product.product_category_id) {
            category = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted: false,
                status: "active"
            });
        }

        // Assign the category if it exists
        product.category = category;

        // Add the calculated priceNew to the product
        product.priceNew = productsHelper.priceNewProduct(product);

        // Render the product detail view
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        console.error(error);
        req.flash("error", "Đã xảy ra lỗi khi lấy chi tiết sản phẩm");
        res.redirect(`/products`);
    }
};
// [Get] /products/:slugCategory // 4
module.exports.category = async (req, res) => {


    console.log(req.params.slugCategory);
  
    // console.log(req.params.slugCategory);
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        deleted: false

    });

    //logic của bài toán
    const listSubCategory = await productCategoryHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id);
    const product = await Product.find({
        
        product_category_id: {$in:[category.id,...listSubCategoryId]},
        deleted: false

    }).sort({position: "desc"});



    const newProducts = productsHelper.priceNewProducts(product);
    

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    })
}