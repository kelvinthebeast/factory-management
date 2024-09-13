// [GET] /admin/products

const { query } = require("express");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
module.exports.index = async (req, res) => {

    //filterStatus
    const filterStatus = filterStatusHelper(req.query);

    console.log(filterStatus);
   
    // console.log(req.query);
    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;

    }

    // optimize search by using regex
    const objectSearch = searchHelper(req.query);
    console.log(objectSearch);
    
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    const products = await Product.find(find);
    // console.log("ĐÂY LÀ SẢN PHẨM ĐANG TÌM");
    // console.log(products);

    // console.log(products);


    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword
    })
    // res.send("PRODUCT MANGEMENT")
};

