const Product = require('../models/product');
const Category = require('../models/category')
const { body, validationResult } = require("express-validator");

const asyncHandler = require('express-async-handler');

exports.productCreatePost = [
    body("name", "4 character length minimum")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body("department", "You must select a department")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("details", "Details must be provided, 4 character length minimum")
        .trim()
        .isLength({ min: 4 })
        .escape(),
    body("price", "Positive price must be provided")
        .trim()
        .isCurrency({
            require_symbol: false,
            allow_negative: false
        })
        .escape(),
    body("quantity", "Positive stock quantity must be provided")
        .trim()
        .isNumeric({ no_symbols: true })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const product = new Product({
            name: req.body.name,
            description: req.body.details,
            category: req.body.department,
            price: req.body.price,
            stock: req.body.quantity
        });


        if (!errors.isEmpty()) {
            const allDepartments = await Category
                .find({}, "name")
                .sort({ name: 1 })
                .exec();
            const renderConfig = {
                page: 'productForm',
                title: 'New Product Form',
                product: product,
                errors: errors.array(),
                departments: allDepartments
            }
            res.render('layout', renderConfig);
            return;
        }
        else {
            const productExists =
                await Product
                    .findOne({ name: req.body.name })
                    .exec();
            if (productExists) {
                res.redirect(productExists.url);
            }
            else {
                await product.save();
                res.redirect(product.url);
            }
        }
    })
]

exports.productCreateGet = asyncHandler(async (req, res) => {
    const allDepartments = await Category
        .find({}, "name")
        .sort({ name: 1 })
        .exec();
    const renderConfig = {
        page: 'productForm',
        title: 'New Product Form',
        product: undefined,
        errors: undefined,
        departments: allDepartments
    }
    res.render('layout', renderConfig)
})

exports.productDeletePost = asyncHandler(async (req, res) => {
    console.log(req.body.product)
    await Product
        .findByIdAndDelete(req.body.product)
        .exec();
    res.redirect('/catalog/products')
})

exports.productDeleteGet = asyncHandler(async (req, res) => {
    const productDetails = await Product
        .findById(req.params.id)
        .exec();

    if (productDetails === null) {
        res.redirect('/catalog/products')
    }

    const renderConfig = {
        page: 'productDelete',
        title: 'Delete Product',
        productDetails: productDetails,
    };

    res.render('layout', renderConfig)
})


exports.productDetail = asyncHandler(async (req, res) => {
    const productDetails = await Product
        .findById(req.params.id)
        .populate('category')
        .exec();
    const renderConfig = {
        page: 'productDetails',
        title: 'Product',
        productDetails: productDetails
    }
    res.render('layout', renderConfig)
})

exports.dynamicHandler = asyncHandler(async (req, res) => {
    let renderConfig;

    switch (req.path) {
        case '/':
            const [numProducts, numCategories] =
                await Promise.all([
                    Product.countDocuments({}).exec(),
                    Category.countDocuments({}).exec()
                ]);
            renderConfig = {
                page: 'index',
                title: 'Diglets Department Store',
                productCount: numProducts,
                categoryCount: numCategories
            };
            break;
        case '/products':
            const allProducts = await Product
                .find({}, "name category description")
                .sort({ name: 1 })
                .populate("category")
                .exec();
            renderConfig = {
                page: 'productList',
                title: 'Inventory',
                productList: allProducts
            }
            break;
        case '/departments':
            const allDepartments = await Category
                .find({}, "name")
                .sort({ name: 1 })
                .exec();
            renderConfig = {
                page: 'categoryList',
                title: 'Departments',
                categoryList: allDepartments
            }
            break;
    }
    res.render('layout', renderConfig)
})



// // Display detail page for a given product
// exports.productDetail = asyncHandler(async (req, res) => {
//     res.send(`NOT IMPLEMENTED: Product detail: ${req.params.id}`)
// })

// // Display product create form on GET
// exports.productCreateGet = asyncHandler(async (req, res) => {
//     res.send('NOT IMPLEMENTED: Product create GET')
// })

// // Display product create form on POST
// exports.productCreatePost = asyncHandler(async (req, res) => {
//     res.send('NOT IMPLEMENTED: Product create POST')
// })

// // Display product delete form on GET
// exports.productDeleteGet = asyncHandler(async (req, res) => {
//     res.send('NOT IMPLEMENTED: Product delete GET')
// })

// // Display product delete form on POST
// exports.productDeletePost = asyncHandler(async (req, res) => {
//     res.send('NOT IMPLEMENTED: Product delete POST')
// })

// // Display product update form on GET
// exports.productUpdateGet = asyncHandler(async (req, res) => {
//     res.send('NOT IMPLEMENTED: Product update GET')
// })

// // Display product update form on POST
// exports.productUpdatePost = asyncHandler(async (req, res) => {
//     res.send('NOT IMPLEMENTED: Product update POST')
// })

// module.exports = dynamicHandler;