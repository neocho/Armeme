import Arweave from 'arweave';

const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,          
    protocol: 'https',  
    timeout: 20000,     
    logging: false,     
});

async function getWalletAddress(wallet){
    return arweave.wallets.jwkToAddress(wallet);
}

async function getAddressBalance(key){
    const balance =  await arweave.wallets.getBalance(key);
    const convert = arweave.ar.winstonToAr(balance);
    return convert;
}

async function createDataTransaction(imgFile, key){
    let transform = JSON.stringify(imgFile);
    let transaction = await arweave.createTransaction({data: transform}, key);

    transaction.addTag('Application', 'armeme-gallery-2021');

    return transaction;
}

async function signAndSubmitTransaction(transaction, key){
    await arweave.transactions.sign(transaction, key);
    let response =  await arweave.transactions.post(transaction);
    return response;
}

async function getTransactionData(id){
    return await arweave.transactions.getData(id, {decode: true, string: true});
}

async function queryData(key){
    let walletAddy = await getWalletAddress(key);
    walletAddy = walletAddy.toString();
    const txids = await arweave.arql({
        op: 'and',
        expr1: {
            op: 'equals',
            expr1: 'from',
            expr2: walletAddy
        }, 
        expr2: {
            op: 'equals', 
            expr1: 'Application', 
            expr2: 'armeme-gallery-2021'
        }
    });

    return txids;
}

export {getWalletAddress, getAddressBalance, createDataTransaction, signAndSubmitTransaction, getTransactionData, queryData};