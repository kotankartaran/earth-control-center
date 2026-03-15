let previousPrices = {};

export function loadMarkets(){

const marketList = document.getElementById("markets");

async function updateMarkets(){

try{

const crypto = await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
).then(res=>res.json());

const markets = {
"Bitcoin": crypto.bitcoin.usd,
"Ethereum": crypto.ethereum.usd,
"Gold": 2180 + randomMove(),
"S&P 500": 5110 + randomMove(),
"NIFTY 50": 22300 + randomMove()
};

marketList.innerHTML = "";

Object.keys(markets).forEach(name => {

const value = markets[name];

let arrow = "";
let color = "white";

if(previousPrices[name]){

if(value > previousPrices[name]){
arrow = "▲";
color = "lime";
}

if(value < previousPrices[name]){
arrow = "▼";
color = "red";
}

}

previousPrices[name] = value;

const li = document.createElement("li");

li.innerHTML = `
${name}: ${value.toFixed(2)}
<span style="color:${color}">${arrow}</span>
`;

marketList.appendChild(li);

});

}catch(err){
console.log("Market update failed:",err);
}

}

// first load
updateMarkets();

// refresh every 15 seconds
setInterval(updateMarkets,15000);

}

function randomMove(){
return (Math.random()-0.5)*20;
}