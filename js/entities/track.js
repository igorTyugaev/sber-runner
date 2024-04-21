import {getRandomPosY} from "../common";

/**
 * Класс Track представляет собой грузовик, который движется по экрану.
 * @property {number} _posX - Позиция грузовика по оси X.
 * @property {number} _posY - Позиция грузовика по оси Y.
 * @property {number} width - Ширина грузовика.
 * @property {number} height - Высота грузовика.
 * @property {number} speed - Скорость движения грузовика.
 * @property {HTMLElement} element - Элемент DOM, представляющий грузовик.
 */
export class Track {
    /**
     * Конструктор класса Track.
     * @param {number} posX - Позиция трека по оси X.
     */
    constructor(posX) {
        // Создаем элемент трека
        this.createTrack();
        // Устанавливаем начальные позиции и размеры грузовика
        this._posX = posX;
        this._posY = getRandomPosY();
        this.width = window.innerWidth;
        this.height = this.width / 100 * 10 * 3;
        this.speed = Math.floor(window.innerHeight / 100 * 0.7);
    }

    /**
     * Создает элемент DOM для грузовика.
     */
    createTrack() {
        this.element = document.createElement('img');
        this.element.src = "/public/track.png";
        this.element.classList.add('track');
    }

    /**
     * Увеличивает позицию грузовика по оси Y
     */
    incrementPosY() {
        this.posY = this._posY + this.speed;
    }

    /**
     * Геттер для позиции грузовика по оси X.
     * @returns {number} Позиция по оси X.
     */
    get posX() {
        return this._posX;
    }

    /**
     * Геттер для позиции грузовика по оси Y.
     * @returns {number} Позиция по оси Y.
     */
    get posY() {
        return this._posY;
    }

    /**
     * Сеттер для позиции грузовика по оси Y.
     * Если позиция Y выходит за пределы экрана, устанавливает новую случайную позицию.
     * @param {number} posY - Новая позиция по оси Y.
     */
    set posY(posY) {
        this._posY = posY;

        if (posY < window.innerHeight + this.height) {
            this._posY = posY;
        } else {
            this._posY = getRandomPosY();
        }
    }

    /**
     * Отрисовывает грузовик на экране, обновляя его позицию.
     */
    render() {
        this.element.style.transform = `translate(${this.posX * 10}vw, calc(-100% + ${this.posY}px))`;
        this.incrementPosY();
    }
}
