module.exports = async (objectPagination, query, countProducts ) => {
    if(query.page) {
        objectPagination.currentPage = parseInt(query.page)
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    //get count
    // const countProducts = await Product.count(find);


    const totalPage = Math.ceil(countProducts/objectPagination.limitItem)
    objectPagination.totalPage = totalPage;
    return objectPagination;

}