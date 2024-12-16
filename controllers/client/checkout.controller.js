const Product = require("../../models/product.model");
const Cart = require("../../models/cart.model");
const productsHelper = require("../../helpers/products");
const Order = require("../../models/order.model");

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


    res.render("client/pages/checkout/index.pug", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    });
}};

// module.exports.order = async (req, res) => {
//    const cartId = req.cookies.cartId;
//     const userInfo = req.body;

//     const cart = await Cart.findOne({
//         _id: cartId
//     })

//     const products = [];

//     for (const product of cart.products) {
//         const objectProduct = {
//             product_id: product.product_id,
//             price: 0,
//             discountPercentage: 0,
//              quantity: product.quantity

//         };
//         const productInfo = await Product.findOne({_id: product.product_id}).select("price discountPercentage");
//         objectProduct.price = productInfo.price;
//         objectProduct.discountPercentage = productInfo.discountPercentage;
//         products.push(objectProduct);

//         const orderInfo = {
//             cart_id: cartId,
//             userInfo: userInfo, 
//             products: products
//         }

//         const order = new Order(orderInfo);
//         await order.save();


//         await Product.updateOne({
//             _id: carId
//         },{products: []})
//     }
//     res.redirect(`/checkout/success/${order.id}`);
// }

module.exports.order = async (req, res) => {
    try {
        const cartId = req.cookies.cartId; // Lấy cartId từ cookies
        const userInfo = req.body; // Lấy thông tin user từ body request

        // Tìm cart theo cartId
        const cart = await Cart.findOne({ _id: cartId });
        if (!cart) {
            return res.status(404).send("Cart not found");
        }

        const products = []; // Mảng để lưu danh sách sản phẩm

        // Lấy thông tin từng sản phẩm trong giỏ hàng
        for (const product of cart.products) {
            const productInfo = await Product.findOne({ _id: product.product_id }).select("price discountPercentage");
            if (!productInfo) {
                return res.status(404).send(`Product with ID ${product.product_id} not found`);
            }

            // Thêm thông tin sản phẩm vào mảng products
            products.push({
                product_id: product.product_id,
                price: productInfo.price,
                discountPercentage: productInfo.discountPercentage,
                quantity: product.quantity
            });
        }

        // Tạo thông tin order
        const orderInfo = {
            cart_id: cartId,
            userInfo: userInfo,
            products: products
        };

        // Lưu order vào cơ sở dữ liệu
        const order = new Order(orderInfo);
        await order.save();

        // Xóa sản phẩm trong cart sau khi đặt hàng thành công
        await Cart.updateOne({ _id: cartId }, { products: [] });

        // Chuyển hướng đến trang checkout thành công
        res.redirect(`/checkout/success/${order.id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the order");
    }
};


module.exports.success = async (req, res) => {

    console.log(req.params.orderId);
    res.render("client/pages/checkout/success",{
        pageTitle: "Trang đặt hàng thành công"
    } )
};