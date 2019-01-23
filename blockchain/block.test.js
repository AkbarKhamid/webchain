const Block = require('./block');
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
});
