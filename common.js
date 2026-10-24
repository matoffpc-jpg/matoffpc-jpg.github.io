// ========== ДАННЫЕ ==========
let siteData = { builds: [], services: [], counters: [], steps: [], advantages: [], socials: {}, shorts: [], reviews: [], slides: [], promos: [] };
let cart = JSON.parse(localStorage.getItem('matoff_cart')) || [];

// ========== КОРЗИНА ==========
function saveCart() {
    localStorage.setItem('matoff_cart', JSON.stringify(cart));
    updateCartCounters();
}

function updateCartCounters() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpans = document.querySelectorAll('#headerCartCount, #cartCount');
    cartCountSpans.forEach(span => { if (span) span.textContent = totalItems; });
}

function addToCart(component) {
    const existing = cart.find(item => item.id === component.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id: component.id,
            name: component.name,
            price: component.price,
            priceText: component.priceText,
            image: component.image,
            quantity: 1
        });
    }
    saveCart();
    alert(`✅ ${component.name} добавлен в корзину!`);
}

// ========== ЗАГРУЗКА ДАННЫХ ==========
async function loadData() {
    try {
        const response = await fetch('/data.json?t=' + Date.now());
        if (!response.ok) throw new Error('Ошибка загрузки data.json: ' + response.status);
        siteData = await response.json();
        console.log('✅ Данные загружены успешно');
        return siteData;
    } catch(e) {
        console.error('❌ Ошибка загрузки:', e);
        return null;
    }
}

// ========== ТЕМА ==========
function initTheme() {
    let toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    let saved = localStorage.getItem('matoff_theme') || 'dark';
    if(saved === 'light') document.body.classList.add('light-theme');
    const spans = toggle.querySelectorAll('span');
    spans.forEach(span => {
        span.classList.toggle('active', span.dataset.theme === saved);
        span.onclick = (e) => {
            e.stopPropagation();
            let theme = span.dataset.theme;
            if (theme === 'light') document.body.classList.add('light-theme');
            else document.body.classList.remove('light-theme');
            localStorage.setItem('matoff_theme', theme);
            spans.forEach(s => s.classList.remove('active'));
            span.classList.add('active');
        };
    });
}

// ========== НАВИГАЦИЯ ==========
function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCartCounters();
});
