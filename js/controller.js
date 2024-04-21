import {PeerConnectionJoiner} from "./connections";

const dirEl = document.querySelector('.dir');

const peer = new PeerConnectionJoiner((conn) => {
    document.addEventListener("keyup", (event) => {
        if (event.key === "ArrowLeft") {
            console.log("left");
            conn.send("left");
            dirEl.textContent = "left"
        } else if (event.key === "ArrowRight") {
            console.log("right");
            conn.send("right");
            dirEl.textContent = "right"
        }
    });
});
