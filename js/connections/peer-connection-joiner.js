export class PeerConnectionJoiner {
    constructor(connectedCallback) {
        this.peer = new Peer();
        this.connectToId = (new URLSearchParams(location.search)).get("id");
        this.lastPeerId = null;
        this.conn = null;
        this.connectedCallback = connectedCallback;

        this.peerInitialize()
    }

    join() {
        if (this.conn) this.conn.close();

        this.conn = this.peer.connect(this.connectToId, {
            reliable: true,
        });

        this.conn.on("open", () => {
            console.log("Connected to: " + this.conn.peer);
            this.connectedCallback(this.conn)
        });

        this.conn.on("data", (data) => {
        });

        this.conn.on("close", () => {
        });
    }

    peerInitialize() {
        this.peer.on("open", (id) => {
            if (this.peer.id === null) {
                console.log("Received null id from peer open");
                this.peer.id = this.lastPeerId;
            } else {
                this.lastPeerId = this.peer.id;
            }

            console.log("ID: " + this.peer.id);
            this.join();
        });

        this.peer.on("connection", (c) => {
            // Disallow incoming connections
            c.on("open", () => {
                c.send("Sender does not accept incoming connections");
                setTimeout(() => {
                    c.close();
                }, 500);
            });
        });

        this.peer.on("disconnected", () => {
            console.log("Connection lost. Please reconnect");

            // Workaround for peer.reconnect deleting previous id
            this.peer.id = this.lastPeerId;
            this.peer._lastServerId = this.lastPeerId;
            this.peer.reconnect();
        });

        this.peer.on("close", () => {
            this.conn = null;
            console.log("Connection destroyed");
        });

        this.peer.on("error", (err) => {
            console.log(err);
            alert("" + err);
        });

        return this.conn;
    }
}
