const Blockchain = require('.');
const Block = require('./block');

describe('Blockchain', () => {
	let bc, bc2;
	// set up before each test running, so that variables are redeclared
	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	});

	it('checks if chain starts with genesis block', () => {
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('checks if data of new block matches the givenData', () => {
		const givenData = 'dummyData';
		bc.addBlock(givenData); // adding a new block
		expect(bc.chain[bc.chain.length - 1].data).toEqual(givenData);
	});

	it('validates if the chain is valid', () => {
		bc2.addBlock('dummyData');
		expect(bc.isValidChain(bc2.chain)).toBe(true);
	});

	it('invalidates the chain with corrupted genesis block', () => {
		bc2.chain[0].data = 'Changed dummy data';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('invlaidates the chain with corrupted block at any point', () => {
		bc2.addBlock('dummy data');
		bc2.chain[1].data = 'Tempered dummy data';
		expect(bc.isValidChain(bc2.chain)).toBe(false);
	});

	it('replaces the blockchain with a valid chain', () => {
		bc2.addBlock('dummyData');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).toEqual(bc2.chain);
	});

	it("doesn't replace the chain with the one has fewer blocks", () => {
		bc.addBlock('dummyData');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).not.toEqual(bc2.chain);
	});
});
