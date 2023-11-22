document.addEventListener("DOMContentLoaded", () => {
  console.log("the-berliest JS imported successfully!");
  const favorites = document.getElementById("favorites");

  const map = L.map("map").setView([52.52, 13.405], 13); // Berlin coordinates

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  let selectedPlaces = []; // Move this outside the loop

  // favorites.addEventListener("click", (event) => {
  //   const fav = event.target;
  //   const name = fav.textContent.trim();
  //   const lat = parseFloat(fav.dataset.lat);
  //   const lon = parseFloat(fav.dataset.lon);

  //   console.log("Name:", name, "Lat:", lat, "Lon:", lon);

  //   if (!isNaN(lat) && !isNaN(lon)) {
  //     console.log("Adding marker at:", lat, lon);
  //     console.log("Selected Places:", selectedPlaces);

  //     const marker = L.marker([lat, lon])
  //       .addTo(map)
  //       .bindPopup(
  //         `Name: ${name}<br>Lat: ${lat}<br>Lon: ${lon}<br><button class="marker-delete-button">Delete</button>`
  //       );

  //     marker.on("popupopen", function () {
  //       const tempMarker = this;

  //       // Event handling for the "Delete" button in the marker's popup
  //       $(".marker-delete-button").click(function () {
  //         map.removeLayer(tempMarker);
  //       });
  //     });

  //     // Add the selected place to the array
  //     selectedPlaces.push({ name, lat, lon });
  //   } else {
  //     console.error("Invalid or missing coordinates for:", name);
  //   }
  // });

  favorites.addEventListener("click", (event) => {
    const fav = event.target;
    const name = fav.textContent;
    const lat = parseFloat(fav.dataset.lat);
    const lon = parseFloat(fav.dataset.lon);

    console.log("Name:", name, "Lat:", lat, "Lon:", lon);

    if (!isNaN(lat) && !isNaN(lon)) {
      console.log("Adding marker at:", lat, lon);
      const index = selectedPlaces.findIndex((place) => place.name === name);

      if (index > -1) {
        const markerToRemove = selectedPlaces[index].marker;
        map.removeLayer(markerToRemove);
        fav.classList.remove("selected");
        selectedPlaces.splice(index, 1);

        console.log("Removed place:", name);
      } else {
        const marker = L.marker([lat, lon])
          .addTo(map)
          .bindPopup(`Name: ${name}<br>Lat: ${lat}<br>Lon: ${lon}`);
        // Add the selected place to the array
        selectedPlaces.push({ name, lat, lon, marker });
        fav.classList.add("selected");

        console.log("added marker at " + name);
      }
    } else {
      console.error("Invalid or missing coordinates for:", name);
    }
  });
});

// Move this outside the loop
document
  .getElementById("showRouteBtn")
  .addEventListener("click", async function () {
    try {
      // Extract coordinates of selected places
      const selectedCoordinates = selectedPlaces.map((place) => [
        place.lon,
        place.lat,
      ]);

      console.log("Selected Places:", selectedPlaces);

      // Use GraphHopper API to get the route in GPX format
      const response = await fetch(
        `https://graphhopper.com/api/1/route?${selectedCoordinates
          .map((coord) => `point=${coord[1]},${coord[0]}`)
          .join(
            "&"
          )}&profile=foot&key=02a25f5b-a5b8-40db-8d82-78b433c0ac9d&type=gpx`
      );

      gpxData = await response.text();

      console.log("GPX Data:", gpxData);

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

      console.log("Coordinates:", parseGpxData(gpxData));

      if (routePolyline) {
        map.removeLayer(routePolyline);
      }

      // Rest of the code...
    } catch (error) {
      console.error("Error fetching route from GraphHopper:", error);
    }
  });
