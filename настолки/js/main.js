document.addEventListener('DOMContentLoaded', function () {
    const cartButtons = document.querySelectorAll('[data-product]');
    const playersFilter = document.getElementById('playersFilter');
    const timeFilter = document.getElementById('timeFilter');
    const catalogList = document.getElementById('catalogList');
    const contactForm = document.getElementById('contactForm');
    const formNote = document.getElementById('formNote');

    // Имитация добавления в корзину (без бэкенда)
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            alert('Игра «' + product + '» добавлена в учебную корзину.');
        });
    });

    // Фильтрация каталога по количеству игроков и времени партии
    function applyFilters() {
        if (!catalogList || !playersFilter || !timeFilter) return;

        const playersValue = playersFilter.value;
        const timeValue = timeFilter.value;

        catalogList.querySelectorAll('.card').forEach(card => {
            const cardPlayers = card.getAttribute('data-players');
            const cardTime = card.getAttribute('data-time');

            const byPlayers = (playersValue === 'all' || cardPlayers === playersValue);
            const byTime = (timeValue === 'all' || cardTime === timeValue);

            card.style.display = (byPlayers && byTime) ? '' : 'none';
        });
    }

    if (playersFilter && timeFilter) {
        playersFilter.addEventListener('change', applyFilters);
        timeFilter.addEventListener('change', applyFilters);
    }

    // Имитация отправки формы обратной связи
    if (contactForm && formNote) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            formNote.textContent = 'Спасибо! Сообщение отправлено (на самом деле нет, это учебный пример).';
        });
    }
});
