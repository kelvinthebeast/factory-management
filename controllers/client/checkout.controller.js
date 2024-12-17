const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const productsHelper = require("../../helpers/products");
const Order = require("../../models/order.model");
// [get]/checkout
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({_id: cartId});

    if(cart.products.length > 0) {

        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: item.product_id
            }).select("title thumbnail price discountPercentage");

            if (!productInfo) {
                console.error(`Không tìm thấy sản phẩm với ID ${item.product_id}`);
                continue; // Bỏ qua item này
            }
            
            productInfo.priceNew = productsHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity
        }

        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);


    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    });
}};

// [get] /checkout/success/:orderId
module.exports.success = async (req, res) => {

    const order = await Order.findOne({_id: req.params.orderId});

    for (const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail price discountPercentage");

        if (!productInfo) {
            console.error(`Không tìm thấy sản phẩm với ID ${product.product_id}`);
            continue; // Bỏ qua sản phẩm này
        }
        product.productInfo = productInfo
        product.priceNew = productsHelper.priceNewProduct(product);
        
        product.totalPrice = product.priceNew * product.quantity

        console.log("product total price" + product.totalPrice);
    }


    order.totalPrice = order.products.reduce((sum, item) => sum + item.totalPrice, 0);
    res.render("client/pages/checkout/success",{
        pageTitle: "Trang đặt hàng thành công",
        order: order
    } )
};

// [post] /checkout/order/
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;

    const cart = await Cart.findOne({
        _id: cartId
    })

    const products = [];

    for (const product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
             quantity: product.quantity
        
    }
    const productInfo = await Product.findOne({_id: product.product_id}).select("price discountPercentage");

        objectProduct.price = productInfo.price
        objectProduct.discountPercentage = productInfo.discountPercentage

        products.push(objectProduct);

}
   

    
    const orderInfo = {
        cart_id: cartId,
        userInfo: userInfo, 
        products: products
    }

    const order = new Order(orderInfo);
    order.save();

    await Product.updateOne({
        _id: cartId
    },{products: []})

    res.redirect(`/checkout/success/${order.id}`);
}
