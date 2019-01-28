const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
	let transaction, wallet, amount, recipient;
	// setUp
	beforeEach(() => {
		wallet = new Wallet();
		recipient = 'r3c1p13n7';
		amount = 50;
		transaction = Transaction.newTransaction(wallet, recipient, amount);
	});

	it('outputs the `amount` subtracted from the wallet balance', () => {
		expect(transaction.outputs.find((output) => output.address === wallet.publicKey).amount).toEqual(
			wallet.balance - amount
		);
	});

	it('outputs the `amount` added to the recipient', () => {
		expect(transaction.outputs.find((output) => output.address === recipient).amount).toEqual(amount);
	});

	it('inputs the balance of the wallet', () => {
		expect(transaction.input.amount).toEqual(wallet.balance);
	});

	it('validates a valid transaction', () => {
		expect(Transaction.verifyTransaction(transaction)).toBe(true);
	});

	it('invalidates a corrupt transaction', () => {
		transaction.outputs[0] = 5000;
		expect(Transaction.verifyTransaction(transaction)).toBe(false);
	});

	describe('transaction of an amount exceeds the balance', () => {
		beforeEach(() => {
			amount = 5000;
			transaction = Transaction.newTransaction(wallet, recipient, amount);
		});

		it("doesn't do the transaction with amount exceeding the balance", () => {
			expect(transaction).toEqual(undefined);
		});
	});
});
