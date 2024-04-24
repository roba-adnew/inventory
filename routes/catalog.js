import express from 'express';
import * as categoryController from '../controllers/categoryController';
import * as productController from '../controllers/productController'


const router = express.Router();

/// PRODUCT ROUTES ///

// GET catalog home page.
router.get("/", productController.index);

// GET request for creating a Product. NOTE This must come before routes that display Product (uses id).
router.get("/product/create", productController.productCreateGet);

// POST request for creating Product.
router.post("/product/create", productController.productCreatePost);

// GET request to delete Product.
router.get("/product/:id/delete", productController.productDeleteGet);

// POST request to delete Product.
router.post("/product/:id/delete", productController.productDeletePost);

// GET request to update Product.
router.get("/product/:id/update", productController.productUpdateGet);

// POST request to update Product.
router.post("/product/:id/update", productController.productUpdatePost);

// GET request for one Product.
router.get("/product/:id", productController.productDetail);

// GET request for list of all Product items.
router.get("/products", productController.productList);

/// CATEGORY ROUTES ///

// GET catalog home page.
router.get("/", categoryController.index);

// GET request for creating a Category. NOTE This must come before routes that display Category (uses id).
router.get("/category/create", categoryController.categoryCreateGet);

// POST request for creating Category.
router.post("/category/create", categoryController.categoryCreatePost);

// GET request to delete Category.
router.get("/category/:id/delete", categoryController.categoryDeleteGet);

// POST request to delete Category.
router.post("/category/:id/delete", categoryController.categoryDeletePost);

// GET request to update Category.
router.get("/category/:id/update", categoryController.categoryUpdateGet);

// POST request to update Category.
router.post("/category/:id/update", categoryController.categoryUpdatePost);

// GET request for one Category.
router.get("/category/:id", categoryController.categoryDetail);

// GET request for list of all Category items.
router.get("/categories", categoryController.categoryList);