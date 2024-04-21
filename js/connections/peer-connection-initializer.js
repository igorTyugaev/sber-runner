import {createQrCode} from "../common";

export class PeerConnectionInitializer {
    constructor(qrDomElement, displayDomElement, cat) {
        this.url = location.origin + "/controller.html";
        this.qrDomElement = qrDomElement;
        this.displayDomElement = displayDomElement;
        this.cat = cat;
        this.remotePeerIds = [];
        this.peer = new Peer();
    }

    initialize() {
        this.peer.on("open", (id) => {
            console.log("My peer ID is: " + id);
            createQrCode(this.url + "?id=" + this.peer.id, this.qrDomElement, this.displayDomElement);
        });

        this.peer.on("connection", this.connectionPeer.bind(this));
    }


    connectionPeer(conn) {
        this.remotePeerIds.push(conn);

        const connected = new CustomEvent("open", {detail: "connection closed"});
        this.displayDomElement.dispatchEvent(connected);

        conn.on("open", () => {
            console.log("Connected with peer: " + conn.peer);
        });

        conn.on("data", (data) => {
            console.log(data);

            const message = [this.remotePeerIds.indexOf(conn), data];
            const connection = new CustomEvent("data", {detail: message});

            this.displayDomElement.dispatchEvent(connection);
            conn.send(Date.now());
            this.cat.move(data);
        });

        conn.on("error", () => {
            console.log("Couldn't connect to " + conn.peer);
        });

        conn.on("close", () => {
            const disconnected = new CustomEvent("close", {
                detail: "connection closed",
            });

            this.displayDomElement.dispatchEvent(disconnected);
            console.log("Connection " + conn.peer + " closed");
        });
    }
}
