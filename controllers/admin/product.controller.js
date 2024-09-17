// [GET] /admin/products

const { query } = require("express");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
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



    // pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItem: 4

    },
    req.query,
    countProducts
); 

    // if(req.query.page) {
    //     objectPagination.currentPage = parseInt(req.query.page)
    // }

    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    // //get count
    // // const countProducts = await Product.count(find);
    // const countProducts = await Product.countDocuments(find);

    // const totalPage = Math.ceil(countProducts/objectPagination.limitItem)
    // objectPagination.totalPage = totalPage;
    
    //end pagination

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);

    
    // console.log(countProduct);
    // console.log("ĐÂY LÀ SẢN PHẨM ĐANG TÌM");
    // console.log(products);

    // console.log(products);


    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
    // res.send("PRODUCT MANGEMENT")
};

