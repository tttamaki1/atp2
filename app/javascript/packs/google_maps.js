
global.$ = global.jQuery = require('jquery');

var map;
var service;

function initGeocode(destination_input_text) {
  var geocoder = new google.maps.Geocoder();
  var address = destination_input_text;
  return new Promise(function(resolve, reject) {
    geocoder.geocode({ "address": address }, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          resolve({ lat: latitude, lng: longitude });
      } else {
          console.log("Geocoding failed: " + status);
          reject();
      }
    });
  });
}


function initMap(destination_input_text) {
  map = null;
  initGeocode(destination_input_text).then(function(location) {
    // マップのインスタンスを作成
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: location
    });
  // console.log("location")
  // console.log(location)
  // マップのインスタンスを作成
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: location
  });
  
  service = new google.maps.places.PlacesService(map);

  var bounds = new google.maps.LatLngBounds(); //マーカーの境界を計算するための LatLngBounds オブジェクトを作成
  function createMarker(place) {
    var marker = new google.maps.Marker({
      position: place.geometry.location,
      map: map,
      title: place.name
    });

  // Create an InfoWindow instance
  var infoWindow = new google.maps.InfoWindow({
    content: `
      <div>
        <h3>${place.name}</h3>
        <p>${place.vicinity}</p>
        <p>Rating: ${place.rating} (${place.user_ratings_total} reviews)</p>
      </div>
    `
  });

  // Add a mouseover event listener to the marker
  marker.addListener('mouseover', function () {
    infoWindow.open(map, marker);
  });

  // Add a mouseout event listener to the marker
  marker.addListener('mouseout', function () {
    infoWindow.close();
  });

    bounds.extend(marker.position); //関数でマーカーを作成するたびに、その位置を境界に追加
  }

  // 周辺のおすすめスポットを検索する関数
  function searchNearbyPlaces(location) {
    var request = {
      location: location,
      radius: '500',
      type: ['restaurant']
    };

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
          createMarker(results[i]);
        }
        if (results.length > 0) {
          var center = bounds.getCenter();
          map.setCenter(center);
          map.setZoom(14);
        }
      }
    });
  }

 
  searchNearbyPlaces(location);
});

};

$(function() {
  var $textInput = $('#destination-input');
  var $submitButton = $('.submit-button');

  $submitButton.hide(); // 初期状態ではボタンを非表示にする

  $textInput.on('input', function() {
    var inputValue = $textInput.val().trim();
    if (inputValue.length > 0) {
      $submitButton.fadeIn(); // ボタンをフェードインして表示する

      document.getElementsByClassName("submit-button")[0].addEventListener("click", function() {
        var destination_input_text = document.getElementById("destination-input").value;
        // console.log(destination_input_text)
        if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
          setTimeout(function() { initMap(destination_input_text); }, 1000);
        } else {
          initMap(destination_input_text);
        }
      });
    } else {
      $submitButton.fadeOut(); // ボタンをフェードアウトして非表示にする
    }
  });
});