const Product = require('../models/product');
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");


// Display detail page for a given category
exports.categoryDetail = asyncHandler(async (req, res) => {
    const [category, categoryProducts] = await Promise.all([
        Category
            .findById(req.params.id)
            .exec(),
        Product
            .find({ category: req.params.id }, "name")
            .exec()
    ])
    renderObject = {
        page: 'categoryDetails',
        title: 'Category',
        department: category,
        categoryProducts: categoryProducts
    }
    res.render('layout', renderObject)
})

// Display category create form on GET
exports.categoryCreateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category create GET')
})

// Display category create form on POST
exports.categoryCreatePost = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category create POST')
})

// Display category delete form on GET
exports.categoryDeleteGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete GET')
})

// Display category delete form on POST
exports.categoryDeletePost = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete POST')
})

// Display category update form on GET
exports.categoryUpdateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category update GET')
})

// Display category update form on POST
exports.categoryUpdatePost = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category update POST')
})