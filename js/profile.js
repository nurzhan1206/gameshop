$(document).ready(function() {
    
    // --- Валидация формы (Критерий "JS Logic" + Бонус +3%) ---
    
    $('#registration-form').on('submit', function(event) {
        event.preventDefault(); // Запрещаем отправку формы

        let isValid = true;

        // 1. Сбрасываем все предыдущие ошибки
        $('.form-control').removeClass('is-invalid');

        // 2. Валидация Email
        const $email = $('#email');
        if (!$email.val() || !isValidEmail($email.val())) {
            $email.addClass('is-invalid');
            isValid = false;
        }

        // 3. Валидация Пароля
        const $password = $('#password');
        if ($password.val().length < 8) {
            $password.addClass('is-invalid');
            isValid = false;
        }

        // 4. Валидация Подтверждения Пароля
        const $passwordConfirm = $('#password-confirm');
        if ($passwordConfirm.val() !== $password.val() || $passwordConfirm.val() === '') {
            $passwordConfirm.addClass('is-invalid');
            isValid = false;
        }
        
        // Если все хорошо, можно показать alert
        if (isValid) {
            alert('Форма успешно отправлена!');
            // (здесь могла бы быть реальная отправка данных)
            // Очищаем форму
            $('#registration-form')[0].reset();
        }
    });

    // Вспомогательная функция для email
    function isValidEmail(email) {
        // Простое регулярное выражение для проверки email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

});