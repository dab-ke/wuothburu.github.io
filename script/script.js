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



document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn");
    const productWrappers = document.querySelectorAll(".product-wrapper");

    buttons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            const collection = this.getAttribute("data-collection");

            // Remove "active" class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active"); // Add "active" class to clicked button

            // Show only the matching product-wrapper
            productWrappers.forEach(wrapper => {
                if (wrapper.getAttribute("data-collection") === collection) {
                    wrapper.style.display = "flex"; // Show the selected collection
                } else {
                    wrapper.style.display = "none"; // Hide others
                }
            });
        });
    });

    // Initially show only the first collection
    productWrappers.forEach(wrapper => {
        if (wrapper.getAttribute("data-collection") !== "1") {
            wrapper.style.display = "none";
        }
    });
});
