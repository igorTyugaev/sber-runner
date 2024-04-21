// Импорт стилей
import "../style/reset.css"
import "../style/main.css"

// Импорт сущностей и общих функций
import {Cat, Track} from "./entities";
import {GameLoop, checkCollision, getRandomPosY} from "./common";
import {PeerConnectionInitializer} from "./connections";

// Получение элементов игры из DOM
const modalEl = document.querySelector(".modal");
const gameEl = document.querySelector('.game');
const codeEl = document.querySelector(".qrcode");

// Создание экземпляра кота
const cat = new Cat();
// Создание экземпляра игрового цикла
const gameLoop = new GameLoop()
const peerConnection = new PeerConnectionInitializer(codeEl, modalEl, cat);

// Массив для хранения дорог
const tracks = [];

/**
 * Функция для начала игры.
 * Создает 4 дороги и добавляет их в DOM.
 */
function startGame() {
    for (let index = 0; index < 4; index++) {
        const track = new Track(index);
        gameEl.appendChild(track.element);

        tracks.push(track);
    }
}

/**
 * Функция для перезапуска игры.
 * Сбрасывает позицию кота и случайно перемещает дороги.
 */
function restartGame() {
    cat.posX = 1;

    for (const track of tracks) {
        track.posY = getRandomPosY()
    }
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
peerConnection.initialize();

modalEl.addEventListener('open', (event) => {
    modalEl.classList.remove('active')
    // Запуск игрового цикла с функцией отрисовки
    gameLoop.start(render)
});

modalEl.addEventListener('close', (event) => {
    modalEl.classList.add('active')
});

