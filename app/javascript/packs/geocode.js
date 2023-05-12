import { renderMap } from '../packs/google_maps';

window.addEventListener("DOMContentLoaded", function() {
    var testElement = document.getElementById("test");
    testElement.addEventListener("click", geocodeAddress);
  
    function geocodeAddress() {
        var geocoder = new google.maps.Geocoder();
        var keyword = "東京都庁";
        geocoder.geocode({ address: keyword }, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var location = results[0].geometry.location;
            var latitude = location.lat();
            var longitude = location.lng();
            renderMap(latitude, longitude);
            console.log("緯度：" + latitude);
            console.log("経度：" + longitude);           
          } else {
            console.log("エラーが発生しました。ステータス：" + status);
          }
        });
      }

      
  });
  