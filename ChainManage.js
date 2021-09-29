import ethers from 'ethers'

class ChainManage {
    constructor(rpc) {
        this.ZERO_ADDR = '0x0000000000000000000000000000000000000000';
        this.provider = new ethers.providers.JsonRpcProvider(rpc);
        this.wallet = null;
        this.account = '';
        this.tokens = {};
    }

    setWallet(wallet) {
        this.wallet = wallet.connect(this.provider);
        this.account = this.wallet.address;
    }

    async getBalance(address) {
        let balance = await this.provider.getBalance(address);
        let res = ethers.utils.formatEther(balance);
        console.log("Balance: " + res);
        return res;
    }

    async getBlockNumber() {
        return await this.provider.getBlockNumber();
    }

    async getGasPrice() {
        return await this.provider.getGasPrice();
    }

    isZeroAddress(addr) {
        return addr == this.ZERO_ADDR;
    }
}

export default ChainManage
