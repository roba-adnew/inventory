const Product = require('../models/product');
const Category = require('../models/category')
const asyncHandler = require('express-async-handler');

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