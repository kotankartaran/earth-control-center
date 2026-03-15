let alertList;
let banner;

export function loadAlerts(){

alertList = document.getElementById("alerts");
banner = document.getElementById("alertBanner");

async function checkEarthquakes(){

try{

const res = await fetch(
"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_hour.geojson"
);

const data = await res.json();

alertList.innerHTML="";

data.features.forEach(eq => {

const place = eq.properties.place;
const mag = eq.properties.mag;

const li = document.createElement("li");

li.textContent =
`🚨 Earthquake Alert - ${place} | Magnitude ${mag}`;

alertList.appendChild(li);

// show banner
banner.style.display="block";
banner.textContent=
`🚨 ALERT: Major Earthquake Detected (${mag})`;

});

}catch(err){
console.log("Alert system error",err);
}

}

// check every 2 minutes
checkEarthquakes();
setInterval(checkEarthquakes,120000);

}