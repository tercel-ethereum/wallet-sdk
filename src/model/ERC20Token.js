import ethers from 'ethers';
import {numberToDecimals, numberFromDecimals} from '../util.js';

class ERC20Token {
    constructor(chain, address) {
        this.abi = [{"inputs":[{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"},{"internalType":"uint256","name":"_totalSupply","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
        this.chain = chain;
        this.address = address;
        this.contract = new ethers.Contract(address, this.abi, chain.provider);
    }

    connect() {
        this.contract = this.contract.connect(this.chain.wallet);
    }

    async balanceOf(user) {
        if (!user) {
            user = this.chain.account;
        }
        let _token = await this.info();
        let res = '0'
        if (this.chain.isZeroAddress(this.address)) {
            res = await this.chain.getBalance(user);
        } else {
            res = await this.contract.balanceOf(user);
        }
        res = numberFromDecimals(res, _token.decimals);
        return res;
    }

    async tokenBalanceOf(user) {
        if (!user) {
            user = this.chain.account;
        }
        let _token = await this.info();
        let res = '0'
        if (!this.chain.isZeroAddress(this.address)) {
            res = await this.contract.balanceOf(user);
        }
        res = numberFromDecimals(res, _token.decimals);
        return res;
    }

    async totalSupply() {
        let _token = await this.info();
        let res = '0'
        if (!this.chain.isZeroAddress(this.address)) {
            res = await this.contract.totalSupply();
        }
        return numberFromDecimals(res, _token.decimals);
    }

    async info() {
        if (this.chain.tokens.hasOwnProperty(this.address.toLocaleLowerCase())) {
            return this.chain.tokens[this.address.toLocaleLowerCase()];
        }
        let res = {};
        if (this.chain.isZeroAddress(this.address)) {
            res = {
                address: this.address,
                symbol: this.chain.getZeroSymbol(),
                totalSupply: 0,
                decimals: 18
            };
        } else {
            res = {
                address: this.address,
                symbol: await this.contract.symbol(),
                totalSupply: (await this.contract.totalSupply()).toString(),
                decimals: await this.contract.decimals()
            };
        }
        this.chain.tokens[this.address.toLocaleLowerCase()] = res;
        return res;
    }

    async approve(spender, amount) {
        if (!spender) {
            throw ('Illegal approve');
        }

        if(!amount) amount = await this.contract.totalSupply();
        let tx = await this.contract.approve(spender, amount);
        return tx;
    }

    async allowance(user, spender) {
        if (this.chain.isZeroAddress(this.address)) {
            return numberFromDecimals(10, 30);
        }
        let _token = await this.info();
        let res = await this.contract.allowance(user, spender);
        res = numberFromDecimals(res, _token.decimals);
        return res;
    }

    async transfer(to, amount) {
        let _token = await this.info();
        amount = numberToDecimals(amount, _token.decimals);
        let tx = await this.contract.transfer(to, amount);
        return tx;
    }
}

export default ERC20Token;
