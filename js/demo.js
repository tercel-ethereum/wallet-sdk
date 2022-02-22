import ethers from './lib/ethers.min.js';

function show(wallet) {
    let mnemonic = wallet.mnemonic;
    console.log("mnemonic:",mnemonic);

    let privateKey = wallet.privateKey;
    console.log("privateKey:",privateKey);

    let address = wallet.address;
    console.log('address:', address)
}

function newWallet() {
    let wallet = ethers.Wallet.createRandom();
    show(wallet);
}

async function getBalance(address) {
    let provider = new ethers.providers.JsonRpcProvider('https://http-testnet.hecochain.com');
    let balance = await provider.getBalance(address);
    let res = ethers.utils.formatEther(balance);
    console.log("Balance: " + res);
    return res;
}

getBalance('0x8CF6f254AED28614A0bD0390a3ec5EdDd54b8ece');