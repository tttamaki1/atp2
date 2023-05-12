
window.addEventListener("DOMContentLoaded", function() {
    var test2Element = document.getElementById("test_2");
    test2Element.addEventListener("click", geocodeRenderMap);
  
    function geocodeRenderMap() {
      const latitude = "35.6896342";
      const longitude = "139.6921007";
        console.log("ok")
      const geocoder = new google.maps.Geocoder();
      function renderMap(latitude, longitude) {
        if (map == null) {
          // マップが既に表示されていない場合は
          const location = new google.maps.LatLng(latitude, longitude);
          const map = new google.maps.Map(document.getElementById("map"), {
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
  