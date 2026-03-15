let flightLayer;
let planes = {};

export function loadFlights(map){

flightLayer = L.markerClusterGroup({
disableClusteringAtZoom:6,
spiderfyOnMaxZoom:true
});

const planeIcon = L.icon({
iconUrl:"assests/flight.png",
iconSize:[28,28]
});

async function fetchFlights(){

try{

const res = await fetch("https://opensky-network.org/api/states/all");

if(!res.ok){
console.log("OpenSky blocked → using simulated flights");
createSimulatedFlights();
return;
}

const data = await res.json();

if(!data.states){
createSimulatedFlights();
return;
}

flightLayer.clearLayers();

data.states.slice(0,800).forEach(p=>{

const lat = p[6];
const lon = p[5];
const callsign = p[1] || "Unknown";
const velocity = p[9] || 0;
const altitude = p[7] || "N/A";

if(!lat || !lon) return;

const marker = L.marker([lat,lon],{
icon:planeIcon
});

marker.bindPopup(`
✈ Flight: ${callsign}<br>
Speed: ${velocity} m/s<br>
Altitude: ${altitude} m
`);

flightLayer.addLayer(marker);

});

}catch(err){

console.log("Flight API error → using simulated flights");

createSimulatedFlights();

}

}

function createSimulatedFlights(){

flightLayer.clearLayers();

for(let i=0;i<80;i++){

const lat=(Math.random()*140)-70;
const lon=(Math.random()*360)-180;

const marker=L.marker([lat,lon],{
icon:planeIcon
}).bindPopup("Simulated Flight");

flightLayer.addLayer(marker);

}

}

fetchFlights();

setInterval(fetchFlights,180000);

map.addLayer(flightLayer);

}

export function toggleFlights(map){

if(map.hasLayer(flightLayer)){
map.removeLayer(flightLayer);
}else{
map.addLayer(flightLayer);
}

}