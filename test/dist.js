
import walletsdk from '../dist/walletsdk.esm.js';

let usdt = "0xF2ED382e6A3439Be124813842200cf6702fD6ecA";

let wallet = null;
wallet = walletsdk.walletManage.newWallet();
walletsdk.walletManage.show();

wallet = walletsdk.walletManage.fromMnemonic('peace mouse scrap chase order guess volume unit riot save reopen nation');
walletsdk.walletManage.show();

wallet = walletsdk.walletManage.fromPrivateKey("0x073b7d744984b23f8de6930de70d9555cc73f3196bfeba193e1bf4f6adea9464");
walletsdk.walletManage.show();

let chain = new walletsdk.ChainManage('https://data-seed-prebsc-1-s1.binance.org:8545/');
chain.getBalance(wallet.address);
chain.setWallet(wallet);
console.log('provider account:', chain.account);


async function testToken() {
    let res;
    let usdtToken = new walletsdk.ERC20Token(chain, usdt);
    usdtToken.connect();
    // usdtToken.info();
    res = await usdtToken.balanceOf();
    console.log('balanceOf before:', res);
    await usdtToken.allowance(wallet.address, chain.ZERO_ADDR);
    // res = await usdtToken.transfer(chain.ZERO_ADDR, 2);
    // console.log('transfer:', res.hash);
    // await res.wait();
    res = await usdtToken.tokenBalanceOf();
    console.log('balanceOf after:', res);
}
function testSSS() {
    const share = walletsdk.sss3.share("0x073b7d744984b23f8de6930de70d9555cc73f3196bfeba193e1bf4f6adea9464");
    console.log('walletsdk.sss3.Share:', share);

    let res = walletsdk.sss3.combine(share[0], share[1]);
    console.log('walletsdk.sss3.combine:', res);
    res = walletsdk.sss3.combine(share[0], share[2]);
    console.log('walletsdk.sss3.combine:', res);
    res = walletsdk.sss3.combine(share[1], share[2]);
    console.log('walletsdk.sss3.combine:', res);
    let sp = walletsdk.sss3.newShare(1, [share[1], share[2]]);
    console.log('walletsdk.sss3.newShare:', sp);
    res = walletsdk.sss3.combine(share[1], sp);
    console.log('walletsdk.sss3.combine:', res);
    sp = walletsdk.sss3.newShare(2, [share[0], share[2]]);
    console.log('walletsdk.sss3.newShare:', sp);
    res = walletsdk.sss3.combine(share[2], sp);
    console.log('walletsdk.sss3.combine:', res);
}

testSSS();
testToken();

