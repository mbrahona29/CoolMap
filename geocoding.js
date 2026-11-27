"use strict";

async function searchPlace() {
  let query = document.getElementById("search_text").value;
  if (query.trim() === "") {
    return;
  }

  let url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.append("q", query);
  url.searchParams.append("format", "jsonv2");

  let response = await fetch(url);
  let results = await response.json();

  if (results.length === 0) {
    alert("Place not found: " + query);
    return;
  }

  let lon = parseFloat(results[0].lon);
  let lat = parseFloat(results[0].lat);

  map.jumpTo({ center: [lon, lat], zoom: 14 });

  let marker = new maplibregl.Marker();
  marker.setLngLat([lon, lat]);
  marker.addTo(map);
}

document.getElementById("search_button")
  .addEventListener("click", searchPlace);
