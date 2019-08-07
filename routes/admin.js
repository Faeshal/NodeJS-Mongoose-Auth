const express = require("express");

const adminController = require("../controller/admin");
const authController = require("../controller/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/", adminController.getProducts);

router.get("/add", isAuth, adminController.getAddProduct);
router.post("/add", isAuth, adminController.postAddProduct);
router.get("/edit/:productId", isAuth, adminController.getEditProduct);
router.post("/edit", isAuth, adminController.postEditProduct);
router.post("/delete", isAuth, adminController.postDeleteProduct);

router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.post("/logout", isAuth, authController.postLogout);

module.exports = router;
