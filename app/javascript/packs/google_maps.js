function initMap() {
  // マップの中心座標を指定
  const center = { lat: 35.6895, lng: 139.6917 }; // 東京都庁舎を中心座標とする

  // マップのインスタンスを作成
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: center,
  });

  const service = new google.maps.places.PlacesService(map);

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
        }
      }
    });
  }

  // 東京都庁舎周辺のおすすめスポットを検索する
  searchNearbyPlaces(center);
}

// ページが読み込まれたときに、initMap関数を実行する
document.addEventListener("DOMContentLoaded", initMap);
