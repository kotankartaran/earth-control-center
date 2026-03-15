// Create map
var map = L.map('map').setView([20,0],2);


// Satellite map layer
var satellite = L.tileLayer(
'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
{
maxZoom:19,
attribution:'© Esri — Satellite Imagery'
}).addTo(map);


// Normal map
var normal = L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
);


// Map layer switch
var baseMaps = {
"Satellite": satellite,
"Normal Map": normal
};

L.control.layers(baseMaps).addTo(map);


// Plane icon
var planeIcon = L.icon({
iconUrl: "flight.png",
iconSize: [35,35]
});


// Satellite icon
var satelliteIcon = L.icon({
iconUrl: "satellite.png",
iconSize: [30,30]
});


// Example satellite marker
L.marker([0,0], {icon: satelliteIcon})
.addTo(map)
.bindPopup("🛰 Satellite");


/* -------------------- CCTV MARKERS -------------------- */

L.marker([40.7128,-74.0060]).addTo(map)
.bindPopup("📹 New York CCTV Camera");

L.marker([35.6895,139.6917]).addTo(map)
.bindPopup("📹 Tokyo Street Camera");

L.marker([51.5074,-0.1278]).addTo(map)
.bindPopup("📹 London City Camera");


/* -------------------- CONFLICT MARKERS -------------------- */

L.marker([50.4501,30.5234]).addTo(map)
.bindPopup("⚔️ Ukraine Conflict Zone");

L.marker([31.7683,35.2137]).addTo(map)
.bindPopup("⚔️ Middle East Conflict");


/* -------------------- MARKET LOCATIONS -------------------- */

L.marker([28.6139,77.2090]).addTo(map)
.bindPopup("📈 Indian Stock Exchange");

L.marker([40.7069,-74.0113]).addTo(map)
.bindPopup("📈 Wall Street");


/* -------------------- EARTHQUAKE MONITOR -------------------- */

fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson")
.then(response => response.json())
.then(data => {

data.features.forEach(function(eq){

var coords = eq.geometry.coordinates;
var mag = eq.properties.mag;
var place = eq.properties.place;

var lat = coords[1];
var lon = coords[0];

L.circleMarker([lat,lon],{
radius: mag*2,
color:"red"
})
.addTo(map)
.bindPopup("🌎 Earthquake<br>Location: "+place+"<br>Magnitude: "+mag);

});

});


/* -------------------- NEWS PANEL -------------------- */

const newsList = document.getElementById("news");

const news = [
"Global markets show volatility today",
"Earthquake activity detected in Pacific",
"Air traffic increasing across Asia",
"Military exercises reported in Europe",
"Oil prices rising due to supply concerns"
];

news.forEach(function(item){

const li = document.createElement("li");
li.textContent = item;

newsList.appendChild(li);

});


/* -------------------- MOVING FLIGHTS -------------------- */

var flights = [
{lat:30, lng:-20, dLat:0.2, dLng:0.5},
{lat:10, lng:40, dLat:0.1, dLng:-0.4},
{lat:-20, lng:60, dLat:0.15, dLng:0.3}
];

var planes = [];

flights.forEach(function(f){

var plane = L.marker([f.lat,f.lng], {icon: planeIcon})
.addTo(map)
.bindPopup("✈ Live Flight");

planes.push({marker:plane,data:f});

});


setInterval(function(){

planes.forEach(function(p){

p.data.lat += p.data.dLat;
p.data.lng += p.data.dLng;

p.marker.setLatLng([p.data.lat,p.data.lng]);

});

},1000);


/* -------------------- ORBITING SATELLITE -------------------- */

var sat = L.marker([0,-120], {icon:satelliteIcon})
.addTo(map)
.bindPopup("🛰 Orbiting Satellite");

var satLng = -120;

setInterval(function(){

satLng += 1;

if(satLng > 180){
satLng = -180;
}

sat.setLatLng([0,satLng]);

},1000);


/* -------------------- RADAR PULSE EFFECT -------------------- */

function radarPulse(lat, lng){

var circle = L.circle([lat,lng],{
radius:200000,
color:"lime",
fillOpacity:0
}).addTo(map);

var size = 200000;

setInterval(function(){

size += 50000;

circle.setRadius(size);

if(size > 500000){
size = 200000;
}

},500);

}


// Radar locations
radarPulse(38.9072,-77.0369);   // Washington
radarPulse(28.6139,77.2090);    // India
radarPulse(35.6895,139.6917);   // Tokyo
radarPulse(51.5074,-0.1278);    // London