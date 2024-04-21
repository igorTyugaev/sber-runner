import {PeerConnectionJoiner} from "./connections";

const leftEl = document.querySelector('.controller__left');
const rightEl = document.querySelector('.controller__right');
const dirEl = document.querySelector('.dir');

const peer = new PeerConnectionJoiner((conn) => {
    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft") {
            console.log("left");
            conn.send("left");
            dirEl.textContent = "left"
            leftEl.classList.add('active')
            setTimeout(() => {
                leftEl.classList.remove('active')
            }, 300)
        } else if (event.key === "ArrowRight") {
            console.log("right");
            conn.send("right");
            dirEl.textContent = "right"

            rightEl.classList.add('active')
            setTimeout(() => {
                rightEl.classList.remove('active')
            }, 500)
        }
    });
});


// let lastGamma = 0;
// let lastTime = performance.now()
//
// const handleMove = (dir, conn) => {
//     conn.send(dir);
//     // dirEl.textContent = dir
// }
//
// window.addEventListener('deviceorientation', (event) => {
//     const gamma = event.gamma;
//
//     if (Math.abs(lastGamma - gamma) > 5 && (performance.now() - lastTime) > 500) {
//         // Определяем направление наклона
//         if (gamma < -20) handleMove('left', conn);
//         else if (gamma > 20) handleMove('right', conn);
//     }
//
//     lastGamma = gamma;
//     lastTime = performance.now()
// });
