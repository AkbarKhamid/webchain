const Websocket = require('ws');
const P2P_PORT = process.env.P2P_PORT || 5001;
// if there are peers already assign them or otherwise set it enpty
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
	constructor(blockchain) {
		this.blockchain = blockchain;
		this.sockets = [];
	}
	// start the p2p server
	listen() {
		// create server
		const server = new Websocket.Server({ port: P2P_PORT });
		// establish connection with a new socket
		server.on('connection', (socket) => this.connecSocket(socket));
		// connect to other specified peers
		this.connectPeers();
		console.log(`Listening to P2P connection on port: ${P2P_PORT}`);
	}

	connectPeers() {
		peers.forEach((peer) => {
			// make a socket for the peer's address
			const socket = new Websocket(peer);
			// in case main socket is not started, make this one main socket
			socket.on('open', () => this.connecSocket(socket));
		});
	}

	connecSocket(socket) {
		// get together
		this.sockets.push(socket);
		console.log('Socket Connected');
		// communicate
		this.messageHandler(socket);
		this.sendChain(socket);
	}

	messageHandler(socket) {
		socket.on('message', (message) => {
			// before sockets receive the message, parse it
			const data = JSON.parse(message);
			// console.log('data', data);
			// validate the data and change
			this.blockchain.replaceChain(data);
		});
	}
	// send the new chain to each socket to , probably, replaace theirs
	syncChain() {
		this.sockets.forEach((socket) => this.sendChain(socket));
	}
	// helper
	sendChain(socket) {
		socket.send(JSON.stringify(this.blockchain.chain));
	}
}

module.exports = P2pServer;

// HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev
