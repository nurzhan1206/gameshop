// Ждем готовности DOM
$(document).ready(function() {
    
    // --- 1. ЛОГИКА ТЕМЫ (Бонус +3%) ---
    
    // Функция: применить тему
    function applyTheme(theme) {
        if (theme === 'dark') {
            $('body').addClass('dark-mode');
        } else {
            $('body').removeClass('dark-mode');
        }
    }

    // При загрузке: проверяем localStorage
    let currentTheme = localStorage.getItem('theme') || 'light';
    applyTheme(currentTheme);

    // Обработчик кнопки
    $('#theme-toggle').on('click', function() {
        let theme = $('body').hasClass('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    });

    
    // --- 2. ГЛОБАЛЬНАЯ ЛОГИКА КОРЗИНЫ ---

    // Функция: получить корзину из localStorage
    function getCart() {
        return JSON.parse(localStorage.getItem('gameShopCart')) || [];
    }

    // Функция: сохранить корзину в localStorage
    function saveCart(cart) {
        localStorage.setItem('gameShopCart', JSON.stringify(cart));
        updateCartCounter();
    }

    // Функция: добавить товар в корзину
    // Мы сделаем эту функцию глобальной, чтобы другие скрипты могли ее вызывать
    window.addToCart = function(gameId) {
        let cart = getCart();
        let gameIdNum = parseInt(gameId); // Убедимся, что ID - это число

        // Ищем, есть ли уже такая игра в корзине
        let existingItem = cart.find(item => item.id === gameIdNum);

        if (existingItem) {
            existingItem.quantity++; // Увеличиваем кол-во
        } else {
            cart.push({ id: gameIdNum, quantity: 1 }); // Добавляем новую
        }
        
        saveCart(cart);
        alert('Игра добавлена в корзину!'); // (Для Бонуса "Notification System" (+3%)  это можно заменить на красивый toast)
    }

    // Функция: обновить счетчик на иконке корзины
    function updateCartCounter() {
        let cart = getCart();
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            $('#cart-counter').text(totalItems).show();
        } else {
            $('#cart-counter').hide();
        }
    }

    // Инициализация
    updateCartCounter(); // Обновляем счетчик при загрузке любой страницы
});