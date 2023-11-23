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
  let routePolyline;
  let selectedProfile = "car";

  favorites.addEventListener("click", (event) => {
    const fav = event.target;
    const name = fav.textContent;
    const lat = parseFloat(fav.dataset.lat);
    const lon = parseFloat(fav.dataset.lon);
    const category = fav.dataset.category;

    console.log(fav.dataset);

    console.log("Name:", name, "Lat:", lat, "Lon:", lon, "Category:", category);

    if (!isNaN(lat) && !isNaN(lon)) {
      console.log("Adding marker at:", lat, lon);
      const index = selectedPlaces.findIndex((place) => place.name === name);

      if (index > -1) {
        const markerToRemove = selectedPlaces[index].marker;
        map.removeLayer(markerToRemove);
        selectedPlaces.splice(index, 1);
        console.log("Removed place:", name);
      } else {
        function getIconHtml(category) {
          switch (category) {
            case "breluncoffee":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#FFC72C" opacity="0.9" /></svg>';
            case "bar":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#FF4D9E" opacity="0.9" /></svg>';
            case "shop":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#FF6F61" opacity="0.9" /></svg>';
            case "exhibition":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#8A4D76" opacity="0.9" /></svg>';
            case "restaurant":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#44BFC8" opacity="0.9" /></svg>';
            case "tourist":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#FF4D9E" opacity="0.9" /></svg>';
            case "club":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#A4DE02" opacity="0.9" /></svg>';
            case "museum":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#FF3E4D" opacity="0.9" /></svg>';
            case "park":
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="#4CAF50" opacity="0.9" /></svg>';
            // Add cases for other categories
            default:
              return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="10" fill="red" opacity="0.9" /></svg>';
          }
        }

        const customIcon = L.divIcon({
          className: "custom-icon",
          iconSize: [30, 30],
          html: getIconHtml(category),
        });

        const marker = L.marker([lat, lon], { icon: customIcon })
          .addTo(map)
          .bindPopup(
            `Name: ${name}<br>Lat: ${lat}<br>Lon: ${lon}<br>Category:${category}`
          );
        // Add the selected place to the array
        selectedPlaces.push({ name, lat, lon, marker });
        console.log("added marker at " + name);
      }
    } else {
      console.error("Invalid or missing coordinates for:", name);
    }
  });

  async function updateDirectionsInHTML(directionsData) {
    try {
      const directionsContainer = document.getElementById(
        "directions-container"
      );

      // Clear previous directions
      directionsContainer.innerHTML = "";

      // Parse the JSON directions data
      const directions = JSON.parse(directionsData);

      if (directions.paths && directions.paths.length > 0) {
        const path = directions.paths[0];
        const instructions = path.instructions;

        // Create an unordered list element
        const ulElement = document.createElement("ul");

        // Display each instruction as a list item
        instructions.forEach((instruction) => {
          const liElement = document.createElement("li");
          liElement.textContent = instruction.text;
          ulElement.appendChild(liElement);
        });

        // Append the list to the directions container
        directionsContainer.appendChild(ulElement);
      } else {
        directionsContainer.textContent = "No directions available.";
      }
    } catch (error) {
      console.error("Error updating directions in HTML:", error);
    }
  }


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
            )}&profile=${selectedProfile}&key=02a25f5b-a5b8-40db-8d82-78b433c0ac9d&type=gpx`
        );

        const directions = await fetch(
          `https://graphhopper.com/api/1/route?${selectedCoordinates
            .map((coord) => `point=${coord[1]},${coord[0]}`)
            .join(
              "&"
            )}&profile=${selectedProfile}&key=02a25f5b-a5b8-40db-8d82-78b433c0ac9d&type`
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

        // Parse GPX data to get coordinates
        const routeCoordinates = parseGpxData(gpxData);

        console.log("Coordinates:", routeCoordinates);

        // Add a new polyline to the map
        routePolyline = L.polyline(routeCoordinates, { color: "blue" }).addTo(
          map
        );

        console.log("Polyline Bounds:", routePolyline.getBounds());

        // Fit the map to the bounds of the polyline
        map.fitBounds(routePolyline.getBounds());

        const directionsData = await directions.text();

        console.log("Directions Data:", directionsData);

        updateDirectionsInHTML(directionsData);

        // Rest of the code...
      } catch (error) {
        console.error("Error fetching route from GraphHopper:", error);
      }
    });
});
