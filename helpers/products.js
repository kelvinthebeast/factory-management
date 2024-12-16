module.exports.priceNewProducts = (products)=> {
    const newProducts = products.map(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })
    return newProducts;
}
// tính giá của 1 sản phẩm
// module.exports.priceNewProduct = (product)=> {
//     const priceNew = (product.price*(100 - product.discountPercentage) / 100).toFixed(0);
//     return parseInt(priceNew);
// }

module.exports.priceNewProduct = (product) => {
    // Tính giá mới và làm tròn nó về số nguyên
    const priceNew = product.price * (100 - product.discountPercentage) / 100;
    
    // Trả về số nguyên của giá mới
    return Math.round(priceNew);
}