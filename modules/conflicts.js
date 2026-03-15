let conflictLayer;

export function loadConflicts(map){

conflictLayer = L.layerGroup().addTo(map);

const conflictList = document.getElementById("conflicts");

const conflicts = [

{
name:"Ukraine War",
lat:50.45,
lon:30.52,
countries:"Russia vs Ukraine",
type:"Full-scale war",
year:"2022–Present",
severity:"High",
intensity:9,
description:"Large-scale conventional warfare with missile strikes, trench fighting and drone warfare."
},

{
name:"Israel–Gaza War",
lat:31.5,
lon:34.45,
countries:"Israel vs Hamas",
type:"Urban warfare",
year:"2023–Present",
severity:"High",
intensity:8,
description:"Major urban fighting in Gaza with regional escalation risks."
},

{
name:"Sudan Civil War",
lat:15.5,
lon:32.56,
countries:"Sudanese Armed Forces vs RSF",
type:"Civil war",
year:"2023–Present",
severity:"High",
intensity:7,
description:"Large humanitarian crisis with nationwide fighting."
},

{
name:"Myanmar Civil War",
lat:21.9,
lon:95.9,
countries:"Military Junta vs Resistance",
type:"Civil war",
year:"2021–Present",
severity:"Medium",
intensity:6,
description:"Nationwide insurgency after the 2021 military coup."
},

{
name:"Iran–Israel Proxy Conflict",
lat:35.68,
lon:51.41,
countries:"Iran vs Israel",
type:"Proxy conflict",
year:"Ongoing",
severity:"Medium",
intensity:6,
description:"Regional proxy conflict including missile strikes and cyber operations."
},

{
name:"South China Sea Tensions",
lat:16,
lon:114,
countries:"China vs Philippines/Vietnam",
type:"Territorial dispute",
year:"Ongoing",
severity:"Low",
intensity:4,
description:"Naval standoffs and island militarization."
}

];

conflicts.forEach(c => {

// add conflict to side panel
const li = document.createElement("li");
li.textContent = `${c.name} (${c.severity})`;
conflictList.appendChild(li);

// severity color
let color="orange";

if(c.severity==="High") color="red";
if(c.severity==="Low") color="yellow";

// pulsing circle
const circle = L.circle([c.lat,c.lon],{
radius:c.intensity*50000,
color:color,
fillColor:color,
fillOpacity:0.2
}).addTo(conflictLayer);

// center marker
const marker = L.circleMarker([c.lat,c.lon],{
radius:8,
color:color,
fillColor:color,
fillOpacity:1
}).addTo(conflictLayer);

marker.bindPopup(`
⚔ <b>${c.name}</b><br>
<b>Countries:</b> ${c.countries}<br>
<b>Type:</b> ${c.type}<br>
<b>Since:</b> ${c.year}<br>
<b>Severity:</b> ${c.severity}<br>
<b>Intensity:</b> ${c.intensity}/10<br>
<b>Description:</b> ${c.description}
`);

// pulse animation
let size = c.intensity*50000;

setInterval(()=>{

size += 20000;

if(size > c.intensity*70000){
size = c.intensity*50000;
}

circle.setRadius(size);

},1000);

});

}

export function toggleConflicts(map){

if(!conflictLayer) return;

if(map.hasLayer(conflictLayer)){
map.removeLayer(conflictLayer);
}else{
map.addLayer(conflictLayer);
}

}