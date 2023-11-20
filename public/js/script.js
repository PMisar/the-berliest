// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("the-berliest JS imported successfully!");
});

const map = L.map("map").setView([52.52, 13.405], 13); // Berlin coordinates

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Dummy places data (replace with your actual data)
const places = [
  { name: "Restaurant 1", category: "restaurants", lat: 52.51, lon: 13.39 },
  { name: "Restaurant 2", category: "restaurants", lat: 52.53, lon: 13.4 },
  { name: "Restaurant 3", category: "restaurants", lat: 52.515, lon: 13.415 },
  { name: "Restaurant 4", category: "restaurants", lat: 52.52, lon: 13.385 },
  { name: "Restaurant 5", category: "restaurants", lat: 52.505, lon: 13.42 },
  { name: "Restaurant 6", category: "restaurants", lat: 52.525, lon: 13.395 },
  { name: "Bar 1", category: "bars", lat: 52.505, lon: 13.415 },
  { name: "Bar 2", category: "bars", lat: 52.515, lon: 13.43 },
  { name: "Bar 3", category: "bars", lat: 52.525, lon: 13.41 },
  { name: "Bar 4", category: "bars", lat: 52.51, lon: 13.405 },
  { name: "Bar 5", category: "bars", lat: 52.52, lon: 13.39 },
  { name: "Club 1", category: "clubs", lat: 52.525, lon: 13.415 },
  { name: "Club 2", category: "clubs", lat: 52.53, lon: 13.425 },
  { name: "Club 3", category: "clubs", lat: 52.52, lon: 13.43 },
  { name: "Club 4", category: "clubs", lat: 52.515, lon: 13.42 },
  { name: "Club 5", category: "clubs", lat: 52.51, lon: 13.415 },
  { name: "Party 1", category: "parties", lat: 52.52, lon: 13.415 },
  { name: "Party 2", category: "parties", lat: 52.515, lon: 13.405 },
  { name: "Party 3", category: "parties", lat: 52.525, lon: 13.42 },
  { name: "Party 4", category: "parties", lat: 52.51, lon: 13.41 },
];

// Array to store selected places
let selectedPlaces = [];

// Variable to store the polyline
let routePolyline;

// Function to handle place selection
function selectPlace(place) {
  if (!selectedPlaces.find((p) => p.name === place.name)) {
    selectedPlaces.push(place);
    // Add selected place to the list
    const selectedPlacesList = document.getElementById("selectedPlaces");
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = place.name;
    selectedPlacesList.appendChild(listItem);
  }
}

// Event listener for map marker click
function onMarkerClick(e) {
  const place = places.find((p) => p.name === e.target.getPopup().getContent());
  selectPlace(place);
}

// Function to filter places based on the selected category
function filterPlaces(category) {
  // Clear existing markers
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });

  // Add markers for filtered places and attach click event
  places.forEach((place) => {
    if (category === "all" || place.category === category) {
      const marker = L.marker([place.lat, place.lon])
        .addTo(map)
        .bindPopup(place.name);
      marker.on("click", onMarkerClick);
    }
  });
}

// Event listener for the dropdown change
document
  .getElementById("categorySelect")
  .addEventListener("change", function () {
    const selectedCategory = this.value;
    filterPlaces(selectedCategory);
  });

// Event listener for Show Route button
document
  .getElementById("showRouteBtn")
  .addEventListener("click", async function () {
    try {
      // Extract coordinates of selected places
      const selectedCoordinates = selectedPlaces.map((place) => [
        place.lon,
        place.lat,
      ]);

      // Use GraphHopper API to get the route in GPX format
      const response = await fetch(
        `https://graphhopper.com/api/1/route?${selectedCoordinates
          .map((coord) => `point=${coord[1]},${coord[0]}`)
          .join(
            "&"
          )}&profile=foot&key=02a25f5b-a5b8-40db-8d82-78b433c0ac9d&type=gpx`
      );

      if (!response.ok) {
        console.error(`GraphHopper API error: ${response.statusText}`);
        console.log(await response.text());
        throw new Error("Failed to fetch route from GraphHopper.");
      }

      // Get the GPX data
      const gpxData = await response.text();

      // Parse GPX data to get coordinates
      const routeCoordinates = parseGpxData(gpxData);

      console.log("Route Coordinates:", routeCoordinates);

      // Clear existing polyline
      if (routePolyline) {
        map.removeLayer(routePolyline);
      }

      // Add a new polyline to the map
      routePolyline = L.polyline(routeCoordinates, { color: "blue" }).addTo(
        map
      );

      // Fit the map to the bounds of the polyline
      map.fitBounds(routePolyline.getBounds());
    } catch (error) {
      console.error("Error fetching route from GraphHopper:", error);
    }
  });

// Function to parse GPX data and extract coordinates
function parseGpxData(gpxData) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(gpxData, "text/xml");

  const trackPoints = xmlDoc.querySelectorAll("trkpt");
  const coordinates = [];

  trackPoints.forEach((point) => {
    const lat = parseFloat(point.getAttribute("lat"));
    const lon = parseFloat(point.getAttribute("lon"));
    coordinates.push([lat, lon]);
  });

  return coordinates;
}
