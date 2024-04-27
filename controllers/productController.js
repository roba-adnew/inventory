const Product = require('../models/product');
const Category = require('../models/category')

const asyncHandler = require('express-async-handler');

exports.dynamicHandler = asyncHandler(async (req, res) => {
    let renderObject;

    switch (req.path) {
        case '/':
            const [numProducts, numCategories] =
                await Promise.all([
                    Product.countDocuments({}).exec(),
                    Category.countDocuments({}).exec()
                ]);
            renderObject = {
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
            renderObject = {
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
            renderObject = {
                page: 'categoryList',
                title: 'Departments',
                categoryList: allDepartments
            }
            break;
    }
    res.render('layout', renderObject)
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