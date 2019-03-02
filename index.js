import { html, render } from './node_modules/htm/preact/standalone.mjs';
import App from "./src/App.js";
import MMD from "./src/libs/meta_mask_decorator/MetaMaskDecorator.js";

render(html`<${App} />`, document.getElementById("app"));

const mmd = new MMD({debug: true});
// if (typeof web3 !== 'undefined') {
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // Set the provider you want from Web3.providers
//   // web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30302"));
//   web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/metamask"));
// }

// // var web3 = new Web3();
// // web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:30302"));

// // export default web3;
// // export default null;
// // let balance = 0;
// // web3.eth.getBalance('0x96bd30AdD5b8bE69afdE733870dD781f27e3435c', function(err, wei) {
// //     balance = web3.utils.fromWei(wei, 'ether')

// //     console.log(balance);
// // });
// // var Web3 = require('web3');
// //     var web3 = new Web3();
// //     web3.setProvider(new web3.providers.HttpProvider());
// const watchBalance = async () => {
//     const accounts = await web3.eth.getAccounts()
//     accounts.forEach(async (element) => {
//       const originalBalance = await web3.eth.getBalance(element)
//       console.log(originalBalance);
//     });
//     // originalBalance = await originalBalance.toNumber();
//     // let currentBalance;
//     // document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
//     // document.getElementById('original').innerText = ' original balance: ' + originalBalance + '    watching...';
//     // web3.eth.filter('latest').watch(function() {
//     //     currentBalance = web3.eth.getBalance(coinbase).toNumber();
//     //     // document.getElementById("current").innerText = 'current: ' + currentBalance;
//     //     // document.getElementById("diff").innerText = 'diff:    ' + (currentBalance - originalBalance);
//     // });
//     // console.log(coinbase);
//     // console.log(currentBalance);
// }

// const subscription = web3.eth.subscribe('logs', {
//   address: '0x6f39d0ac4d342e76697812282d41b06e9df578a3' // contract address
//   // topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'] // event: transfer ERC20
// }, function(error, result){
//   if (!error)
//       console.log(result);
// });



// window.watchBalance = watchBalance;


mmd.$when('isFullyReady').then(() => {
  console.log("is fully ready")
});