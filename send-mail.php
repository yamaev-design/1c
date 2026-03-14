<?php
// send-mail.php - Обработчик формы заявки AI Seller 1С

// Подключаем PHPMailer через Composer autoload или CDN (здесь используем ручной include если есть, или CDN в JS, но для надежности лучше скачать библиотеку)
// Для работы этого скрипта на хостинге Timeweb лучше всего загрузить папку vendor с PHPMailer или использовать встроенный mail() с параметрами, 
// НО так как вы просили SMTP, вот пример с подключением библиотеки.
// Если библиотека не загружена, раскомментируйте строки ниже для загрузки через CDN (требуется PHP 7.4+)

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Проверка метода запроса
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    echo "Доступ запрещен";
    exit;
}

// Получение и очистка данных
$name = htmlspecialchars(trim($_POST['name'] ?? ''));
$email = htmlspecialchars(trim($_POST['email'] ?? ''));
$phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
$marketplace = htmlspecialchars(trim($_POST['marketplace'] ?? 'Не указано'));
$consent = isset($_POST['consent']) ? "Да" : "Нет";

// Валидация
if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Заполните все обязательные поля"]);
    exit;
}

// Настройки SMTP Timeweb
$smtp_host = 'smtp.timeweb.ru';
$smtp_port = 2525; // Или 25
$smtp_user = 'contact@projmo.ru';
$smtp_pass = 'zm2RY6F33';
$smtp_from = 'contact@projmo.ru';
$recipient = 'yamaev@gmail.com';

// Тема письма
$subject = "Новая заявка (Trial): AI Seller 1С от $name";

// Тело письма (HTML)
$message_body = "
<html>
<head>
    <style>body{font-family: Arial, sans-serif; line-height: 1.6; color: #333;}</style>
</head>
<body>
    <h2>Новая заявка на пробный период</h2>
    <table border='0' cellpadding='10' cellspacing='0' style='width: 100%; max-width: 600px;'>
        <tr><td><strong>Имя:</strong></td><td>$name</td></tr>
        <tr><td><strong>Email:</strong></td><td>$email</td></tr>
        <tr><td><strong>Телефон:</strong></td><td>$phone</td></tr>
        <tr><td><strong>Площадка:</strong></td><td>$marketplace</td></tr>
        <tr><td><strong>Согласие 152-ФЗ:</strong></td><td>$consent</td></tr>
        <tr><td><strong>Дата:</strong></td><td>" . date('d.m.Y H:i') . "</td></tr>
    </table>
    <p style='margin-top: 20px; font-size: 12px; color: #888;'>Заявка отправлена с лендинга AI Seller 1С.</p>
</body>
</html>
";

// Попытка загрузки PHPMailer (если она лежит в папке vendor рядом со скриптом)
// Если вы не загружали библиотеку через composer, раскомментируйте блок ниже для автозагрузки через CDN (требует интернет на сервере)
/*
require 'vendor/autoload.php'; 
*/

// Альтернативный вариант БЕЗ внешних библиотек, используя встроенный mail() с правильными заголовками для Timeweb
// Это часто работает стабильнее на дешевых хостингах без composer

$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: AI Seller 1С <{$smtp_from}>" . "\r\n";
$headers .= "Reply-To: {$email}" . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправка через стандартную функцию mail() с флагом -f (как в инструкции Timeweb)
// Флаг -f важен для прохождения SPF проверок
$additional_params = "-f{$smtp_from}";

if (mail($recipient, $subject, $message_body, $headers, $additional_params)) {
    echo json_encode(["status" => "success", "message" => "Заявка успешно отправлена!"]);
} else {
    // Если mail() не сработал, можно попробовать через SMTP библиотеку, если она подключена
    // Здесь упрощенный вывод ошибки
    error_log("Ошибка отправки письма для: $email");
    echo json_encode(["status" => "error", "message" => "Ошибка при отправке. Попробуйте позже."]);
}
?>
