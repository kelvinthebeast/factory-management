const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
const productCategoryHelper = require("../../helpers/products-category");
const ProductCategory = require("../../models/product-category.model");
// GET /products
module.exports.index = async (req, res)=> {
    const products = await Product.find({
        deleted:false
    }).sort({position: "desc"});

    const newProducts = productsHelper.priceNewProducts(products);
    console.log(newProducts);
    
    res.render("client/pages/products/index",{
        pageTitle: "Trang danh sách sản phẩm",
        products: newProducts

    })
    
};


// // [GET] /products/:slug
// module.exports.detail = async (req, res) =>{
//     try {
//         const find = {
//             deleted: false,
//             slug: req.params.slug,
//             status: "active"
//         }
    
//         const product = await Product.findOne(find);
//         console.log(product)
//         res.render("client/pages/products/detail", {
//             pageTitle: product.title,
//             product: product
//         });
//     } catch (error) {
//         req.flash("error", "Không tìm thấy sản phẩm này");
//         res.redirect(`/products`);
        
//     }
// }
// [Get] /products/:slugCategory
module.exports.category = async (req, res)=> {
    console.log(req.params.slugCategory);
    const category = await ProductCategory.findOne({ slug: req.params.slugCategory, deleted: false});

    
    


    
    const listSubCategory = await productCategoryHelper.getSubCategory(category.id);
    
    const listSubCategoryId = listSubCategory.map(item => item.id);
    
    const products = await Product.find({
        product_category_id: {$in:[category.id,...listSubCategoryId]},
        deleted: false
    }).sort({position: "desc"});

    const newProducts = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    })
}