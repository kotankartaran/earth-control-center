let satelliteLayer;
let satellites = [];

export function loadSatellites(map){

satelliteLayer = L.layerGroup().addTo(map);

const satIcon = L.icon({
iconUrl:"assests/satellite.png",
iconSize:[28,28]
});

// example satellites
const satData = [
{ name:"ISS", lat:0, lon:0, speed:0.4 },
{ name:"Starlink-1", lat:20, lon:-50, speed:0.3 },
{ name:"Starlink-2", lat:-10, lon:80, speed:0.35 }
];

satData.forEach(s => {

const marker = L.marker([s.lat,s.lon],{
icon:satIcon
})
.bindPopup(`🛰 ${s.name}`)
.addTo(satelliteLayer);

satellites.push({
marker:marker,
lat:s.lat,
lon:s.lon,
speed:s.speed
});

});

// move satellites
setInterval(moveSatellites,1000);

}

function moveSatellites(){

satellites.forEach(s => {

s.lon += s.speed;

if(s.lon > 180) s.lon = -180;

s.marker.setLatLng([s.lat,s.lon]);

});

}

export function toggleSatellites(map){

if(!satelliteLayer) return;

if(map.hasLayer(satelliteLayer)){
map.removeLayer(satelliteLayer);
}else{
map.addLayer(satelliteLayer);
}

}