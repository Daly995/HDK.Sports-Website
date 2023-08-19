// main.js
document.addEventListener("DOMContentLoaded", () => {
    const productSection = document.querySelector(".product-list");
    const cartSection = document.querySelector(".cart");
    const checkoutButton = cartSection.querySelector(".checkout");

    // Fetch products from the server and populate the product section
    fetchProducts();

    // Event listener for adding items to the cart
    productSection.addEventListener("click", async (event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const productId = event.target.dataset.productId;
            await addToCart(productId);
            updateCart();
        }
    });

    // Event listener for initiating the checkout process
    checkoutButton.addEventListener("click", async () => {
        await initiateCheckout();
    });

    // Fetch products from the server and populate the product section
    async function fetchProducts() {
        const response = await fetch("/api/products");
        const products = await response.json();

        // Render product listings
        products.forEach(product => {
            const productElement = createProductElement(product);
            productSection.appendChild(productElement);
        });
    }

    // Create a product element
    function createProductElement(product) {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        `;
        return productElement;
    }

    // Add items to the cart
    async function addToCart(productId) {
        const response = await fetch(`/api/cart/add/${productId}`, { method: "POST" });
        const updatedCart = await response.json();
        cart = updatedCart;
    }

    // Update the cart UI
    function updateCart() {
        // Implement cart UI update
    }

    // Initiate the checkout process
    async function initiateCheckout() {
        const response = await fetch("/api/checkout", { method: "POST" });
        const checkoutSession = await response.json();

        // Redirect to the checkout page
        window.location.href = checkoutSession.url;
    }
});
