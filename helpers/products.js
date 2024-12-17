module.exports.priceNewProducts = (products)=> {
    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })
    return newProducts;
}
// tính giá của 1 sản phẩm
module.exports.priceNewProduct = (product)=> {
    if (typeof product.price !== "number" || typeof product.discountPercentage !== "number") {
        console.error("Dữ liệu sản phẩm không hợp lệ để tính giá:", product);
        return 0; // Trả về 0 nếu dữ liệu không hợp lệ
    }
    const priceNew = (product.price*(100 - product.discountPercentage) / 100).toFixed(0);
    return parseInt(priceNew);
}

// module.exports.priceNewProduct = (product) => {
//     // Tính giá mới và làm tròn nó về số nguyên
//     const priceNew = product.price * (100 - product.discountPercentage) / 100;
    
//     // Trả về số nguyên của giá mới
//     return Math.round(priceNew);
// }