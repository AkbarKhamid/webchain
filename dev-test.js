// BLOCK TESTS
// const Block = require('./blockchain/block');
// const block = new Block('today.now', 'last1584', 'hash789', 'newData');
// console.log(block.toString());
// console.log(Block.genesis().toString());

// mineBlock() FUNCTION TESTS
// const newBlock = Block.mineBlock(Block.genesis(), 'new block after genesis block');
// console.log(newBlock.toString());

// BLOCKCHAIN TESTS | MAKE SOME BLOCKS

// const Blockchain = require('./blockchain');
// const bc = new Blockchain();
// for (i = 0; i < 20; i++) {
// 	console.log(bc.addBlock(`dummy Data ${i + 1}`).toString());
//}

// WALLET TESTS AT THE INITIAL STATE

const Wallet = require('./Wallet');
const wallet = new Wallet();

console.log(wallet.toString());
