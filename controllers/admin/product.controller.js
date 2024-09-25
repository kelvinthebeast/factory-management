// [GET] /admin/products

const { query } = require("express");
const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const { count } = require("moongose/models/user_model");
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
    const countProducts = await Product.count(find);
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4
    },
    req.query,
    countProducts
)
    //end pagination
    
    // console.log(totalPage);
    console.log(objectPagination)

    // const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.skip);
    const products = await Product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);
    
  

    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
    // res.send("PRODUCT MANGEMENT")
};

//[GET]/admin/products/change-status/:status/:id --> [GET] --> PATCH
module.exports.changeStatus = async (req, res) => {
    // console.log(req.params);
    // const id = req.params.id;
    // const status = req.params.status;
    

    // res.send(`${status} - ${id}`);
    console.log(req.params);
    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({_id: id},{status: status});
    


    res.redirect("back"); // khong quay ve trang so 1
// req.query là sau dấu ?
// params là sau dấu /
}

// [PATCH] /admin/products/change-multi 
module.exports.changeMulti = async (req, res) => {
    console.log(req.body);
    console.log("OKE CHANGE MULTIPLE");
}