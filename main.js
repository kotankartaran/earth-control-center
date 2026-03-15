import { loadFlights , toggleFlights } from "./modules/flights.js";
import { loadEarthquakes , toggleEarthquakes } from "./modules/earthquakes.js";
import { loadNews } from "./modules/news.js";
import { loadConflicts } from "./modules/conflicts.js";
import { loadMarkets } from "./modules/markets.js";
import { loadSatellites, toggleSatellites } from "./modules/satellites.js";
import { loadAlerts } from "./modules/alerts.js";
import { loadShips, toggleShips } from "./modules/ships.js";

document.addEventListener("DOMContentLoaded", () => {

const map = L.map("map").setView([20,0],2);

L.tileLayer(
"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
{
maxZoom:19,
attribution:"© Esri"
}).addTo(map);

// load modules
loadFlights(map);
loadEarthquakes(map);
loadConflicts(map);
loadNews();
loadMarkets();
loadSatellites(map);
loadAlerts();
loadShips(map);

// flight toggle
document.getElementById("toggleFlights")
.addEventListener("click", () => {
toggleFlights(map);
});

// satellite toggle
document.getElementById("toggleSatellites")
.addEventListener("click", () => {
toggleSatellites(map);
});

// earthquake toggle
document.getElementById("toggleQuakes")
.addEventListener("click", () => {
toggleEarthquakes(map);
});

document.getElementById("toggleShips")
.addEventListener("click", () => {
toggleShips(map);
});

});