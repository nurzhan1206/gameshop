$(document).ready(function() {

    // 1. Получаем ID игры из URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = parseInt(urlParams.get('id'));

    if (gameId) {
        // 2. Загружаем все игры
        $.getJSON('games.json', function(data) {
            
            // 3. Находим нужную игру по ID
            const game = data.find(item => item.id === gameId);

            if (game) {
                // 4. Отрисовываем HTML
                const gameDetailHTML = `
                    <div class="col-md-5">
                        <img src="${game.image}" alt="${game.title}" class="img-fluid shadow-sm rounded">
                    </div>
                    <div class="col-md-7">
                        <h2>${game.title}</h2>
                        <h4 class="text-muted">${game.genre}</h4>
                        <p class="fs-5 mt-3">${game.description}</p>
                        <hr>
                        <h3 class="display-6">${game.price} KZT</h3>
                        <button class="btn btn-primary btn-lg mt-3 add-to-cart-btn" data-id="${game.id}">
                            Добавить в корзину
                        </button>
                    </div>
                `;
                $('#game-detail-content').html(gameDetailHTML);
                
                // 5. Обновляем <title> страницы
                document.title = `Game Shop - ${game.title}`;

            } else {
                $('#game-detail-content').html('<p class="alert alert-danger">Игра не найдена.</p>');
            }
        });
    }

    // --- Обработчик: Клик на "В корзину" ---
    // Используем делегирование, т.к. кнопка создается динамически
    $('#game-detail-content').on('click', '.add-to-cart-btn', function() {
        let gameId = $(this).data('id');
        window.addToCart(gameId); // Вызываем глобальную функцию из cart.js
    });

});