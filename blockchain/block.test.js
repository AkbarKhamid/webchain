const Block = require('./block');
const { DIFFICULTY } = require('../config');
describe('Block', () => {
	let data, lastBlock, block;

	beforeEach(() => {
		givenData = 'dummyData'; // test data
		lastBlock = Block.genesis(); // get the very first block
		block = Block.mineBlock(lastBlock, givenData); // make a new block with givenData
	});

	it('checks the `data` to match the input', () => {
		expect(block.data).toEqual(givenData);
	});

	it('checks the `lastHash` to match hash of the `lastBlock`', () => {
		expect(block.lastHash).toEqual(lastBlock.hash);
	});

	it('generates the same number of leading zeros', () => {
		expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
		console.log(block.toString());
	});

	it('lowers the `difficulty for slow-mined blocks`', () => {
		expect(Block.adjustDifficulty(block, block.timeStamp + 360000)).toEqual(block.difficulty - 1);
	});

	it('raises the difficulty for fast-mined blocks', () => {
		expect(Block.adjustDifficulty(block, block.timeStamp + 1)).toEqual(block.difficulty + 1);
	});
});
