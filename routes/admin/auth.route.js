const express = require("express");
const router = express.Router();
const validate = require("../../validates/admin/auth.validate")
const controller = require("../../controllers/admin/auth.controller")
const authMiddleware = require("../../middlewares/admin/auth.middleware")

router.get("/login", controller.login);

router.post("/login", validate.loginPost, controller.loginPost);

router.get("/logout", controller.logout);

module.exports = router;