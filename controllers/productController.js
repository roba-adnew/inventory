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
                departments: allDepartments,
                user: req.user
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
        departments: allDepartments,
        user: req.user
    }
    res.render('layout', renderConfig)
})

exports.productDeletePost = asyncHandler(async (req, res) => {
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
        user: req.user
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