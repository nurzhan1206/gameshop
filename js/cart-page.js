$(document).ready(function() {

    function loadCartPage() {
        const cart = JSON.parse(localStorage.getItem('gameShopCart')) || [];
        const $cartItemsContainer = $('#cart-items');
        
        if (cart.length === 0) {
            $cartItemsContainer.html('<p class="alert alert-info">Ваша корзина пуста.</p>');
            $('#cart-total').text(0);
            return;
        }

        // данные о ценах
        $.getJSON('games.json', function(allGames) {
            $cartItemsContainer.empty();
            let total = 0;

            cart.forEach(cartItem => {
                // Находим полную инфо по игре
                const game = allGames.find(g => g.id === cartItem.id);

                if (game) {
                    let itemTotal = game.price * cartItem.quantity;
                    total += itemTotal;

                    const cartItemHTML = `
                        <div class="cart-item">
                            <img src="${game.image}" alt="${game.title}">
                            <div class="cart-item-info">
                                <h4>${game.title}</h4>
                                <p>Количество: ${cartItem.quantity}</p>
                            </div>
                            <h5>${itemTotal} KZT</h5>
                        </div>
                    `;
                    $cartItemsContainer.append(cartItemHTML);
                }
            });

            // Обновляем общую сумму
            $('#cart-total').text(total);
        });
    }

    // Загружаем корзину при открытии страницы
    loadCartPage();

});