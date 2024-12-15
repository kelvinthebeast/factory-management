const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {
        // Tạo mới giỏ hàng nếu không có cartId
        const cart = new Cart();
        await cart.save();

        const expiresCookie = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expiresCookie),
        });
    } else {
        // Kiểm tra và xử lý giỏ hàng dựa trên cartId từ cookie
        const cart = await Cart.findOne({
            _id: req.cookies.cartId,
        });

        if (cart) {
            // Đảm bảo `products` là một mảng hợp lệ
            const products = Array.isArray(cart.products) ? cart.products : [];
            cart.totalQuantity = products.reduce((sum, item) => sum + (item.quantity || 0), 0);

            res.locals.miniCart = cart;
        } else {
            // Nếu giỏ hàng không tồn tại, xử lý như khi không có cartId
            const newCart = new Cart();
            await newCart.save();

            const expiresCookie = 365 * 24 * 60 * 60 * 1000;
            res.cookie("cartId", newCart.id, {
                expires: new Date(Date.now() + expiresCookie),
            });

            res.locals.miniCart = newCart;
        }
    }
    next();
};
