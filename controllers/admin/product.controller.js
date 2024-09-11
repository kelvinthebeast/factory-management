// [GET] /admin/products

const { query } = require("express");
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {

    //filterStatus
    let filterStatus = [{
        name: "Tất cả",
        status: "",
        class:""
    },
    {
        name: "Hoạt động",
        status: "active",
        class:""
    },
    {
        name: "Tất cả",
        status: "inactive",
        class:""
    }
]
    if (req.query.status) {
        const index = filterStatus.findIndex(item => item.status == req.query.status);
        filterStatus[index].class = "active";
    } else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    // console.log(req.query);
    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status;

    }
    const products = await Product.find(find);
    // console.log("ĐÂY LÀ SẢN PHẨM ĐANG TÌM");
    // console.log(products);

    // console.log(products);


    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement",
        products: products,
        filterStatus: filterStatus
    })
    // res.send("PRODUCT MANGEMENT")
};