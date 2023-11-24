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
        name: "Stilbruch Kaffee",
        category: "cafe",
        lat: "52.508329144972556",
        lon: "13.453455521362487",
        description: "A stylish coffee shop with a unique ambiance.",
        tag: "Coffee Lover",
        neighborhood: "Kreuzberg",
      },
      {
        name: "DOTS",
        category: "cafe",
        lat: "52.48663687124957",
        lon: "13.434670753631147",
        description: "A cozy coffee spot with delicious pastries.",
        tag: "Coffee Lover",
        neighborhood: "Neukölln",
      },
      {
        name: "La Maison",
        category: "cafe",
        lat: "52.49385408025976",
        lon: "13.431029526888652",
        description: "French-inspired café offering a variety of pastries.",
        tag: "French Cuisine",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "noble Rot Weinbar",
        category: "bar",
        lat: "52.50976886755068",
        lon: "13.460267815146814",
        description: "A sophisticated wine bar with a selection of fine wines.",
        tag: "Wine Connoisseur",
        neighborhood: "Mitte",
      },
      {
        name: "Vintage Revivals",
        category: "shop",
        lat: "52.524334833717816",
        lon: "13.408772513821996",
        description: "Vintage store with a curated collection of retro items.",
        tag: "Vintage Enthusiast",
        neighborhood: "Friedrichshain",
      },
      {
        name: "DARK MATTER",
        category: "exhibition",
        lat: "52.4928546542553",
        lon: "13.492671432999822",
        description:
          "Contemporary art exhibition showcasing dark-themed works.",
        tag: "Art Lover",
        neighborhood: "Kreuzberg",
      },
      {
        name: "Kauf Dich Glücklich",
        category: "shop",
        lat: "52.53326204575885",
        lon: "13.404305454626424",
        description: "Fashion and lifestyle store with a cheerful atmosphere.",
        tag: "Fashionista",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "BURRO UNCHAINED",
        category: "restaurant",
        lat: "52.47513227012783",
        lon: "13.423946922090007",
        description:
          "Eclectic restaurant serving dishes from around the world.",
        tag: "Foodie",
        neighborhood: "Neukölln",
      },
      {
        name: "Fernsehturm",
        category: "tourist",
        lat: "52.52095859230303",
        lon: "13.409483470828881",
        description:
          "Iconic television tower offering panoramic views of Berlin.",
        tag: "Tourist Attraction",
        neighborhood: "Mitte",
      },
      {
        name: "Berghain",
        category: "club",
        lat: "52.511531046762975",
        lon: "13.443017013029815",
        description:
          "Legendary techno nightclub with a unique industrial vibe.",
        tag: "Nightlife",
        neighborhood: "Friedrichshain",
      },
      {
        name: "Sisyphos",
        category: "club",
        lat: "52.49307675403281",
        lon: "13.491137209451416",
        description:
          "Artistic and sprawling club known for its themed parties.",
        tag: "Nightlife",
        neighborhood: "Rummelsburg",
      },
      {
        name: "Aiko",
        category: "restaurant",
        lat: "52.53067053507697",
        lon: "13.400335364418",
        description:
          "Asian fusion restaurant with a modern and stylish interior.",
        tag: "Foodie",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "goldies Smashburger.",
        category: "restaurant",
        lat: "52.49542461175487",
        lon: "13.419703555483546",
        description: "Popular spot for delicious and creative smash burgers.",
        tag: "Burger Lover",
        neighborhood: "Neukölln",
      },
      {
        name: "Fatoush ",
        category: "restaurant",
        lat: "52.511584327304135",
        lon: "13.457223480941575",
        description:
          "Mediterranean restaurant offering fresh and flavorful dishes.",
        tag: "Foodie",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "La Buvette ",
        category: "restaurant",
        lat: "52.54761310515569",
        lon: "13.408964024798124",
        description: "Cozy wine bar and bistro with a French-inspired menu.",
        tag: "Wine Lover",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "Vegang Prenzlauer Berg",
        category: "restaurant",
        lat: "52.538773957380194",
        lon: "13.408582184321753",
        description:
          "Vegan restaurant offering a variety of plant-based dishes.",
        tag: "Vegan",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "Holzmarkt25",
        category: "bar",
        lat: "52.51133992324064",
        lon: "13.426835378456282",
        description: "Riverside bar with a relaxed atmosphere and live music.",
        tag: "Bar",
        neighborhood: "Friedrichshain",
      },
      {
        name: "gART.n",
        category: "club",
        lat: "52.4837246814709",
        lon: "13.501605499663029",
        description:
          "Artistic club and event space with a vibrant and creative vibe.",
        tag: "Art Lover",
        neighborhood: "Rummelsburg",
      },
      {
        name: "Loveco Friedrichshain",
        category: "shop",
        lat: "52.49096935765267",
        lon: "13.410147184319394",
        description:
          "Sustainable fashion store promoting eco-friendly clothing.",
        tag: "Fashion Enthusiast",
        neighborhood: "Friedrichshain",
      },
      {
        name: "Wen Cheng 1",
        category: "restaurant",
        lat: "52.54642263709715",
        lon: "13.413607208598014",
        description:
          "Authentic Chinese restaurant known for its delicious cuisine.",
        tag: "Foodie",
        neighborhood: "Pankow",
      },
      {
        name: "Repeater Vintage Shop",
        category: "shop",
        lat: "52.48918743150622",
        lon: "13.432846786171343",
        description:
          "Vintage shop offering a diverse collection of retro items.",
        tag: "Vintage Enthusiast",
        neighborhood: "Friedrichshain",
      },
      {
        name: "März",
        category: "bar",
        lat: "52.54722684138422",
        lon: "13.4153861186577",
        description:
          "Cozy bar with a selection of craft beers and signature cocktails.",
        tag: "Bar Lover",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "Siegessäule",
        category: "tourist",
        lat: "52.514679571113625",
        lon: "13.350097768976484",
        description: "Historic landmark with a stunning victory column.",
        tag: "Tourist Attraction",
        neighborhood: "Tiergarten",
      },
      {
        name: "Brandenburger Tor",
        category: "tourist",
        lat: "52.51641820714497",
        lon: "13.377747012953938",
        description: "Iconic gate and symbol of German unity.",
        tag: "Tourist Attraction",
        neighborhood: "Mitte",
      },
      {
        name: "East Side Gallery",
        category: "tourist",
        lat: "52.50547911696971",
        lon: "13.439964838264544",
        description:
          "Longest remaining section of the Berlin Wall covered in murals.",
        tag: "Historical Site",
        neighborhood: "Friedrichshain",
      },
      {
        name: "Jewish Museum Berlin",
        category: "museum",
        lat: "52.502413586121975",
        lon: "13.395453173182705",
        description:
          "Museum chronicling the history and culture of Jews in Germany.",
        tag: "History Buff",
        neighborhood: "Kreuzberg",
      },
      {
        name: "Memorial to the Murdered Jews of Europe",
        category: "tourist",
        lat: "52.51479645935983",
        lon: "13.378538941724065",
        description: "Sombre memorial honoring the victims of the Holocaust.",
        tag: "Historical Site",
        neighborhood: "Mitte",
      },
      {
        name: "Beate Uwe",
        category: "club",
        lat: "52.51828285171526",
        lon: "13.418905396536342",
        description:
          "Nightclub known for its lively atmosphere and eclectic music.",
        tag: "Nightlife Enthusiast",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "Volkspark Friedrichshain",
        category: "park",
        lat: "52.52862135677331",
        lon: "13.436497417060838",
        description:
          "Picturesque park offering green spaces and recreational activities.",
        tag: "Nature Lover",
        neighborhood: "Friedrichshain",
      },
      {
        name: "Gedenkstätte Berlin-Hohenschönhausen",
        category: "museum",
        lat: "52.54202553588823",
        lon: "13.50023848203143",
        description:
          "Former Stasi prison turned memorial site for political prisoners.",
        tag: "History Enthusiast",
        neighborhood: "Lichtenberg",
      },
      {
        name: "Mauerpark",
        category: "park",
        lat: "52.543224656252846",
        lon: "13.402640600321304",
        description:
          "Popular park with a vibrant flea market and outdoor performances.",
        tag: "Recreation Seeker",
        neighborhood: "Prenzlauer Berg",
      },
      {
        name: "Martin-Gropius-Bau",
        category: "museum",
        lat: "52.506915645190865",
        lon: "13.381978162791384",
        description:
          "Exhibition hall showcasing contemporary art and cultural events.",
        tag: "Art Lover",
        neighborhood: "Kreuzberg",
      },
      {
        name: "ANOHA – Die Kinderwelt des Jüdischen Museums",
        category: "museum",
        lat: "52.50321788352106",
        lon: "13.39324155591316",
        description:
          "Children's museum offering interactive exhibits on Jewish history.",
        tag: "Family Friendly",
        neighborhood: "Kreuzberg",
      },
      {
        name: "Berliner Dom",
        category: "tourist",
        lat: "52.51952025117281",
        lon: "13.40109615950647",
        description:
          "Impressive cathedral with stunning architecture and city views.",
        tag: "Tourist Attraction",
        neighborhood: "Mitte",
      },
      {
        name: "Berlin Underworld",
        category: "museum",
        lat: "52.548200415862965",
        lon: "13.388949505569299",
        description:
          "Guided tours exploring Berlin's underground history during WWII.",
        tag: "History Buff",
        neighborhood: "Wedding",
      },
      {
        name: "Klunkerkranich",
        category: "bar",
        lat: "52.4822649047451",
        lon: "13.431914553316323",
        description:
          "Rooftop bar offering panoramic views of Berlin and creative cocktails.",
        tag: "Bar Lover",
        neighborhood: "Neukölln",
      },
      {
        name: "HARDT",
        category: "shop",
        lat: "52.492583169060175",
        lon: "13.418445344905285",
        description:
          "Chic boutique known for its curated selection of fashion and accessories.",
        tag: "Fashionista",
        neighborhood: "Kreuzberg",
      },
    ];
    places.forEach((place) => {
      const { name, lat, lon, category, tag, description, neighborhood } =
        place;
      function getIconHtml(category) {
        switch (category) {
          case "cafe":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#1f6f78" opacity="0.9" class="circle"/></svg>';
          case "bar":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#2a7a7f" opacity="0.9" class="circle"/></svg>';
          case "shop":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#358586" opacity="0.9" class="circle"/></svg>';
          case "exhibition":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#40908d" opacity="0.9" class="circle"/></svg>';
          case "restaurant":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#4b9c94" opacity="0.9" class="circle"/></svg>';
          case "tourist":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#56a79b" opacity="0.9" class="circle"/></svg>';
          case "club":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#61b2a2" opacity="0.9" class="circle"/></svg>';
          case "museum":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#6cbda9" opacity="0.9" class="circle"/></svg>';
          case "park":
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="#77c8b0" opacity="0.9" class="circle"/></svg>';
          // Add cases for other categories
          default:
            return '<svg width="30" height="30" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="7" fill="red" opacity="0.9" class="circle"/></svg>';
        }
      }
      const customIcon = L.divIcon({
        className: "custom-icon",
        iconSize: [30, 30],
        html: getIconHtml(category),
      });
      L.marker([lat, lon], { icon: customIcon })
        .addTo(mapMyBerliest)
        .bindPopup(
          `Name: ${name}<br>Tag: ${tag}<br>Category: ${category}<br>Neighborhood: ${neighborhood}<br>Description: ${description}`
        );
    });
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
});
