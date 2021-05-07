const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

    }

}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2021", "Genesis Block", "0");
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

let irvinCoin = new Blockchain();
irvinCoin.addBlock(new Block(1, "06/05/2021", { amount: 4 }));
irvinCoin.addBlock(new Block(2, "07/05/2021", { amount: 8 }));
irvinCoin.addBlock(new Block(3, "08/05/2021", { amount: 16 }));

console.log(JSON.stringify(irvinCoin, null, 4));