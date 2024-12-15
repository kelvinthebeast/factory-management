
const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const productsHelper = require("../../helpers/products");

//[get] /cart/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});

    if(cart.products.length > 0) {

        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({_id: productId}).select("title thumbnail slug price discountPercentage");
            

            productInfo.priceNew = productsHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);



    }
    // console.log(cart)
    res.render("client/pages/cart/index.pug", {
        pageTitle: "Giỏ hàng",
        cartDetail: cart
    })
}


// [post] /cart/add/:productId
module.exports.addPost = async (req, res) => {

    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);
    // const quantity = req.body.quantity;
    const cartId = req.cookies.cartId;

    

    

    const cart = await Cart.findOne({_id: cartId});
    // const existProductInCart = Cart.products.find(item=> item.id == productId);
    const existProductInCart = cart.products.find(item => item.product_id == productId);


    if  (existProductInCart) {
        const quantityNew = quantity + existProductInCart.quantity;
        await Cart.updateOne({
            _id: cartId,
            "products.product_id": productId,
        },
    {
        // update 1 phần tử trong mảng
        $set: { "products.$.quantity": quantityNew }
    })
    
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };
    
        await Cart.updateOne({
            _id: cartId
        },
            {
                $push: { products: objectCart }
            })
    }
    
   req.flash('success',"Đã thêm sản phẩm vào giỏ hàng");

   res.redirect("back");
};




// [GET] /cart/delele/:id
module.exports.delete = async (req, res) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    
    // console.log(req.params.productId);
    await Cart.updateOne({
        _id: cartId
    },
        {
            $pull: { products: { product_id: productId } }
        })
    req.flash('success',"Đã xóa sản phẩm ra khỏi giỏ hàng");
    res.redirect("back");

}

// [GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {

    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    const quantity = req.params.quantity;

    console.log(cartId, productId, quantity);
    await Cart.updateOne({
        _id: cartId,
        "products.product_id": productId,
    },{
        // update 1 phần tử trong mảng
        $set: { "products.$.quantity": quantity },
    })
    


    req.flash('success',"Đã cập nhật số lượng sản phẩm thành công");
    res.redirect("back");

}
