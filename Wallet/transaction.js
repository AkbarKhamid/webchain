const ChainUtil = require('../chain-util');

class Transaction {
	constructor() {
		this.id = ChainUtil.id();
		this.input = null; //  constains sender's balance, signature, publicKey/address
		this.outputs = [];
	}

	static newTransaction(senderWallet, recipient, amount) {
		const transaction = new this();
		// check if sender has that much
		if (amount > senderWallet.balance) {
			console.log(`Insufficent Balance: ${senderWallet.balance}\n Sending: ${amount}`);
			return;
		}

		// if so, make the transaction and record it into the outputs
		transaction.outputs.push(
			...[
				{ amount: senderWallet.balance - amount, address: senderWallet.publicKey },
				{ amount: amount, address: recipient }
			]
		);

		// create signature
		Transaction.signTransaction(transaction, senderWallet);

		return transaction;
	}

	static signTransaction(transaction, senderWallet) {
		transaction.input = {
			timeStamp: Date.now(),
			amount: senderWallet.balance,
			address: senderWallet.publicKey,
			signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
		};
	}

	static verifyTransaction(transaction) {
		return ChainUtil.verifySignature(
			transaction.input.address,
			ChainUtil.hash(transaction.outputs),
			transaction.input.signature
		);
	}
}

module.exports = Transaction;
