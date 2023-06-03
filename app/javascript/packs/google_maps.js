global.$ = global.jQuery = require('jquery');

let map;
//  マーカーの位置情報を格納する配列
let markerPositions = [];

// $submitButton.on("click", function() {
//   let inputValue = $textInput.val().trim();

//   if (inputValue.length > 0) {
//     // map変数が存在する場合にのみマップを削除する
//     if (!markerPositions || markerPositions.getLength() === 0) {
//       markerPositions.clear();
//     }
//   }
// });
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
        let location = results[0].geometry.location;
        let latitude = location.lat();
        let longitude = location.lng();
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


    // // マーカーが追加されるたびに位置情報を配列に追加
    // 
    markerPositions.push(location);
    // console.log(markerPositions)
    // マップの表示領域を設定
    const bounds = new google.maps.LatLngBounds();
    for (const position of markerPositions) {
      bounds.extend(position);
    }
    // マーカーが一つだけの場合は中心をセットし、適切なズームレベルを設定
    if (markerPositions.length === 1) {
      map.setCenter(markerPositions[0]);
      map.setZoom(14); // 適切なズームレベルに調整
    } else {
      // 複数のマーカーがある場合は全てを表示領域内に収める
      map.fitBounds(bounds);
    }


    marker.addListener("click", function() {
      // console.log("Marker clicked!");
      // 情報ウィンドウを作成
      const infowindow = new google.maps.InfoWindow();

      // Place IDを取得する関数を呼び出す
      getPlaceIdFromLatLng(latitude, longitude)
        .then(function(placeId) {
          // Place Detailsサービスのリクエストを作成
          const request = {
            placeId: placeId,
            fields: ["name", "photos", "reviews", "rating", "website", "photos"],
          };

          // Place Detailsサービスを実行
          console.log(request);
          const service = new google.maps.places.PlacesService(map);
          service.getDetails(request, function(place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              // マーカーがマウスオン時に情報ウィンドウを表示
              marker.addListener("mouseover", function() {
                infowindow.setContent(getInfoWindowContent(place, latitude, longitude));
                infowindow.open(map, marker);
              });
              
              marker.addListener("click", function() {
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
      radius: 500, // 検索半径の指定 (メートル単位)
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

function getInfoWindowContent(place, latitude, longitude) {
  // 情報ウィンドウのコンテンツを組み立てる
  let content = `<h3 style="color: black;">${place.name}</h3>`;

  // 写真情報を取得
  const photos = place.photos;

  // 写真がある場合は写真を追加
  if (photos && photos.length > 0) {
    const photo = photos[0]; // 最初の写真を使用する場合
    
    // 写真のURLを取得してコンテンツに追加
    const photoUrl = photo.getUrl();
    content += "<img src='" + photoUrl + "' width='250' height='250' />";

  }

  if (place.rating) {
    content += `<p style="color: black;">Review: ${place.rating}</p>`;
  }

  // Google Mapsへのリンクを追加
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  content += `<p><a href="${googleMapsUrl}" target="_blank">View on Google Maps</a></p>`;
  
  return content;
}

