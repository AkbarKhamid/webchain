const Block = require('./block');

class BlockChain {
	constructor() {
		this.chain = [ Block.genesis() ];
	}

	addBlock(data) {
		const newBlock = Block.mineBlock(this.chain[this.chain.length - 1], data);
		this.chain.push(newBlock);

		return newBlock;
	}

	isValidChain(chain) {
		if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
			return false;
		}

		for (let i = 1; i < chain.length; i++) {
			let currentBlock = chain[i];
			let lastBlock = chain[i - 1];
			if (
				currentBlock.lastHash !== lastBlock.hash ||
				currentBlock.hash !== Block.currentBlockHash(currentBlock) // checks if the hash is proper by SHA-256
			) {
				return false;
			}
		}
		return true;
	}

	replaceChain(newChain) {
		if (newChain.length <= this.chain.length) {
			console.log('New chain has fewer blocks than the current one.');
			return;
		} else if (!this.isValidChain(newChain)) {
			console.log('New chain is not valid.');
		}

		console.log('Replacing the blockchain with the newChain');
		this.chain = newChain;
	}
}

module.exports = BlockChain;
