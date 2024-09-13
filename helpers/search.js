module.exports = (query) => {
    // keyword ở đây là key mà người dùng sẽ cập nhật vào
    let objectSearch = {
        keyword:""
    }
    if(query.keyword){
        // asign for keyword and add into the object
        objectSearch.keyword = query.keyword;

        // using regex
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex; 
    }

    return objectSearch;
}