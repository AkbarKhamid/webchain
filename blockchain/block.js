const { DIFFICULTY, MINE_RATE } = require('../config');
const ChainUtil = require('../chain-util');
class Block {
	constructor(timeStamp, lastHash, hash, data, nonce, difficulty) {
		this.timeStamp = timeStamp;
		this.lastHash = lastHash;
		this.hash = hash;
		this.nonce = nonce;
		this.difficulty = difficulty || DIFFICULTY; // for the genesis block
		this.data = data;
	}

	toString() {
		return `Block -
      TimeStamp : ${this.timeStamp}
      Last Hash : ${this.lastHash}
			Hash      : ${this.hash}
			Nonce 		: ${this.nonce}
			Difficulty: ${this.difficulty}
			Data      : ${this.data}`;
	}

	static genesis() {
		return new this('Genesis Time', '------', 'f1r57-h45h', [], 0, DIFFICULTY);
	}

	static mineBlock(lastBlock, data) {
		let hash, timeStamp, nonce;
		const lastHash = lastBlock.hash;
		let { difficulty } = lastBlock;
		// PROOF OF WORK ALGORITHM
		do {
			nonce++;
			timeStamp = Date.now();
			difficulty = Block.adjustDifficulty(lastBlock, timeStamp);
			hash = Block.hash(timeStamp, lastHash, data, nonce, difficulty);
		} while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

		return new this(timeStamp, lastHash, hash, data, nonce, difficulty);
	}

	static hash(timeStamp, lastHash, data, nonce, difficulty) {
		return ChainUtil.hash(`${timeStamp}${lastHash}${data}${nonce}${difficulty}`).toString();
	}

	static currentBlockHash(block) {
		const { timeStamp, lastHash, data, nonce, difficulty } = block;
		return Block.hash(timeStamp, lastHash, data, nonce, difficulty);
	}

	static adjustDifficulty(lastBlock, currentTime) {
		let { difficulty } = lastBlock;
		difficulty = lastBlock.timeStamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
		return difficulty;
	}
}

module.exports = Block;
