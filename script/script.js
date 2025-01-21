function toggleSlide(container) {
    container.classList.toggle('active');
}

const currencyDropdown = document.getElementById('currencyDropdown');
const currentCurrency = document.getElementById('currentCurrency');

currencyDropdown.addEventListener('click', (e) => {
    if (e.target.dataset.currency) {
        const currencySymbol = e.target.dataset.symbol;
        currentCurrency.textContent = e.target.textContent; // Update displayed currency
        // Here you can also add functionality to update prices on the page
    }
});