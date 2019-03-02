// // if (typeof web3 !== 'undefined') {
// //     web3 = new Web3(web3.currentProvider);
// //   } else {
// //     // Set the provider you want from Web3.providers
// //     web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:30302"));
// //   }

// var web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider("http://127.0.0.1:30302"));

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
// function watchBalance() {
//     var coinbase = web3.eth.coinbase;
//     var originalBalance = web3.eth.getBalance(coinbase).toNumber();
//     document.getElementById('coinbase').innerText = 'coinbase: ' + coinbase;
//     document.getElementById('original').innerText = ' original balance: ' + originalBalance + '    watching...';
//     web3.eth.filter('latest').watch(function() {
//         var currentBalance = web3.eth.getBalance(coinbase).toNumber();
//         document.getElementById("current").innerText = 'current: ' + currentBalance;
//         document.getElementById("diff").innerText = 'diff:    ' + (currentBalance - originalBalance);
//     });
// }

import { html, render } from './node_modules/htm/preact/standalone.mjs';
import App from "./src/App.js";

render(html`<${App} />`, document.getElementById("app"));