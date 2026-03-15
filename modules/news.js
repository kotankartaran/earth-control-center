export function loadNews(){

const newsList=document.getElementById("news");

const news=[
"Ukraine war continues",
"Oil prices rising globally",
"Earthquake detected in Pacific",
"Air traffic increasing",
"Global markets fluctuate"
];

news.forEach(n=>{
const li=document.createElement("li");
li.textContent=n;
newsList.appendChild(li);
});

}