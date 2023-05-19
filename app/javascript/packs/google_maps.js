global.$ = global.jQuery = require('jquery');

let map;


export function marking(keyword) {
  geocodeAddress(keyword)
    .then(function(result) {
      var latitude = result.latitude;
      var longitude = result.longitude;
      console.log("緯度：" + latitude);
      console.log("経度：" + longitude);
      geocodeRenderMap(latitude, longitude);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function geocodeAddress(keyword) {
  return new Promise(function(resolve, reject) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: keyword }, function(results, status) {
      if (status === "OK") {
        var location = results[0].geometry.location;
        var latitude = location.lat();
        var longitude = location.lng();
        resolve({ latitude: latitude, longitude: longitude });
      } else {
        reject("Geocode 失敗: " + status);
      }
    });
  });
}

function geocodeRenderMap(latitude, longitude) {
  const geocoder = new google.maps.Geocoder();
  const location = new google.maps.LatLng(latitude, longitude);

  function renderMap(latitude, longitude) {
    if (map == null) {
      // マップが既に表示されていない場合は
      map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 15,
        mapTypeControl: false
      });
    }
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: `緯度: ${latitude}, 経度: ${longitude}`,
    });

    //  マーカーの位置情報を格納する配列
    // const markerPositions = [];

    // // マーカーが追加されるたびに位置情報を配列に追加
    // markerPositions.push(location);

    // // マップの表示領域を設定
    // const bounds = new google.maps.LatLngBounds();
    // for (const position of markerPositions) {
    //   bounds.extend(position);
    // }
    // map.fitBounds(bounds);

    marker.addListener("click", function() {
      // 情報ウィンドウを作成
      const infowindow = new google.maps.InfoWindow();

      // Place IDを取得する関数を呼び出す
      getPlaceIdFromLatLng(latitude, longitude)
        .then(function(placeId) {
          // Place Detailsサービスのリクエストを作成
          const request = {
            placeId: placeId,
            fields: ["name", "formatted_address", "formatted_phone_number", "reviews", "rating", "opening_hours", "website", "photos"],
          };

          // Place Detailsサービスを実行
          const service = new google.maps.places.PlacesService(map);
          service.getDetails(request, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // マーカーがマウスオン時に情報ウィンドウを表示
              marker.addListener("mouseover", function() {
                infowindow.setContent(getInfoWindowContent(place));
                infowindow.open(map, marker);
              });
              
              marker.addListener("mouseout", function() {
                infowindow.close();
              });
            } else {
              console.log("Place Details 失敗: " + status);
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    });
  }

  renderMap(latitude, longitude);

}

function getPlaceIdFromLatLng(latitude, longitude) {
  return new Promise(function(resolve, reject) {
    const latLng = new google.maps.LatLng(latitude, longitude);
    const request = {
      location: latLng,
      radius: 100, // 検索半径の指定 (メートル単位)
      type: 'point_of_interest', // 検索する場所のタイプ (任意のタイプに変更可能)
      fields: ['place_id'],
    };

    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const placeId = results[0].place_id;
        resolve(placeId);
      } else {
        reject("Place Search 失敗: " + status);
      }
    });
  });
}

function getInfoWindowContent(place) {
  // 情報ウィンドウのコンテンツを組み立てる
  let content = `<h3 style="color: black;">${place.name}</h3>`;
  if (place.formatted_address) {
    content += `<p style="color: black;">住所: ${place.formatted_address}</p>`;
  }
  // if (place.formatted_phone_number) {
  //   content += `<p style="color: black;">電話番号: ${place.formatted_phone_number}</p>`;
  // }
  if (place.rating) {
    content += `<p style="color: black;">評価: ${place.rating}</p>`;
  }
  if (place.opening_hours) {
    const hours = place.opening_hours.weekday_text.join("<br>");
    content += `<p style="color: black;">営業時間:<br>${hours}</p>`;
  }
  return content;
}

