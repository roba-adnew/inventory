const express = require('express');
const router = express.Router();

const categoryController = require("../controllers/categoryController");
const productController = require("../controllers/productController");
const navController = require("../controllers/navController");

/// PRODUCT ROUTES ///
// GET request for creating a Department

router.get("/catalog/department/create", categoryController.categoryCreateGet);

// POST request for creating Category.
router.post("/catalog/department/create", categoryController.categoryCreatePost);

// GET request to delete Category.
router.get("/catalog/department/:id/delete", categoryController.categoryDeleteGet);

// POST request to delete Category.
router.post("/catalog/department/:id/delete", categoryController.categoryDeletePost);

// GET request for one Category.
router.get("/catalog/department/:id", categoryController.categoryDetail);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get("/catalog/product/create", productController.productCreateGet);

// POST request for creating Product.
router.post("/catalog/product/create", productController.productCreatePost);

// GET request to delete Product.
router.get("/catalog/product/:id/delete", productController.productDeleteGet);

// POST request to delete Product.
router.post("/catalog/product/:id/delete", productController.productDeletePost);

// GET request for one Product.
router.get("/catalog/product/:id", productController.productDetail);

// GET catalog home page, department list page, and product list page.
router.get('*', navController.dynamicHandler)

module.exports = router;