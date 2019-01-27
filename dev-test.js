const Block = require('./blockchain/block');
const Blockchain = require('./blockchain');
// BLOCK TESTS
// const block = new Block('today.now', 'last1584', 'hash789', 'newData');
// console.log(block.toString());
// console.log(Block.genesis().toString());

// mineBlock() FUNCTION TESTS
// const newBlock = Block.mineBlock(Block.genesis(), 'new block after genesis block');
// console.log(newBlock.toString());

// BLOCKCHAIN TESTS
const bc = new Blockchain();
for (i = 0; i < 20; i++) {
	console.log(bc.addBlock(`dummy Data ${i + 1}`).toString());
}
