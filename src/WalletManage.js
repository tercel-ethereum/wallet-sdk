import { Wallet } from 'ethers'

class WalletManage {
    constructor() {
        this.wallet = null;
    }

    connect(provider) {
        this.wallet = this.wallet.connect(provider);
        return this.wallet;
    }

    show() {
        let mnemonic = this.wallet.mnemonic;
        console.log("mnemonic:",mnemonic);

        let privateKey = this.wallet.privateKey;
        console.log("privateKey:",privateKey);

        let address = this.wallet.address;
        console.log('address:', address)
    }

    newWallet() {
        this.wallet = Wallet.createRandom();
        return this.wallet;
    }

    fromMnemonic(monic) {
        this.wallet = Wallet.fromMnemonic(monic);
        return this.wallet;
    }

    fromPrivateKey(privateKey) {
        this.wallet = new Wallet(privateKey);
        return this.wallet;
    }
   
}

let walletManage = new WalletManage()

export default walletManage
