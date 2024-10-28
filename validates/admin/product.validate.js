module.exports.createPost = (req, res, next)=> {
    if(!req.body.title) {
        req.flash('error',"Vui long nhap tieu de cho san pham");
        res.redirect('back');
        return;
    }
    next();
}