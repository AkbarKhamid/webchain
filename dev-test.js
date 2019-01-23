const Block = require('./block');

// BLOCK TESTS
// const block = new Block('today.now', 'last1584', 'hash789', 'newData');
// console.log(block.toString());
// console.log(Block.genesis().toString());

const newBlock = Block.mineBlock(Block.genesis(), 'new block after genesis block');
console.log(newBlock.toString());
