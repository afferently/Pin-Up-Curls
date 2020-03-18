var map = (function() {

  var $map,
      $marker;

  var init = function() {

    $map = document.querySelector('[data-map=map]');

    if (!$map) {
      return;
    }

    $marker = document.querySelectorAll('[data-map=marker]');

    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBe2xGalbZ8CZShyObqUvw78DkLhpbBOVY&callback=map.initMap';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  var initMap = function() {

    var map = new google.maps.Map($map, gMapOptions());

    for (i = 0; i < $marker.length; i++) {

      var marker = new google.maps.Marker({
				icon: new google.maps.MarkerImage($marker[i].src, null, null, null, new google.maps.Size($marker[i].width, $marker[i].height)),
				map: map,
				optimised: false,
				position: new google.maps.LatLng($marker[i].dataset.long, $marker[i].dataset.lat)
			});
    }
  }

  var gMapOptions = function() {
  	return {
  		center: new google.maps.LatLng(51.317715, -0.55761),
  		disableDefaultUI: true,
  		mapTypeId: 'roadmap',
  		styles: [
  		{
  			"featureType": "landscape.natural.terrain",
  			"elementType": "geometry",
  			"stylers": [
  			{
  				"visibility": "off"
  			}]
  		},
  		{
  			"featureType": "poi",
  			"elementType": "labels",
  			"stylers": [
  			{
  				"visibility": "off"
  			}]
  		},
  		{
  			"featureType": "poi.business",
  			"stylers": [
  			{
  				"visibility": "off"
  			}]
  		},
  		{
  			"featureType": "road",
  			"elementType": "geometry.stroke",
  			"stylers": [
  			{
  				"visibility": "off"
  			}]
  		},
  		{
  			"featureType": "road",
  			"elementType": "labels",
  			"stylers": [
  			{
  				"visibility": "on"
  			}]
  		}],
  		zoom: 16
  	};
  }

  init();

  // Public funcs
  return {
    init: function() {
      init();
    },
    initMap: function () {
      initMap();
    }
  };
})();
