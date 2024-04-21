// Импорт стилей
import "../style/reset.css"
import "../style/main.css"

// Импорт сущностей и общих функций
import {Cat, Track} from "./entities";
import {GameLoop, checkCollision, getRandomPosY} from "./common";

// Получение элементов игры из DOM
const gameEl = document.querySelector('.game');

// Создание экземпляра кота
const cat = new Cat();
// Создание экземпляра игрового цикла
const gameLoop = new GameLoop()
// Массив для хранения дорог
const tracks = [];

/**
 * Функция для начала игры.
 * Создает 4 дороги и добавляет их в DOM.
 */
function startGame() {
}

/**
 * Функция для перезапуска игры.
 * Сбрасывает позицию кота и случайно перемещает грузовики.
 */
function restartGame() {
}

/**
 * Функция для отрисовки игры.
 * Отрисовывает каждый грузовик и кота, проверяет столкновения.
 */
function render() {
    // TODO: Используй checkCollision(track, cat) для проверки столкновений
}

// Запуск игры
startGame()
// Запуск игрового цикла с функцией отрисовки
gameLoop.start(render)
