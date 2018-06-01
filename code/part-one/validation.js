'use strict';

const { createHash } = require('crypto');
const signing = require('./signing');

/**
 * A simple validation function for transactions. Accepts a transaction
 * and returns true or false. It should reject transactions that have negative
 * amounts, were improperly signed, or that have been modified since signing.
 */
const isValidTransaction = transaction => {
  const message = transaction.source + transaction.recipient + transaction.amount;
  const verified = signing.verify(transaction.source, message, transaction.signature);
  if (transaction.amount < 0 || verified === false) {
    return false;
  }
  return true;
};

/**
 * Validation function for blocks. Accepts a block and returns true or false.
 * It should reject blocks if their hash or any other properties were altered,
 * or if they contain any invalid transactions.
 */
const isValidBlock = block => {
  const transString = block.transactions.map(trans => trans.signature).join('');
  const stringToHash = block.previousHash + transString + block.nonce;
  const hash = createHash('sha512').update(stringToHash).digest('hex');
  if (block.hash !== hash) {
    return false;
  }
  return block.transactions.every(isValidTransaction);
};

/**
 * One more validation function. Accepts a blockchain, and returns true
 * or false. There are a few conditions that should cause a blockchain
 * to be rejected:
 *   - missing genesis block
 *   - any block besides genesis has a null hash
 *   - any block besides genesis has a previousHash that does not match
 *     the previous hash
 *   - contains any invalid blocks
 *   - contains any invalid transactions
 */
const isValidChain = blockchain => {
  if (!blockchain.blocks[0] || blockchain.blocks[0].previousHash !== null) {
    return false;
  }
  const minusGenesis = blockchain.blocks.slice(1);
  minusGenesis.forEach(block => {
    // TO DO
  });
  return minusGenesis.every(isValidBlock);
};

/**
 * This last one is just for fun. Become a hacker and tamper with the passed in
 * blockchain, mutating it for your own nefarious purposes. This should
 * (in theory) make the blockchain fail later validation checks;
 */
const breakChain = blockchain => {
  // Your code here

};

module.exports = {
  isValidTransaction,
  isValidBlock,
  isValidChain,
  breakChain
};
