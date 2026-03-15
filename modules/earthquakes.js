let quakeLayer;

export function loadEarthquakes(map){

quakeLayer = L.layerGroup().addTo(map);

async function updateEarthquakes(){

const response = await fetch(
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
);

const data = await response.json();

quakeLayer.clearLayers();

data.features.forEach(eq => {

const coords = eq.geometry.coordinates;
const mag = eq.properties.mag;
const place = eq.properties.place;

const lat = coords[1];
const lon = coords[0];

let color = "yellow";

if(mag >= 5) color = "red";
else if(mag >= 3) color = "orange";

L.circleMarker([lat,lon],{
radius:mag*3,
color:color,
fillColor:color,
fillOpacity:0.7
})
.bindPopup(`🌎 ${place}<br>Magnitude: ${mag}`)
.addTo(quakeLayer);

});

}

updateEarthquakes();
setInterval(updateEarthquakes,60000);

}

export function toggleEarthquakes(map){

if(!quakeLayer) return;

if(map.hasLayer(quakeLayer)){
map.removeLayer(quakeLayer);
}else{
map.addLayer(quakeLayer);
}

}