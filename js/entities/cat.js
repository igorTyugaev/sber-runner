import {clamp} from "../common";

/**
 * Класс Cat представляет собой объект кота, который может перемещаться влево и вправо.
 * Использует DOM для отображения и управления позицией кота.
 * @property {number} _posX - Позиция кота по оси X.
 * @property {HTMLElement} element - Элемент DOM, представляющий кота.
 */
export class Cat {
    /**
     * Конструктор класса Cat.
     * Инициализирует элемент кота и его начальную позицию.
     * Также добавляет обработчик событий для перемещения кота при нажатии клавиш.
     */
    constructor() {
        // Получаем элемент кота из DOM
        this.element = document.querySelector('.cat');
        // Устанавливаем начальную позицию кота
        this._posX = 1;
        // Добавляем обработчик событий для перемещения кота при нажатии клавиш
        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {
                this.posX -= 1;
            } else if (event.key === "ArrowRight") {
                this.posX += 1;
            }
        });
    }

    /**
     * Геттер для свойства posX.
     * Возвращает текущую позицию кота по оси X.
     * @returns {number} Текущая позиция кота по оси X.
     */
    get posX() {
        return this._posX;
    }

    /**
     * Сеттер для свойства posX.
     * Устанавливает новую позицию кота по оси X, применяя функцию clamp для ограничения значения.
     * @param {number} posX Новое значение позиции кота по оси X.
     */
    set posX(posX) {
        this._posX = clamp(posX, 0, 3);
    }

    /**
     * Метод move перемещает кота в указанном направлении.
     * @param {string} dir Направление перемещения ('left' или 'right').
     */
    move(dir) {
        if (dir === 'left') {
            this.posX -= 1;
        } else if (dir === 'right') {
            this.posX += 1;
        }
    }

    /**
     * Метод render обновляет визуальное отображение кота в DOM.
     * Перемещает элемент кота в соответствии с его текущей позицией по оси X.
     */
    render() {
        this.element.style.transform = `translateX(${this.posX * 140}%)`;
    }
}
