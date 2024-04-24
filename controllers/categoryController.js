import Category from '../models/category';
import Product from '../models/product';

// Display list of all categories
export const categoryList = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category list')
})

// Display detail page for a given category
export const categoryDetail = asyncHandler(async (req, res) => {
    res.send(`NOT IMPLEMENTED: Category detail: ${req.params.id}`)
})

// Display category create form on GET
export const categoryCreateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Author create GET')
})

// Display category create form on POST
export const categoryCreatePost = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Author create POST')
})

// Display category delete form on GET
export const categoryDeleteGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET')
})

// Display category delete form on POST
export const categoryDeletePOST = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST')
})

// Display category update form on GET
export const categoryUpdateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET')
})

// Display category update form on POST
export const categoryUpdatePOST = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST')
})