// [GET] /admin/products

const { query } = require("express");
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {

    // console.log(req.query);
    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;

    }
    const products = await Product.find(find);
    console.log("ĐÂY LÀ SẢN PHẨM ĐANG TÌM");
    console.log(products);

    // console.log(products);


    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement",
        products: products
    })
    // res.send("PRODUCT MANGEMENT")
};