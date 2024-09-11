// [GET] /admin/products
module.exports.index = (req, res) => {
    res.render("admin/pages/products/index",{

        pageTitle:"PRoduct MAnagement"
    })
    // res.send("PRODUCT MANGEMENT")
};