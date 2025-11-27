// Setup of map
// Default Center - Delhi
const map = L.map("map").setView([28.6139, 77.2090], 12);

// Load OSM tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);

// Points & markers
let pickupPoint = null;
let dropPoint = null;
let pickupMarker = null;
let dropMarker = null;

// Routing controller
let routeLine = null;


//  MAP Click
// Set pickup, drop, or reset
map.on("click", function (event) {
  const point = event.latlng;

  if (!pickupPoint) {
    // Set pickup
    pickupPoint = point;
    if (pickupMarker) map.removeLayer(pickupMarker);
    pickupMarker = L.marker(point).addTo(map).bindPopup("Pickup").openPopup();

  } else if (!dropPoint) {
    // Set drop
    dropPoint = point;
    if (dropMarker) map.removeLayer(dropMarker);
    dropMarker = L.marker(point).addTo(map).bindPopup("Drop").openPopup();

  } else {
    // Reset & set new pickup
    if (pickupMarker) map.removeLayer(pickupMarker);
    if (dropMarker) map.removeLayer(dropMarker);
    if (routeLine) map.removeControl(routeLine);

    pickupPoint = point;
    dropPoint = null;

    pickupMarker = L.marker(point).addTo(map).bindPopup("Pickup").openPopup();
  }
});


//SEARCH LOCATION
// Find place using Nominatim API
document.getElementById("searchMap").addEventListener("click", function () {
  const place = document.getElementById("searchInput").value.trim();
  if (!place) return alert("Enter a place to search.");

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`)
    .then(res => res.json())
    .then(data => {
      if (!data.length) return alert("Location not found.");

      const lat = parseFloat(data[0].lat);
      const lon = parseFloat(data[0].lon);

      map.setView([lat, lon], 15);
      L.marker([lat, lon]).addTo(map).bindPopup("Searched: " + place).openPopup();
    })
    .catch(() => alert("Search error. Try again."));
});


//DISTANCE
function getDistanceKm(a, b) {
  const R = 6371;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lng - a.lng) * Math.PI / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dLon / 2) ** 2;

  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * y;
}


//  FIND RIDE 
document.getElementById("findRide").addEventListener("click", function () {

  if (!pickupPoint || !dropPoint)
    return alert("Select pickup & drop on the map.");

  const status = document.getElementById("status");
  const fareCard = document.getElementById("fareCard");
  const driverCard = document.getElementById("driverCard");

  fareCard.classList.add("hidden");
  driverCard.classList.add("hidden");

  status.textContent = "Calculating...";

  // Hiding(Where to? section) !!!

document.querySelector(".panel-top").style.display = "none";



  // REMOVE previous route if any
  if (routeLine) {
    map.removeControl(routeLine);
  }

  // CREATE REAL ROAD ROUTE WITHOUT UI PANEL
  routeLine = L.Routing.control({
    waypoints: [
      L.latLng(pickupPoint.lat, pickupPoint.lng),
      L.latLng(dropPoint.lat, dropPoint.lng)
    ],
    lineOptions: {
      styles: [{ color: "blue", weight: 4 }]
    },
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    show: false,
    createMarker: () => null  // prevent extra markers
  }).addTo(map);

  // hiding the annoying white instruction panel
  routeLine.on("routesfound", function () {
    const panels = document.getElementsByClassName("leaflet-routing-container");
    for (let p of panels) {
      p.style.display = "none";
    }
  });


  // Compute distance(same logic is implementeed)
  const distance = getDistanceKm(pickupPoint, dropPoint);
  const distanceKm = distance.toFixed(2);

  const baseFare = 30;
  const perKm = 12;
  const tax = 0.05;

  let fare = baseFare + distance * perKm;
  fare += fare * tax;
  fare = fare.toFixed(0);

  const drivers = [
    { name: "Rahul Sharma", car: "Honda City", rating: "⭐ 4.8" },
    { name: "Aman Verma", car: "Swift Dzire", rating: "⭐ 4.6" },
    { name: "Priya Singh", car: "Hyundai Creta", rating: "⭐ 4.9" }
  ];

  // Random driver
  const driver = drivers[Math.floor(Math.random() * drivers.length)];

  setTimeout(() => {
    status.textContent = "";

    document.getElementById("km").textContent = distanceKm;
    document.getElementById("fare").textContent = fare;
    fareCard.classList.remove("hidden");

    document.getElementById("driverName").textContent = driver.name;
    document.getElementById("driverCar").textContent = driver.car;
    document.getElementById("driverRating").textContent = driver.rating;
    driverCard.classList.remove("hidden");
  }, 1200);
});
