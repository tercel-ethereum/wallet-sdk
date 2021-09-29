import { Wallet } from 'ethers'

class WalletManage {
    constructor() {
        
    }

    show(wallet) {
        let mnemonic = wallet.mnemonic;
        console.log("mnemonic:",mnemonic);

        let privateKey = wallet.privateKey;
        console.log("privateKey:",privateKey);

        let address = wallet.address;
        console.log('address:', address)
    }

    newWallet() {
        return Wallet.createRandom();
    }

    fromMnemonic(monic) {
        return Wallet.fromMnemonic(monic);
    }

    fromPrivateKey(privateKey) {
        return new Wallet(privateKey);
    }
   
}

let walletManage = new WalletManage()

export default walletManage
