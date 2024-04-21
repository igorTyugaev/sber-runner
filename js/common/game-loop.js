export class GameLoop {
    constructor(delay = 0) {
        this.callback = () => {
        };
        this.lastTime = 0;
        this.frameRequest = null;
        this.delay = delay;
    }

    start(callback) {
        this.callback = callback;
        this.lastTime = performance.now();
        this.frameRequest = requestAnimationFrame(this.gameLoop.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.frameRequest);
    }

    gameLoop() {
        let now = performance.now();
        let deltaTime = now - this.lastTime;
        this.lastTime = now;

        if (deltaTime > this.delay) {
            this.callback();
            this.lastTime += this.delay;
        }

        this.frameRequest = requestAnimationFrame(this.gameLoop.bind(this));
    }
}
