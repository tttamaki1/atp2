global.$ = global.jQuery = require('jquery');

let map;
//  マーカーの位置情報を格納する配列
let markerPositions = [];
window.markers = []; // マーカーのオブジェクトを保存する配列



export function marking(keyword) {
  geocodeAddress(keyword)
    .then(function(result) {
      let latitude = result.latitude;
      let longitude = result.longitude;
      // console.log("緯度：" + latitude);
      // console.log("経度：" + longitude);
      geocodeRenderMap(latitude, longitude, keyword);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function geocodeAddress(keyword) {
  return new Promise(function(resolve, reject) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: keyword }, function(results, status) {
      if (status === "OK") {
        let location = results[0].geometry.location;
        let latitude = location.lat();
        let longitude = location.lng();
        resolve({ latitude: latitude, longitude: longitude });
      } else {
        reject("Geocode Failed: " + status);
      }
    });
  });
}

function geocodeRenderMap(latitude, longitude, keyword) {
  const location = new google.maps.LatLng(latitude, longitude);

  function renderMap(latitude, longitude, keyword) {
    if (map == null) {
      // マップが既に表示されていない場合は
      map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 14,
        mapTypeControl: false,
      });
    }

    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: `緯度: ${latitude}, 経度: ${longitude}`,
      keyword: keyword,
    });
    window.markers.push(marker);

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


    marker.infoFetched = false; // マーカーにinfoFetchedフラグを追加
    marker.infowindow = new google.maps.InfoWindow(); // インフォウィンドウもマーカーに関連付け
    
    marker.addListener("click", function() {
      if (!this.infoFetched) { // まだ詳細情報が取得されていない場合
        getPlaceId(keyword)
          .then(function(placeId) {
            const request = {
              placeId: placeId,
              fields: ["name", "photos", "reviews", "rating", "website", "photos"],
              language: window.selectedLanguage,
            };
    
            const service = new google.maps.places.PlacesService(map);
            service.getDetails(request, function(place, status) {
              if (status === google.maps.places.PlacesServiceStatus.OK) {
                // 詳細情報が取得できたらinfoFetchedフラグをtrueに設定
                marker.infoFetched = true;
    
                marker.infowindow.setContent(getInfoWindowContent(place, latitude, longitude));
                marker.infowindow.open(map, marker);
    
                marker.addListener("click", function() {
                  infowindow.close();
                });
              } else {
                console.log("Place Details Failed: " + status);
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else { // すでに詳細情報が取得されている場合
        // インフォウィンドウを再表示
        this.infowindow.open(map, this);
      }
    });
    
  }

  renderMap(latitude, longitude, keyword);

}

function getPlaceId(keyword) {
  return new Promise(function(resolve, reject) {
    console.log(keyword)
    const service = new google.maps.places.PlacesService(map);
    let req = {
      query: keyword,
      fields: ['place_id'],
    };
    
    service.findPlaceFromQuery(req, function(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK && results[0]) {
          console.log(results[0].place_id);
          resolve(results[0].place_id); 
        } else {
          reject("Could not find the place ID: " + status);
        }
    });
  });
}



function getInfoWindowContent(place, latitude, longitude) {

  let link;
  let review;
  if (window.selectedLanguage == "ja") {
    link = "GoogleMapで見る";
    review = "レビュー:";
  } else if (window.selectedLanguage == "en") {
    link = "View on Google Maps";
    review = "Review:";
  } else if (window.selectedLanguage == "zh-CN") {
    link = "在谷歌地图上查看";
    review = "评论：";
    }

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
    content += `<p style="color: black;">${review} ${place.rating}</p>`;
  }

  // Google Mapsへのリンクを追加

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  content += `<p><a href="${googleMapsUrl}" target="_blank">${link}</a></p>`;
  
  return content;
}


