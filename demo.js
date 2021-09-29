import walletManage from './WalletManage.js'

let wallet = null;
wallet = walletManage.newWallet();
walletManage.show(wallet);

wallet = walletManage.fromMnemonic('peace mouse scrap chase order guess volume unit riot save reopen nation');
walletManage.show(wallet);

wallet = walletManage.fromPrivateKey("0x073b7d744984b23f8de6930de70d9555cc73f3196bfeba193e1bf4f6adea9464");
walletManage.show(wallet);