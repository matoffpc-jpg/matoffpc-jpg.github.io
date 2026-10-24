let siteData = { builds: [], services: [], counters: [], steps: [], advantages: [], socials: {}, shorts: [], reviews: [], slides: [], promos: [] };

async function loadData() {
    try {
        const response = await fetch('/data.json?t=' + Date.now());
        if (!response.ok) throw new Error('Ошибка загрузки data.json: ' + response.status);
        siteData = await response.json();
        console.log('✅ Данные загружены');
        return siteData;
    } catch(e) {
        console.error('❌ Ошибка загрузки:', e);
        return null;
    }
}

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

function scrollToOrder() {
    const orderSection = document.getElementById('order');
    if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    for(let i=0;i<50;i++) {
        let p = document.createElement('div');
        p.className = 'particle';
        let s = Math.random()*5+2;
        p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*15}s;animation-duration:${12+Math.random()*15}s`;
        particlesContainer.appendChild(p);
    }
}

function checkVisibility() {
    document.querySelectorAll('.fade-up').forEach(el => {
        if(el.getBoundingClientRect().top < window.innerHeight-80) el.classList.add('visible');
    });
}

function initScrollTop() {
    let btn = document.getElementById('scrollTopBtn');
    if (btn) {
        window.onscroll = () => btn.classList.toggle('show', window.scrollY > 300);
        btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createParticles();
    initScrollTop();
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});
