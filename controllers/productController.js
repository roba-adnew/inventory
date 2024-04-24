import Product from '../models/product';
import asyncHandler from 'express-async-handler';

// Display list of all categories
export const productList = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product list')
})

// Display detail page for a given product
export const productDetail = asyncHandler(async (req, res) => {
    res.send(`NOT IMPLEMENTED: Product detail: ${req.params.id}`)
})

// Display product create form on GET
export const productCreateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product create GET')
})

// Display product create form on POST
export const productCreatePost = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product create POST')
})

// Display product delete form on GET
export const productDeleteGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product delete GET')
})

// Display product delete form on POST
export const productDeletePOST = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product delete POST')
})

// Display product update form on GET
export const productUpdateGet = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product update GET')
})

// Display product update form on POST
export const productUpdatePOST = asyncHandler(async (req, res) => {
    res.send('NOT IMPLEMENTED: Product update POST')
})