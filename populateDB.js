const mongoose = require('mongoose');
const { getCategories, getProducts} = require('./utils/api.js')

const Category = require('./models/category.js');
const Product = require('./models/product.js');
const categories = [];

mongoose.set('strictQuery', false);
const userArgs = process.argv.slice(2);
const mongoDB = userArgs[0];

main().catch(err => console.log(err));

async function main() {
    console.log('Debug: starting connection');
    await mongoose.connect(mongoDB);
    console.log('Debug: connection should have happened');
    await createCategories();
    await createProducts();
    console.log('Debug: Closing connection');
    mongoose.connection.close();
}

async function categoryCreate(index, name) {
    const category = new Category({ name : name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`)
}

async function productCreate(name, description, category, price, stock) {
    const categoryID = categories.find(cat => cat.name === category)
    const product = new Product ({ 
        name : name, 
        description : description, 
        category : categoryID, 
        price : price, 
        stock: stock 
    })

    await product.save();
    console.log(`Added product: ${name}`)
}

async function createCategories() {
    console.log('Debug: Pulling categories from api');
    const categories = await getCategories();
    console.log('Debug: Adding categories')
    await Promise.all(categories.map(
        (category, index) => categoryCreate(index, category)))
}

async function createProducts() {
    console.log('Debug: Pulling products from api');
    const products = await getProducts();
    console.log('Debug: Pulling products from api');
    await Promise.all(products.map(product => 
        productCreate(
            product.title, 
            product.description, 
            product.category, 
            product.price, 
            Math.round(Math.random() * 100)
        )
    ))
}