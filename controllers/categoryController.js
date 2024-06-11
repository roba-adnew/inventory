const Product = require('../models/product');
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.categoryCreatePost = [
    body("name", "Department name must contain at least 4 characters")
        .trim()
        .isLength({ min: 3 })
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const department = new Category({ name: req.body.name });
        console.log(errors)
        console.log(req.body)

        if (!errors.isEmpty()) {
            res.render('layout', {
                page: 'categoryForm',
                title: "Create a department",
                department: department,
                errors: errors.array(),
            });
            return;
        }
        else {
            const departmentExists =
                await Category
                    .findOne({ name: req.body.name })
                    .exec();
            if (departmentExists) {
                res.redirect(departmentExists.url);
            }
            else {
                await department.save();
                res.redirect(department.url);
            }
        }
    })
]

exports.categoryCreateGet = asyncHandler(async (req, res) => {
    const renderObject = { 
        title: 'New Department Form', 
        department: undefined,
        errors: undefined,
        page: 'categoryForm',
        user: req.user
     }
    res.render('layout', renderObject)
})

// Display category delete form on GET
exports.categoryDeleteGet = asyncHandler(async (req, res) => {
    const [category, categoryProducts] = await Promise.all([
        Category
            .findById(req.params.id)
            .exec(),
        Product
            .find({ category: req.params.id }, "name")
            .exec()
    ])

    const renderConfig = {
        title: 'Delete department',
        page: 'categoryDelete',
        department: category,
        categoryProducts: categoryProducts
    }

    res.render('layout', renderConfig)
})

exports.categoryDeletePost = asyncHandler(async (req, res) => {
    await Category
        .findByIdAndDelete(req.body.department)
        .exec();
    res.redirect('/catalog/departments')
})

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