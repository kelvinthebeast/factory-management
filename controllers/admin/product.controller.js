// [GET] /admin/products

const { query } = require("express");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
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
    // keyword ở đây là key mà người dùng sẽ cập nhật vào
    let keyword = "";
    if(req.query.keyword){
        // asign for keyword and add into the object
        keyword = req.query.keyword;

        // using regex
        const regex = new RegExp(keyword, "i");
        find.title = regex; 
    }
    const products = await Product.find(find);
    // console.log("ĐÂY LÀ SẢN PHẨM ĐANG TÌM");
    // console.log(products);

    // console.log(products);


    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    })
    // res.send("PRODUCT MANGEMENT")
};

