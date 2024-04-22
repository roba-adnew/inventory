async function getProducts() {
    const rawResponse = await fetch('https://fakestoreapi.com/products?limit=25');
    const jsonResponse = await rawResponse.json();
    const catalog = jsonResponse;
    
    return catalog;
}

export default getProducts;