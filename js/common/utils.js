export function randomInteger(min, max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);

    return min + (array[0] / 4294967295) * (max - min);
}

export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}

export function getRandomPosY(min = 0, max = 3) {
    return -1 * randomInteger(min, max) * window.innerHeight;
}


export function checkCollision(track, cat) {
    const isMathX = track.posX === cat.posX;
    const isMathY = track.posY > window.innerHeight * 0.85 && (Math.abs(window.innerHeight * 0.85 - track.posY) < track.height);

    return isMathX && isMathY;
}

export function createQrCode(url, qrDomElement, displayDomElement) {
    new QRCode(qrDomElement, url);
    displayDomElement.classList.add('active');
    displayDomElement.querySelector('.link').href = url;
}
