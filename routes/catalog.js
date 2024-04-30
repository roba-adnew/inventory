const express = require('express');
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const navController = require("../controllers/navController");

/// PRODUCT ROUTES ///
// GET request for creating a Department
router.get("/department/create", categoryController.categoryCreateGet);

// POST request for creating Category.
router.post("/department/create", categoryController.categoryCreatePost);

// GET request to delete Category.
router.get("/department/:id/delete", categoryController.categoryDeleteGet);

// POST request to delete Category.
router.post("/department/:id/delete", categoryController.categoryDeletePost);

// GET request for one Category.
router.get("/department/:id", categoryController.categoryDetail);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get("/product/create", productController.productCreateGet);

// POST request for creating Product.
router.post("/product/create", productController.productCreatePost);

// GET request to delete Product.
router.get("/product/:id/delete", productController.productDeleteGet);

// POST request to delete Product.
router.post("/product/:id/delete", productController.productDeletePost);

// GET request for one Product.
router.get("/product/:id", productController.productDetail);


// GET catalog home page, department list page, and product list page.
router.get('*', navController.dynamicHandler)

module.exports = router;