const GOOGLE_MAPS = process.env.GOOGLE_MAPS;

function loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS}&loading=async&libraries=places&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
}

var map;
var service;
var infowindow;

function initMap() {
    console.log('Google Maps script loaded and map initialized');
  var sydney = new google.maps.LatLng(-33.867, 151.195);

  infowindow = new google.maps.InfoWindow();

  map = new google.maps.Map(
      document.getElementById('map'), {center: sydney, zoom: 15});

  var request = {
    query: 'Museum of Contemporary Art Australia',
    fields: ['name', 'geometry'],
  };

  var service = new google.maps.places.PlacesService(map);

  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}

loadGoogleMapsScript();
