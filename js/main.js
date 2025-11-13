$(document).ready(function() {

    // Загрузка игр при старте
    loadGames();

    // --- Функция: Загрузка и отображение игр (Бонус +5%) ---
    function loadGames() {
        $.getJSON('games.json', function(data) {
            $('#game-list').empty(); 

            $.each(data, function(index, game) {
                var gameCardHTML = `
                    <div class="col-lg-3 col-md-4 col-sm-6 game-card" data-title="${game.title.toLowerCase()}">
                        <div class="card h-100">
                            <img src="${game.image}" class="card-img-top" alt="${game.title}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${game.title}</h5>
                                <p class="card-text text-muted">${game.genre}</p>
                                <h6 class="card-subtitle mt-auto mb-2">${game.price} KZT</h6>
                                
                                <a href="game.html?id=${game.id}" class="btn btn-secondary btn-sm mb-2">Подробнее</a>
                                
                                <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${game.id}">В корзину</button>
                            </div>
                        </div>
                    </div>
                `;
                $('#game-list').append(gameCardHTML);
            });
        });
    }

    // --- Функция: Поиск (Бонус +3%) ---
    $('#search-input').on('keyup', function() {
        let searchTerm = $(this).val().toLowerCase(); 

        $('.game-card').each(function() {
            let gameTitle = $(this).data('title');
            if (gameTitle.includes(searchTerm)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // --- Обработчик: Клик на "В корзину" ---
    // Используем делегирование событий, т.к. кнопки .add-to-cart-btn создаются динамически
    $('#game-list').on('click', '.add-to-cart-btn', function() {
        let gameId = $(this).data('id');
        window.addToCart(gameId); // Вызываем глобальную функцию из cart.js
    });

});