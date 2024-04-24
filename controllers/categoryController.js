const Category = require("../models/category");
const asyncHandler = require("express-async-handler");

// Display list of all categories
exports.categoryList = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category list')
})

// Display detail page for a given category
exports.categoryDetail = asyncHandler(async (req, res) => {
    res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`)
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