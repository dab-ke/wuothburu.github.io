function toggleSlide(container) {
    container.classList.toggle('active');
}

const currencyDropdown = document.getElementById('currencyDropdown');
const currentCurrency = document.getElementById('currentCurrency');

// Example exchange rates (You can fetch live rates from an API)
const exchangeRates = {
    USD: 1,       // Base currency (default)
    KES: 130,     // 1 USD = 130 KES (Example)
    EUR: 0.92,    // 1 USD = 0.92 EUR (Example)
};

// Store product prices in USD (base currency)
const productPrices = document.querySelectorAll('.product p');

// Function to update product prices
function updatePrices(selectedCurrency, symbol) {
    productPrices.forEach(priceTag => {
        const basePrice = parseFloat(priceTag.dataset.basePrice); // Get original price
        const convertedPrice = (basePrice * exchangeRates[selectedCurrency]).toFixed(2);
        priceTag.textContent = `${symbol}${convertedPrice}`;
    });
}

currencyDropdown.addEventListener('click', (e) => {
    if (e.target.dataset.currency) {
        const selectedCurrency = e.target.dataset.currency;
        const currencySymbol = e.target.dataset.symbol;
        
        currentCurrency.textContent = e.target.textContent; // Update displayed currency
        
        updatePrices(selectedCurrency, currencySymbol); // Update prices
    }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to all product elements
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productData = window.products[productId]; // Access the global products object
            
            if (productData) {
                showProductModal(productData);
            }
        });
    });
});

function showProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Get current scroll position
    const scrollPosition = window.scrollY;
    
    // Populate modal content
    modalContent.innerHTML = `
        <span class="close" onclick="closeProductModal()">&times;</span>
        <div class="modal-body">
            <div class="modal-image">
                <img src="${product.image || 'https://res.cloudinary.com/dab2002/image/upload/f_auto,q_auto/v1743505795/lthrwlk-penny-loafers_cfdmhb.png'}" alt="${product.name}">
            </div>
            <div class="modal-details">
                <h2 class="modal-title">${product.name}</h2>
                <ul class="features-list">
                    ${product.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>

                <div class="modal-options">
                    <div class="color-options">
                        ${product.colors.map((color, index) => `
                            <div class="color-option-large ${index === 0 ? 'selected' : ''}" 
                                    style="background-color: ${color.code};" 
                                    title="${color.name}"></div>
                        `).join('')}
                    </div>
                    <div class="size-options">
                        ${product.sizes.map((size, index) => `
                            <div class="size-option ${index === 2 ? 'selected' : ''}">${size}</div>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-price">Ksh${product.price.toLocaleString()}</div>

                <div class="modal-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn" id="decrease-quantity">-</button>
                        <input type="text" class="quantity-input" value="1" readonly>
                        <button class="quantity-btn" id="increase-quantity">+</button>
                    </div>
                    <button class="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    // Show the modal
    modal.style.display = 'block';
    
    // Position the modal at the current scroll position
    modalContent.style.marginTop = `${scrollPosition + 20}px`;

    // Add event listeners for modal interactions
    const closeButton = modalContent.querySelector('.close');
    closeButton.addEventListener('click', closeProductModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeProductModal();
        }
    });
    
    // Quantity selector functionality
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    const quantityInput = document.querySelector('.quantity-input');
    
    decreaseBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        if (quantity > 1) {
            quantityInput.value = quantity - 1;
        }
    });
    
    increaseBtn.addEventListener('click', () => {
        let quantity = parseInt(quantityInput.value);
        quantityInput.value = quantity + 1;
    });

    // Color selector functionality
    const colorOptions = modalContent.querySelectorAll('.color-option-large');
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Size selector functionality
    const sizeOptions = modalContent.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            sizeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Add to cart button
    const addToCartBtn = modalContent.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        const selectedColor = modalContent.querySelector('.color-option-large.selected').getAttribute('title');
        const selectedSize = modalContent.querySelector('.size-option.selected').textContent;
        
        alert(`Added to cart: ${quantity} x ${product.name} - Color: ${selectedColor}, Size: ${selectedSize}`);
        closeProductModal();
    });
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}
