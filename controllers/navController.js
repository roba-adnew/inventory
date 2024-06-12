const Product = require('../models/product');
const Category = require('../models/category')
const asyncHandler = require('express-async-handler');

exports.dynamicHandler = asyncHandler(async (req, res) => {
    let renderConfig;

    switch (req.path) {
        case '/':
        case '/catalog':
            const [numProducts, numCategories] =
                await Promise.all([
                    Product.countDocuments({}).exec(),
                    Category.countDocuments({}).exec()
                ]);
            renderConfig = {
                categoryCount: numCategories,
                page: 'index',
                productCount: numProducts,
                title: 'Diglets Department Store',
                user: req.user
            };
            break;
        case '/catalog/products':
            const allProducts = await Product
                .find({}, "name category description")
                .sort({ name: 1 })
                .populate("category")
                .exec();
            renderConfig = {
                page: 'productList',
                title: 'Inventory',
                productList: allProducts,
                user: req.user
            }
            break;
        case '/catalog/departments':
            const allDepartments = await Category
                .find({}, "name")
                .sort({ name: 1 })
                .exec();
            renderConfig = {
                page: 'categoryList',
                title: 'Departments',
                categoryList: allDepartments,
                user: req.user
            }
            break;
    }
    res.render('layout', renderConfig)
})