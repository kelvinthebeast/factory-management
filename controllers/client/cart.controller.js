
const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const productsHelper = require("../../helpers/products");
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