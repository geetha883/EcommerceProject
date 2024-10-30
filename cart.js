const apiUrl = 'https://fakestoreapi.com/products';
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const shippingCost = 30; // Example shipping cost

    cartItemsContainer.innerHTML = ''; 

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        updateOrderSummary(0, shippingCost);
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {
       
        if (!product || typeof product.price !== 'number' || typeof product.quantity !== 'number') {
        

        }
    
        const subtotal = product.quantity * product.price;
        total += subtotal;
    
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <div class="cart-item-details">
                <img src="${product.image}" alt="${product.title}">
                <div class="details">
                    <h4${product.title}</h4>
                    <p class="price">$${product.price}x ${product.quantity}</p>
                    <div class="quantity-controls">
                        <button onclick="changeQuantity(${index}, -1)">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button onclick="changeQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });
    

    updateOrderSummary(total, shippingCost);
}

function changeQuantity(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCartItems();
    }
}

function updateOrderSummary(total, shippingCost) {
    const orderSummaryContainer = document.getElementById('order-summary');
    orderSummaryContainer.innerHTML = `
        <h3>Order Summary</h3>
        <p>Products Total: <span>$${total.toFixed(2)}</span></p>
        <p>Shipping: <span>$${shippingCost.toFixed(2)}</span></p>
        <p>Total Amount: <strong>$${(total + shippingCost).toFixed(2)}</strong></p>
        <button onclick="goToCheckout()">Go to checkout</button>
    `;
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');

    const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
    cartCountElement.textContent = totalItems;
}

function goToCheckout() {
    
    alert('Proceeding to checkout...');
}
