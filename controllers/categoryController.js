import Category from '../models/category';
import asyncHandler from 'express-async-handler';

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
    res.send('NOT IMPLEMENTED: Category create GET')
})

// Display category create form on POST
export const categoryCreatePost = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category create POST')
})

// Display category delete form on GET
export const categoryDeleteGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete GET')
})

// Display category delete form on POST
export const categoryDeletePOST = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category delete POST')
})

// Display category update form on GET
export const categoryUpdateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category update GET')
})

// Display category update form on POST
export const categoryUpdatePOST = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Category update POST')
})