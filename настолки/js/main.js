document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScroll();
    setupAddToCart();
    setupFilters();
    setupContactForm();
});

/**
 * Плавный скролл по кнопке "Смотреть популярные"
 */
function setupSmoothScroll() {
    const buttons = document.querySelectorAll('[data-scroll-to]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetSelector = btn.getAttribute('data-scroll-to');
            const target = document.querySelector(targetSelector);
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        });
    });
}

/**
 * Имитация добавления в корзину
 */
function setupAddToCart() {
    document.body.addEventListener('click', (event) => {
        const button = event.target.closest('[data-add-to-cart]');
        if (!button) return;

        const card = button.closest('.card');
        const title = card?.querySelector('.card__title')?.textContent?.trim() || 'Игра';

        alert('«' + title + '» добавлена в учебную корзину.\n\nВ реальном проекте здесь будет переход к оформлению заказа.');
    });
}

/**
 * Фильтры каталога
 */
function setupFilters() {
    const playersSelect = document.querySelector('#playersFilter');
    const timeSelect = document.querySelector('#timeFilter');
    const resetButton = document.querySelector('#resetFilters');
    const cards = Array.from(document.querySelectorAll('#catalogList .card'));

    if (!playersSelect  !timeSelect  !cards.length) {
        return;
    }

    function applyFilters() {
        const playersFilter = playersSelect.value;
        const timeFilter = timeSelect.value;

        cards.forEach(card => {
            const cardPlayers = card.getAttribute('data-players');
            const cardTime = card.getAttribute('data-time');

            const matchesPlayers = playersFilter === 'all' || playersFilter === cardPlayers;
            const matchesTime = timeFilter === 'all' || timeFilter === cardTime;

            card.style.display = (matchesPlayers && matchesTime) ? '' : 'none';
        });
    }

    playersSelect.addEventListener('change', applyFilters);
    timeSelect.addEventListener('change', applyFilters);

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            playersSelect.value = 'all';
            timeSelect.value = 'all';
            applyFilters();
        });
    }

    applyFilters();
}

/**
 * Форма обратной связи
 */
function setupContactForm() {
    const form = document.querySelector('#contactForm');
    const note = document.querySelector('#formNote');

    if (!form || !note) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name  !email  !message) {
            note.textContent = 'Пожалуйста, заполните все обязательные поля.';
            note.style.color = '#b91c1c';
            return;
        }

        note.textContent = 'Сообщение отправлено (демо). В учебном проекте данные не сохраняются.';
        note.style.color = '#047857';
        form.reset();
    });
}
