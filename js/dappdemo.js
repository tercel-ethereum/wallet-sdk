import ChainApp from './ChainApp.js';

let usdt = "0x033c348873a71903F284750D2E0406cc3d5c3647";

let wallet = null;
wallet = ChainApp.walletManage.newWallet();
ChainApp.walletManage.show();

wallet = ChainApp.walletManage.fromMnemonic('peace mouse scrap chase order guess volume unit riot save reopen nation');
ChainApp.walletManage.show();

wallet = ChainApp.walletManage.fromPrivateKey("0x073b7d744984b23f8de6930de70d9555cc73f3196bfeba193e1bf4f6adea9464");
ChainApp.walletManage.show();

let chain = new ChainApp.ChainManage('https://http-testnet.hecochain.com');
chain.getBalance(wallet.address);
chain.setWallet(wallet);
console.log('provider account:', chain.account);

async function testToken() {
    let res;
    let usdtToken = new ChainApp.ERC20Token(chain, usdt);
    usdtToken.connect();
    // usdtToken.info();
    res = await usdtToken.balanceOf();
    console.log('balanceOf before:', res);
    await usdtToken.allowance(wallet.address, chain.ZERO_ADDR);
    res = await usdtToken.transfer(chain.ZERO_ADDR, 2);
    console.log('transfer:', res.hash);
    await res.wait();
    res = await usdtToken.tokenBalanceOf();
    console.log('balanceOf after:', res);
}

testToken();