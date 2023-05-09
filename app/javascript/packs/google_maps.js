global.$ = global.jQuery = require('jquery');

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let map;
let service;
let infowindow;

function initializeMap(destination_input_text) {
  firstRenderMap(destination_input_text);
}

function firstRenderMap(text) {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: text }, (results, status) => {
    if (status === "OK") {
      const location = results[0].geometry.location;
      const place = { address: results[0].formatted_address, location, name: text };
      createMarker(place);
      const sydney = new google.maps.LatLng(place.location);
      infowindow = new google.maps.InfoWindow();
      map = new google.maps.Map(document.getElementById("map"), {
        center: sydney,
        zoom: 15,
      });
    } else {
      console.log(`Geocode 失敗: ${status}`);
    }
  });
}

export function geocodeTextAndMarking(text) {
  const request = {
    query: text,
    fields: ["name", "geometry"],
  };

  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}



function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new google.maps.Marker({
    map: map, 
    position: place.geometry.location,
  });

  const contentString = `
  <div>
    <h3>${place.name}</h3>
  </div>
  `;

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

  google.maps.event.addListener(marker, "mouseover", () => {
    infowindow.open(map, marker);
  });

  google.maps.event.addListener(marker, "mouseout", () => {
    infowindow.close(map, marker);
  });
}

window.initializeMap = initializeMap;
