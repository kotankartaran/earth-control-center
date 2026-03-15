let shipLayer;

export function loadShips(map){

shipLayer = L.markerClusterGroup({
disableClusteringAtZoom:6,
spiderfyOnMaxZoom:true
});

const shipIcon = L.icon({
iconUrl:"assests/ship.png",
iconSize:[26,26]
});

async function fetchShips(){

try{

const res = await fetch("https://api.vesselfinder.com/vessels");

if(!res.ok){
console.log("Ship API blocked → using simulation");
createSimulatedShips();
return;
}

const data = await res.json();

shipLayer.clearLayers();

data.vessels.slice(0,800).forEach(v=>{

const lat = v.lat;
const lon = v.lon;
const name = v.name || "Unknown Vessel";
const speed = v.speed || "N/A";

if(!lat || !lon) return;

const marker = L.marker([lat,lon],{
icon:shipIcon
});

marker.bindPopup(`
🚢 ${name}<br>
Speed: ${speed} knots
`);

shipLayer.addLayer(marker);

});

}catch(err){

console.log("Ship API error → using simulated ships");

createSimulatedShips();

}

}

function createSimulatedShips(){

shipLayer.clearLayers();

// major shipping routes
const routes = [

[29,32],     // Suez Canal
[1,103],     // Singapore
[35,139],    // Japan
[37,-122],   // California
[52,4],      // Rotterdam
[19,72],     // Mumbai
[31,121],    // Shanghai
[9,79],      // Sri Lanka route
[14,120],    // Manila
[25,55]      // Persian Gulf

];

for(let i=0;i<100;i++){

const r = routes[Math.floor(Math.random()*routes.length)];

const lat = r[0] + (Math.random()*4-2);
const lon = r[1] + (Math.random()*4-2);

const marker = L.marker([lat,lon],{
icon:shipIcon
}).bindPopup("🚢 Cargo Vessel");

shipLayer.addLayer(marker);

}

}

fetchShips();

setInterval(fetchShips,180000);

map.addLayer(shipLayer);

}

export function toggleShips(map){

if(map.hasLayer(shipLayer)){
map.removeLayer(shipLayer);
}else{
map.addLayer(shipLayer);
}

}