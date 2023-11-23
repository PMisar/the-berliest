document.addEventListener("DOMContentLoaded", async () => {
  console.log("the-berliest JS imported successfully!");
  const mapMyBerliest = L.map("map").setView([52.52, 13.405], 13); // Berlin coordinates

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(mapMyBerliest);

  try {
    const places = [
        {
          "name": "Stilbruch Kaffee",
          "category": "breluncoffee",
          "lat": "52.508329144972556",
          "lon": "13.453455521362487"
        },
        {
          "name": "DOTS",
          "category": "breluncoffee",
          "lat": "52.48663687124957",
          "lon": "13.434670753631147"
        },
        {
          "name": "La Maison",
          "category": "breluncoffee",
          "lat": "52.49385408025976",
          "lon": "13.431029526888652"
        },
        {
          "name": "noble Rot Weinbar",
          "category": "bar",
          "lat": "52.50976886755068",
          "lon": "13.460267815146814"
        },
        {
          "name": "Vintage Revivals",
          "category": "shop",
          "lat": "52.524334833717816",
          "lon": "13.408772513821996"
        },
        {
          "name": "DARK MATTER",
          "category": "exhibition",
          "lat": "52.4928546542553",
          "lon": "13.492671432999822"
        },
        {
          "name": "Kauf Dich Glücklich",
          "category": "shop",
          "lat": "52.53326204575885",
          "lon": "13.404305454626424"
        },
        {
          "name": "BURRO UNCHAINED",
          "category": "restaurant",
          "lat": "52.47513227012783",
          "lon": "13.423946922090007"
        },
        {
          "name": "Fernsehturm",
          "category": "tourist",
          "lat": "52.52095859230303",
          "lon": "13.409483470828881"
        },
        {
          "name": "Berghain",
          "category": "club",
          "lat": "52.511531046762975",
          "lon": "13.443017013029815"
        },
        {
          "name": "Sisyphos",
          "category": "club",
          "lat": "52.49307675403281",
          "lon": "13.491137209451416"
        },
        {
          "name": "Aiko",
          "category": "restaurant",
          "lat": "52.53067053507697",
          "lon": "13.400335364418"
        },
        {
          "name": "goldies Smashburger.",
          "category": "restaurant",
          "lat": "52.49542461175487",
          "lon": "13.419703555483546"
        },
        {
          "name": "Fatoush ",
          "category": "restaurant",
          "lat": "52.511584327304135",
          "lon": "13.457223480941575"
        },
        {
          "name": "La Buvette ",
          "category": "restaurant",
          "lat": "52.54761310515569",
          "lon": "13.408964024798124"
        },
        {
          "name": "Vegang Prenzlauer Berg",
          "category": "restaurant",
          "lat": "52.538773957380194",
          "lon": "13.408582184321753"
        },
        {
          "name": "Holzmarkt25",
          "category": "bar",
          "lat": "52.51133992324064",
          "lon": "13.426835378456282"
        },
        {
          "name": "gART.n",
          "category": "club",
          "lat": "52.4837246814709",
          "lon": "13.501605499663029"
        },
        {
          "name": "Loveco Friedrichshain",
          "category": "shop",
          "lat": "52.49096935765267",
          "lon": "13.410147184319394"
        },
        {
          "name": "Wen Cheng 1",
          "category": "restaurant",
          "lat": "52.54642263709715",
          "lon": "13.413607208598014"
        },
        {
          "name": "Repeater Vintage Shop",
          "category": "shop",
          "lat": "52.48918743150622",
          "lon": "13.432846786171343"
        },
        {
          "name": "März",
          "category": "bar",
          "lat": "52.54722684138422",
          "lon": "13.4153861186577"
        },
        {
          "name": "Siegessäule",
          "category": "tourist",
          "lat": "52.514679571113625",
          "lon": "13.350097768976484"
        },
        {
          "name": "Brandenburger Tor",
          "category": "tourist",
          "lat": "52.51641820714497",
          "lon": "13.377747012953938"
        },
        {
          "name": "East Side Gallery",
          "category": "tourist",
          "lat": "52.50547911696971",
          "lon": "13.439964838264544"
        },
        {
          "name": "Jewish Museum Berlin",
          "category": "museum",
          "lat": "52.502413586121975",
          "lon": "13.395453173182705"
        },
        {
          "name": "Memorial to the Murdered Jews of Europe",
          "category": "tourist",
          "lat": "52.51479645935983",
          "lon": "13.378538941724065"
        },
        {
          "name": "Beate Uwe ",
          "category": "club",
          "lat": "52.51828285171526",
          "lon": "13.418905396536342"
        },
        {
          "name": "Volkspark Friedrichshain",
          "category": "park",
          "lat": "52.52862135677331",
          "lon": "13.436497417060838"
        },
        {
          "name": "Gedenkstätte Berlin-Hohenschönhausen",
          "category": "museum",
          "lat": "52.54202553588823",
          "lon": "13.50023848203143"
        },
        {
          "name": "Mauerpark",
          "category": "park",
          "lat": "52.543224656252846",
          "lon": "13.402640600321304"
        },
        {
          "name": "Martin-Gropius-Bau",
          "category": "museum",
          "lat": "52.506915645190865",
          "lon": "13.381978162791384"
        },
        {
          "name": "ANOHA – Die Kinderwelt des Jüdischen Museums",
          "category": "museum",
          "lat": "52.50321788352106",
          "lon": "13.39324155591316"
        },
        {
          "name": "Berliner Dom",
          "category": "tourist",
          "lat": "52.51952025117281",
          "lon": "13.40109615950647"
        },
        {
          "name": "Berlin Underworld",
          "category": "museum",
          "lat": "52.548200415862965",
          "lon": "13.388949505569299"
        },
        {
          "name": "Klunkerkranich",
          "category": "bar",
          "lat": "52.4822649047451",
          "lon": "13.431914553316323"
        },
        {
          "name": "HARDT",
          "category": "shop",
          "lat": "52.492583169060175",
          "lon": "13.418445344905285"
        }
      ]

    places.forEach((place) => {
      const { name, lat, lon } = place;

      L.marker([parseFloat(lat), parseFloat(lon)])
        .addTo(mapMyBerliest)
        .bindPopup(`Name: ${name}<br>Lat: ${lat}<br>Lon: ${lon}`);
    });
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
});
