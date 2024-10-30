const apiUrl = 'https://fakestoreapi.com/products';
let products = []; // Array to hold fetched products
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    updateCartCount();
});

function fetchProducts(category = 'all') {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data; 
            displayProducts(products, category);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function displayProducts(products, category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filteredProducts = (category === 'all') ? products : products.filter(product => product.category.toLowerCase() === category.toLowerCase());

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3 class="title">${product.title}</h3>
            <p class="des">${product.description}</p>
            <p>$${product.price}</p>
            <button onclick="viewDetails(${product.id})">Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

function viewDetails(productId) {
    window.location.href = `http://127.0.0.1:5500/details.html?id=${productId}`;
}

function filterProducts(category) {
    displayProducts(products, category);
}

function addToCart(id, title, image, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(p => p.id === id);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ id, title, image, price, quantity: 1 });
    }

    // Update localStorage and cart count
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Product added to cart');
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function goToCart() {
    window.location.href = 'cart.html';
}