const Product = require("../../models/product.model");


// [GET] /


module.exports.index = async (req, res)=> {
    // const productsFeatured =  await Product.find({
    //     featured: "1",
    //     deleted: false,
    //     status:"active"

    // })
    // const newProducts = productsFeatured.map(item => {
    //     item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
    //     return item;
    // })
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        // productsFeatured: newProducts
        
    });
    
}


