const ADMIN_PASSWORD = "matoff2025";
let siteData = { builds: [], services: [], counters: [], steps: [], advantages: [], socials: {}, shorts: [], reviews: [], slides: [], promos: [] };

async function loadData() {
    try {
        const response = await fetch('/data.json?t=' + Date.now());
        if (!response.ok) throw new Error('Ошибка загрузки data.json: ' + response.status);
        siteData = await response.json();
        console.log('✅ Данные загружены успешно');
        renderFooterSocials();
        return siteData;
    } catch(e) {
        console.error('❌ Ошибка загрузки:', e);
        return null;
    }
}

function renderFooterSocials() {
    const container = document.getElementById('footerSocials');
    if (!container) return;
    const s = siteData.socials || {};
    const icons = {
        vk: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.575 2.389 7.067 2.389z"/></svg>',
        tg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
        yt: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
        tt: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>',
        ig: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>'
    };
    let html = '';
    if(s.vk) html += `<a href="${s.vk}" target="_blank" class="vk" title="VK">${icons.vk}</a>`;
    if(s.telegram) html += `<a href="${s.telegram}" target="_blank" class="tg" title="Telegram">${icons.tg}</a>`;
    if(s.youtube) html += `<a href="${s.youtube}" target="_blank" class="yt" title="YouTube">${icons.yt}</a>`;
    if(s.tiktok) html += `<a href="${s.tiktok}" target="_blank" class="tt" title="TikTok">${icons.tt}</a>`;
    if(s.instagram) html += `<a href="${s.instagram}" target="_blank" class="ig" title="Instagram">${icons.ig}</a>`;
    container.innerHTML = html;
}

function highlightActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === path || (path === '/' && href === '/')) link.classList.add('active-page');
    });
}

function initSlider() {
    const slides = siteData.slides || [];
    if (slides.length === 0) return;
    const track = document.getElementById('sliderTrack');
    const dotsContainer = document.getElementById('sliderDots');
    if (!track || !dotsContainer) return;
    let currentIndex = 0, interval;
    track.innerHTML = slides.map(slide => `<div class="slider-slide"><img src="${slide.image}" alt="Слайд" onerror="this.src='https://placehold.co/1200x500/2a2a35/9b4dff?text=Slide'"></div>`).join('');
    dotsContainer.innerHTML = slides.map((_, i) => `<div class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('');
    function updateSlider() { track.style.transform = `translateX(-${currentIndex * 100}%)`; document.querySelectorAll('.slider-dot').forEach((dot, i) => dot.classList.toggle('active', i === currentIndex)); }
    function nextSlide() { currentIndex = (currentIndex + 1) % slides.length; updateSlider(); }
    function prevSlide() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; updateSlider(); }
    const nextBtn = document.getElementById('sliderNext'), prevBtn = document.getElementById('sliderPrev');
    if (nextBtn) nextBtn.onclick = () => { nextSlide(); resetInterval(); };
    if (prevBtn) prevBtn.onclick = () => { prevSlide(); resetInterval(); };
    document.querySelectorAll('.slider-dot').forEach(dot => { dot.onclick = () => { currentIndex = parseInt(dot.dataset.index); updateSlider(); resetInterval(); }; });
    function startInterval() { interval = setInterval(nextSlide, 5000); }
    function resetInterval() { clearInterval(interval); startInterval(); }
    startInterval();
}

function getSpecIcon(spec) {
    if(spec.includes("CPU")) return "🖥️";
    if(spec.includes("GPU")) return "🎮";
    if(spec.includes("RAM")) return "💾";
    if(spec.includes("SSD")) return "⚡";
    if(spec.includes("Cooler")) return "🌀";
    if(spec.includes("PSU")) return "🔌";
    return "🔧";
}

function scrollToOrder() { const orderSection = document.getElementById('order'); if (orderSection) orderSection.scrollIntoView({ behavior: 'smooth' }); }

function animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach(c => { let target = parseInt(c.dataset.target); if (isNaN(target)) return; let current = 0, increment = target / 50; function update() { current += increment; if(current < target) { c.textContent = Math.floor(current); requestAnimationFrame(update); } else c.textContent = target; } update(); });
}

function renderCounters() { if(!siteData.counters || !siteData.counters.length) return; const container = document.getElementById('countersContainer'); if (container) { container.innerHTML = siteData.counters.map(c => `<div class="counter-card"><div class="counter-number" data-target="${c.number}">0</div><div class="counter-label">${c.label}</div></div>`).join(''); animateCounters(); } }
function renderServices() { if(!siteData.services || !siteData.services.length) return; const container = document.getElementById('servicesContainer'); if (container) { container.innerHTML = siteData.services.map(s => `<div class="service-card"><h3>${s.name}</h3><p>${s.desc}</p><button class="btn service-btn">${s.btn}</button></div>`).join(''); document.querySelectorAll('.service-btn').forEach(btn => btn.onclick = () => window.location.href = '/contacts.html'); } }
function renderSteps() { const container = document.getElementById('stepsContainer'); if (container && siteData.steps && siteData.steps.length) { container.innerHTML = siteData.steps.map(s => `<div class="step-card"><h3>${s.name}</h3><p>${s.desc}</p></div>`).join(''); } }
function renderAdvantages() { const container = document.getElementById('advantagesContainer'); if (container && siteData.advantages && siteData.advantages.length) { container.innerHTML = siteData.advantages.map(a => `<div class="advantage-card"><h3>${a.name}</h3><p>${a.desc}</p></div>`).join(''); } }
function renderShorts() { const container = document.getElementById('shortsContainer'); if (container && siteData.shorts && siteData.shorts.length) { container.innerHTML = siteData.shorts.map(sh => `<div class="short-card" onclick="window.open('${sh.url}','_blank')"><img src="${sh.preview}" onerror="this.src='https://placehold.co/280x500?text=Video'"><p>${sh.title}</p></div>`).join(''); } }
function renderReviews() { const container = document.getElementById('reviewsContainer'); if (container && siteData.reviews && siteData.reviews.length) { container.innerHTML = siteData.reviews.map(r => `<div class="review-card"><img class="review-image" src="${r.image}" onerror="this.src='https://placehold.co/400x300/2a2a35/9b4dff?text=Фото+ПК'"><strong>⭐ ${r.name}</strong><p>${r.text}</p></div>`).join(''); } }
function renderSocialBlock() { let s = siteData.socials || {}; let html = ''; if(s.vk) html += `<a href="${s.vk}" target="_blank" class="social-icon vk">📱 VK</a>`; if(s.telegram) html += `<a href="${s.telegram}" target="_blank" class="social-icon tg">💬 Telegram</a>`; if(s.youtube) html += `<a href="${s.youtube}" target="_blank" class="social-icon yt">📺 YouTube</a>`; if(s.tiktok) html += `<a href="${s.tiktok}" target="_blank" class="social-icon tt">🎵 TikTok</a>`; if(s.instagram) html += `<a href="${s.instagram}" target="_blank" class="social-icon ig">📷 Instagram</a>`; const container = document.getElementById('socialIconsContainer'); if (container) container.innerHTML = html; }

let promoInterval;
function renderPromo() {
    const promoBar = document.getElementById('promoBar');
    if (!promoBar) return;
    if (!siteData.promos || siteData.promos.length === 0) { if (promoInterval) clearInterval(promoInterval); promoBar.style.display = 'none'; return; }
    const activePromos = siteData.promos.filter(p => p.enabled === true);
    if (activePromos.length === 0) { if (promoInterval) clearInterval(promoInterval); promoBar.style.display = 'none'; return; }
    if (typeof window.currentPromoIndex === 'undefined') window.currentPromoIndex = 0;
    const currentPromo = activePromos[window.currentPromoIndex % activePromos.length];
    window.currentPromoIndex++;
    promoBar.style.display = 'block';
    const promoText = document.getElementById('promoText');
    if (promoText) promoText.textContent = currentPromo.text;
    if (currentPromo.endDate) startTimer(currentPromo.endDate);
}
function startPromoRotation() { if (promoInterval) clearInterval(promoInterval); promoInterval = setInterval(() => { renderPromo(); }, 8000); }
function startTimer(endDate) { if(!endDate) return; let end = new Date(endDate); function update() { let diff = end - new Date(); if(diff <= 0) { const promoBar = document.getElementById('promoBar'); if (promoBar) promoBar.style.display = 'none'; return; } let d = Math.floor(diff/86400000), h = Math.floor((diff%86400000)/3600000), m = Math.floor((diff%3600000)/60000), s = Math.floor((diff%60000)/1000); const promoTimer = document.getElementById('promoTimer'); if (promoTimer) promoTimer.textContent = `${d}д ${h}ч ${m}м ${s}с`; } update(); setInterval(update, 1000); }

let currentFilter = "all", currentGpuFilter = "all";
function renderBuilds() {
    if(!siteData.builds || !siteData.builds.length) return;
    let filtered = [...siteData.builds];
    if(currentFilter !== "all") filtered = filtered.filter(b => b.filterRange === currentFilter);
    if(currentGpuFilter !== "all") filtered = filtered.filter(b => b.gpuType === currentGpuFilter);
    const container = document.getElementById('buildsContainer');
    if (!container) return;
    if (filtered.length === 0) { container.innerHTML = '<div style="text-align:center;padding:40px;">🤔 Нет сборок под выбранные фильтры</div>'; return; }
    container.innerHTML = filtered.map(b => `<div class="build-card"><div class="pc-image-container"><img class="pc-image pc-image-default" src="${b.image}" onerror="this.src='https://placehold.co/400x300/2a2a35/9b4dff?text=PC'"><img class="pc-image pc-image-hover" src="${b.imageHover || b.image}" onerror="this.src='https://placehold.co/400x300/2a2a35/9b4dff?text=PC'"></div><h3>${b.name}</h3><div class="price">${b.priceText}</div><div class="fps-block"><div class="fps-title">🎮 ПРОИЗВОДИТЕЛЬНОСТЬ (УЛЬТРА)</div><div class="fps-value">${b.fps || "100+ FPS"}</div></div><div class="specs-title">⚙️ КОМПЛЕКТУЮЩИЕ</div><div class="specs-two-columns">${b.specs.map(sp => `<div class="spec-item"><span class="spec-icon">${getSpecIcon(sp)}</span><span>${sp}</span></div>`).join('')}</div><a href="/contacts.html" class="btn btn-buy">💰 Купить</a></div>`).join('');
    document.querySelectorAll('.build-card').forEach(card => {
        card.onmousemove = (e) => { let r = card.getBoundingClientRect(); let x = e.clientX - r.left, y = e.clientY - r.top; let rx = (y - r.height/2)/35, ry = (r.width/2 - x)/35; card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`; };
        card.onmouseleave = () => card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
}

function initCalculator() {
    const calcButton = document.getElementById('calcButton');
    if (!calcButton) return;
    calcButton.onclick = () => {
        if (!siteData.builds || siteData.builds.length === 0) { const resultDiv = document.getElementById('calculatorResult'); if (resultDiv) resultDiv.innerHTML = `<div style="text-align:center;padding:30px;"><p>⏳ Данные загружаются...</p></div>`; return; }
        let purpose = document.getElementById('calcPurpose').value, cpuPref = document.getElementById('calcCpu').value, gpuPref = document.getElementById('calcGpu').value, budget = parseInt(document.getElementById('calcBudget').value);
        let filtered = [...siteData.builds];
        if(budget === 70000) filtered = filtered.filter(b => b.price <= 70000);
        else if(budget === 90000) filtered = filtered.filter(b => b.price > 70000 && b.price <= 90000);
        else if(budget === 120000) filtered = filtered.filter(b => b.price > 90000 && b.price <= 120000);
        else if(budget === 160000) filtered = filtered.filter(b => b.price > 120000 && b.price <= 160000);
        else if(budget === 200000) filtered = filtered.filter(b => b.price > 160000 && b.price <= 200000);
        else if(budget === 260000) filtered = filtered.filter(b => b.price > 200000 && b.price <= 260000);
        else filtered = filtered.filter(b => b.price > 260000);
        if(purpose !== 'any') { let f = filtered.filter(b => b.purpose === purpose); if(f.length) filtered = f; }
        if(cpuPref !== 'any') { let f = filtered.filter(b => b.cpuType === cpuPref); if(f.length) filtered = f; }
        if(gpuPref !== 'any') { let f = filtered.filter(b => b.gpuType === gpuPref); if(f.length) filtered = f; }
        filtered.sort((a,b) => a.price - b.price);
        let selected = filtered[0];
        let resultDiv = document.getElementById('calculatorResult');
        if(selected && resultDiv) { resultDiv.innerHTML = `<div style="background:rgba(0,0,0,0.2);border-radius:24px;padding:20px;"><h3 style="color:#9b4dff;text-align:center;">✅ Рекомендуемая сборка</h3><div style="display:flex;flex-wrap:wrap;gap:25px;align-items:flex-start;justify-content:center;"><div><img src="${selected.image}" style="width:400px;border-radius:20px;max-width:100%;" onerror="this.src='https://placehold.co/400x300/2a2a35/9b4dff?text=PC'"></div><div><h2>${selected.name}</h2><div class="price" style="font-size:1.8rem;">${selected.priceText}</div><div class="fps-block"><div class="fps-title">🎮 FPS (УЛЬТРА)</div><div class="fps-value">${selected.fps || "100+ FPS"}</div></div><div class="specs-title">⚙️ КОМПЛЕКТУЮЩИЕ</div><div class="specs-two-columns">${selected.specs.map(sp => `<div class="spec-item"><span class="spec-icon">${getSpecIcon(sp)}</span><span>${sp}</span></div>`).join('')}</div><a href="/contacts.html" class="btn">📝 Оставить заявку</a></div></div></div>`; }
        else if (resultDiv) { resultDiv.innerHTML = `<div style="text-align:center;padding:30px;"><p>🤔 Не нашли подходящую сборку. Напишите нам!</p><a href="/contacts.html" class="btn">Связаться</a></div>`; }
    };
}

async function sendToTelegram(name, contact, type, comment) {
    if (!name || !contact) return false;
    const BOTGATE_API_KEY = "bg_live_9bb08c0e584707ad677672d1f0f0a465";
    const BOT_PUBLIC_ID = "bot_p2K6nqEK6ydQ";
    const CHAT_ID = "1065465753";
    const url = `https://bot-gate.ru/api/v1/bots/${BOT_PUBLIC_ID}/sendMessage`;
    try {
        const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${BOTGATE_API_KEY}` }, body: JSON.stringify({ chat_id: CHAT_ID, text: `🆕 НОВАЯ ЗАЯВКА\n\n👤 ${name}\n📞 ${type}: ${contact}\n📝 ${comment || "—"}\n🕐 ${new Date().toLocaleString()}` }) });
        const result = await response.json();
        return !!result.ok;
    } catch (e) { console.error("Ошибка отправки через BotGate:", e); return false; }
}

function createParticles() { const particlesContainer = document.getElementById('particles'); if (!particlesContainer) return; for(let i=0;i<50;i++) { let p = document.createElement('div'); p.className = 'particle'; let s = Math.random()*5+2; p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*15}s;animation-duration:${12+Math.random()*15}s`; particlesContainer.appendChild(p); } }
function checkVisibility() { document.querySelectorAll('.fade-up').forEach(el => { if(el.getBoundingClientRect().top < window.innerHeight-80) el.classList.add('visible'); }); }
function initScrollTop() { let btn = document.getElementById('scrollTopBtn'); if (btn) { window.onscroll = () => btn.classList.toggle('show', window.scrollY > 300); btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' }); } }
function initTheme() { let toggle = document.getElementById('themeToggle'); if (!toggle) return; let saved = localStorage.getItem('matoff_theme') || 'dark'; if(saved === 'light') document.body.classList.add('light-theme'); const spans = toggle.querySelectorAll('span'); spans.forEach(span => { span.classList.toggle('active', span.dataset.theme === saved); span.onclick = (e) => { e.stopPropagation(); let theme = span.dataset.theme; if (theme === 'light') document.body.classList.add('light-theme'); else document.body.classList.remove('light-theme'); localStorage.setItem('matoff_theme', theme); spans.forEach(s => s.classList.remove('active')); span.classList.add('active'); }; }); }

function initManagerModal() {
    let modal = document.getElementById('socialModal');
    const btn = document.getElementById('managerHeaderBtn');
    if (btn) btn.onclick = () => { if (modal) modal.style.display = 'flex'; };
    const close = document.getElementById('closeModal');
    if (close) close.onclick = () => { if (modal) modal.style.display = 'none'; };
    const vk = document.getElementById('modalVk');
    if (vk) vk.onclick = () => { window.open(siteData.socials?.vk || "#", '_blank'); if (modal) modal.style.display = 'none'; };
    const tg = document.getElementById('modalTg');
    if (tg) tg.onclick = () => { window.open(siteData.socials?.telegram || "#", '_blank'); if (modal) modal.style.display = 'none'; };
}

function initRequestForm() {
    const form = document.getElementById('requestForm');
    if (!form) return;
    let contactType = 'phone';
    document.querySelectorAll('.contact-type-btn').forEach(btn => btn.onclick = function() { document.querySelectorAll('.contact-type-btn').forEach(b => b.classList.remove('active')); this.classList.add('active'); contactType = this.dataset.contact; let c = document.getElementById('contactFieldContainer'); if(c) { if(contactType === 'phone') c.innerHTML = '<input type="tel" id="clientContact" placeholder="Номер телефона" required>'; else if(contactType === 'tg') c.innerHTML = '<input type="text" id="clientContact" placeholder="Ваш Telegram (@username)" required>'; else c.innerHTML = '<input type="text" id="clientContact" placeholder="Ссылка на VK" required>'; } });
    form.onsubmit = async (e) => {
        e.preventDefault();
        let name = document.getElementById('clientName').value, contact = document.getElementById('clientContact').value, comment = document.getElementById('clientComment').value;
        const consent = document.getElementById('clientConsent');
        if(!name || !contact) { alert("Заполните имя и контакт!"); return; }
        if (!consent.checked) { alert("Необходимо дать согласие на обработку персональных данных!"); return; }
        let btn = e.target.querySelector('button'), orig = btn.textContent;
        btn.textContent = "Отправка..."; btn.disabled = true;
        const success = await sendToTelegram(name, contact, contactType, comment);
        if (success) { alert(`✅ Заявка принята, ${name}! Менеджер свяжется с вами.`); e.target.reset(); const cf = document.getElementById('contactFieldContainer'); if (cf) cf.innerHTML = '<input type="tel" id="clientContact" placeholder="Номер телефона" required>'; const phoneBtn = document.querySelector('.contact-type-btn[data-contact="phone"]'); const tgBtn = document.querySelector('.contact-type-btn[data-contact="tg"]'); const vkBtn = document.querySelector('.contact-type-btn[data-contact="vk"]'); if (phoneBtn) phoneBtn.classList.add('active'); if (tgBtn) tgBtn.classList.remove('active'); if (vkBtn) vkBtn.classList.remove('active'); contactType = 'phone'; }
        else { alert('❌ Ошибка отправки. Напишите нам в Telegram: @matoffpcforclientsbot'); }
        btn.textContent = orig; btn.disabled = false;
    };
}

function initPromoClose() {
    const promoClose = document.getElementById('promoClose');
    if (promoClose) promoClose.onclick = () => { const promoBar = document.getElementById('promoBar'); if (promoBar) promoBar.style.display = 'none'; };
}

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollTop();
    initTheme();
    initManagerModal();
    initRequestForm();
    initPromoClose();
    highlightActiveNav();
    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
});
