window.addEventListener("DOMContentLoaded", function() {
    var mapElement = document.getElementById("test_map");
    mapElement.addEventListener("click", function() {
        var keyword = "京都";
        marking(keyword);
      });
  
    let map;
    function marking(keyword) {
      geocodeAddress(keyword)
      .then(function(result) {
        var latitude = result.latitude;
        var longitude = result.longitude;
        console.log("緯度：" + latitude);
        console.log("経度：" + longitude);
        console.log("ooooooooo")
        geocodeRenderMap(latitude, longitude)
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
        console.log(latitude)
      const geocoder = new google.maps.Geocoder();
      const location = new google.maps.LatLng(latitude, longitude);
      function renderMap(latitude, longitude) {
        if (map == null) {
          // マップが既に表示されていない場合は
          map = new google.maps.Map(document.getElementById("map"), {
            center: location,
            zoom: 15,
          });
        }
        const marker = new google.maps.Marker({
          position: location,
          map: map,
          title: `緯度: ${latitude}, 経度: ${longitude}`,
        });
      }
    
      renderMap(latitude, longitude);
    }
    
    
  });
  