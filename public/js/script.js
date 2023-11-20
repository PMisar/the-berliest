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
  {
    name: "Stilbruch Kaffee",
    category: "breluncoffee",
    lat: 52.508329144972556,
    lon: 13.453455521362487,
  },
  {
    name: "DOTS",
    category: "breluncoffee",
    lat: 52.48663687124957,
    lon: 13.434670753631147,
  },
  {
    name: "La Maison",
    category: "breluncoffee",
    lat: 52.49385408025976,
    lon: 13.431029526888652,
  },
  {
    name: "Noble Rot Weinbar",
    category: "bar",
    lat: 52.50976886755068,
    lon: 13.460267815146814,
  },
  {
    name: "Vintage Revivals",
    category: "shop",
    lat: 52.524334833717816,
    lon: 13.408772513821996,
  },
  {
    name: "DARK MATTER",
    category: "exhibition",
    lat: 52.4928546542553,
    lon: 13.492671432999822,
  },
  {
    name: "Kauf Dich Glücklich",
    category: "shop",
    lat: 52.53326204575885,
    lon: 13.404305454626424,
  },
  {
    name: "BURRO UNCHAINED",
    category: "restaurant",
    lat: 52.47513227012783,
    lon: 13.423946922090007,
  },
  {
    name: "Fernsehturm",
    category: "tourist",
    lat: 52.52095859230303,
    lon: 13.409483470828881,
  },
  {
    name: "Berghain",
    category: "club",
    lat: 52.511531046762975,
    lon: 13.443017013029815,
  },
  {
    name: "Sisyphos",
    category: "club",
    lat: 52.49307675403281,
    lon: 13.491137209451416,
  },
  {
    name: "Aiko",
    category: "restaurant",
    lat: 52.53067053507697,
    lon: 13.400335364418,
  },
  {
    name: "goldies Smashburger.",
    category: "restaurant",
    lat: 52.49542461175487,
    lon: 13.419703555483546,
  },
  {
    name: "Fatoush ",
    category: "restaurant",
    lat: 52.511584327304135,
    lon: 13.457223480941575,
  },
  {
    name: "La Buvette ",
    category: "restaurant",
    lat: 52.54761310515569,
    lon: 13.408964024798124,
  },
  {
    name: "Vegang Prenzlauer Berg",
    category: "restaurant",
    lat: 52.538773957380194,
    lon: 13.408582184321753,
  },
  {
    name: "Holzmarkt25",
    category: "bar",
    lat: 52.51133992324064,
    lon: 13.426835378456282,
  },
  {
    name: "gART.n",
    category: "club",
    lat: 52.4837246814709,
    lon: 13.501605499663029,
  },
  {
    name: "Loveco Friedrichshain",
    category: "shop",
    lat: 52.49096935765267,
    lon: 13.410147184319394,
  },
  {
    name: "Wen Cheng 1",
    category: "restaurant",
    lat: 52.54642263709715,
    lon: 13.413607208598014,
  },
  {
    name: "Repeater Vintage Shop",
    category: "shop",
    lat: 52.48918743150622,
    lon: 13.432846786171343,
  },
  {
    name: "März",
    category: "bar",
    lat: 52.54722684138422,
    lon: 13.4153861186577,
  },
  {
    name: "Siegessäule",
    category: "tourist",
    lat: 52.514679571113625,
    lon: 13.350097768976484,
  },
  {
    name: "Brandenburger Tor",
    category: "tourist",
    lat: 52.51641820714497,
    lon: 13.377747012953938,
  },
  {
    name: "East Side Gallery",
    category: "tourist",
    lat: 52.50547911696971,
    lon: 13.439964838264544,
  },
  {
    name: "Jewish Museum Berlin",
    category: "museum",
    lat: 52.502413586121975,
    lon: 13.395453173182705,
  },
  {
    name: "Memorial to the Murdered Jews of Europe",
    category: "tourist",
    lat: 52.51479645935983,
    lon: 13.378538941724065,
  },
  {
    name: "Beate Uwe ",
    category: "club",
    lat: 52.51828285171526,
    lon: 13.418905396536342,
  },
  {
    name: "Volkspark Friedrichshain",
    category: "park",
    lat: 52.52862135677331,
    lon: 13.436497417060838,
  },
  {
    name: "Gedenkstätte Berlin-Hohenschönhausen",
    category: "museum",
    lat: 52.54202553588823,
    lon: 13.50023848203143,
  },
  {
    name: "Mauerpark",
    category: "park",
    lat: 52.543224656252846,
    lon: 13.402640600321304,
  },
  {
    name: "Martin-Gropius-Bau",
    category: "museum",
    lat: 52.506915645190865,
    lon: 13.381978162791384,
  },
  {
    name: "ANOHA – Die Kinderwelt des Jüdischen Museums",
    category: "museum",
    lat: 52.50321788352106,
    lon: 13.39324155591316,
  },
  {
    name: "Berliner Dom",
    category: "tourist",
    lat: 52.51952025117281,
    lon: 13.40109615950647,
  },
  {
    name: "Berlin Underworld",
    category: "museum",
    lat: 52.548200415862965,
    lon: 13.388949505569299,
  },
  {
    name: "Klunkerkranich",
    category: "bar",
    lat: 52.4822649047451,
    lon: 13.431914553316323,
  },
  {
    name: "HARDT",
    category: "shop",
    lat: 52.492583169060175,
    lon: 13.418445344905285,
  },
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

      console.log(routeCoordinates);

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
