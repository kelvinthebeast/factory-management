const express = require("express");
const multer  = require('multer');
// const storageMulter = require('../../helpers/storageMulter');
const upload = multer();// dest indicates root project path

const validate = require("../../validates/admin/product-category.validate");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const router = express.Router();
const controller = require("../../controllers/admin/product-category.controller");

router.get(`/`, controller.index);
router.get(`/create`, controller.create);

router.get(`/edit/:id`, controller.edit);

router.patch(
    "/edit/:id",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.editPath
);

router.post(
    "/create",
    upload.single("thumbnail"),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

module.exports = router;
