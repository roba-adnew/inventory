async function getCategories() {
    const catRes = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await catRes.json();
    return categories;
}

async function getProducts() {
    const categories = await getCategories();

    const resArray = await Promise.all(
        categories.map(category => {
            return fetch(`https://fakestoreapi.com/products/category/${category}?limit=25`)
        })
    )

    let products = await Promise.all(
        resArray.map(res => {
            return res.json()
        })
    )
    products = products.flat();

    return products;
};

module.exports = { getCategories, getProducts }