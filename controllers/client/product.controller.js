const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
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


// [GET] /products/:slug
module.exports.detail = async (req, res) =>{
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }
    
        const product = await Product.findOne(find);
        console.log(product)
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm này");
        res.redirect(`/products`);
        
    }
}