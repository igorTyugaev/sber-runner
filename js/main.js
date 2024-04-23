// Импорт стилей
import "../style/reset.css"
import "../style/main.css"

// Импорт сущностей и общих функций
import {Cat, Track} from "./entities";
import {GameLoop, checkCollision, getRandomPosY} from "./common";

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
 * Сбрасывает позицию кота и случайно перемещает дороги.
 */
function restartGame() {
}

/**
 * Функция для отрисовки игры.
 * Отрисовывает каждую дорогу и кота, проверяет столкновения.
 */
function render() {
    tracks.forEach((track) => {
        track.render();

        if (checkCollision(track, cat)) {
            restartGame();
            alert('Game Over!')
        }
    })

    cat.render()
}

// Запуск игры
startGame()
// Запуск игрового цикла с функцией отрисовки
gameLoop.start(render)
