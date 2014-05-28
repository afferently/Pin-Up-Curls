/* define global selectors
 */
var $body = $("body"),
		$containsMenuPages = $(".contains-menu-pages"),
		$containsMenu = $(".contains-menu"),
		$containsPages = $(".contains-pages"),
		$containsLinkToMenuFixed = $(".contains-link-to-menu.fixed"),
		$containsPage = $(".contains-page");


/* start app
 */
$(document).ready(function()
{
	$(".link-to-prices-page").attr("href", "#page/prices");
	$(".link-to-location-page").attr("href", "#page/location");
	$(".link-to-contact-page").attr("href", "#page/contact");
	$(".link-to-gallery-page").attr("href", "#page/gallery");
	
	
  /* delegate .transition() calls to .animate()
   * if the browser can't do CSS transitions.
   */
  if (!$.support.transition) $.fn.transition = $.fn.animate;
  
  
  /* set up the hash change event
   * and then run it for the first time
   */
  $(window).hashchange(function() 
  { 
		appHashChange();
  }); appHashChange();
});


/*=apphashchange()
 *
 * triggered on hash change
 */
function appHashChange() 
{
	var urlHash = appUrlHash();

	
	/* if url matches an url route 
	 * then run a function of the same name
	 */
	if (appUrlHashMatchesRoute()) 
	{
		$(".contains-logo-puc-logo-unisex-hair-parlour").stop().transition(
		{
			"opacity": 0
		}, function()
		{
			$(this).hide();
		});
		
		routes()[urlHash.func]();
	} else {
		$containsMenuPages.stop().transition(y("-200%"));
	
		$(".contains-logo-puc-logo-unisex-hair-parlour").css(
		{
			"opacity": 1
		}).show();
				
		setTimeout(function() 
		{
			
			
			/* and if url hash still doesn't match anything default to #menu
			 */
			if (!appUrlHashMatchesRoute()) window.location.hash = '#menu';
		}, 4000);
	}
}


/*=routes 
 */
function routes()
{
	return {
		"menu": function()
		{
			menu();
		},
		"page": function()
		{
			page();
		}
	};
}


/*=mapOptions 
 */
function mapOptions()
{
	return {
		center: new google.maps.LatLng(51.317715, -0.55761),
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
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


/*=mapMarkers 
 */
function mapMarkers()
{
	return [
		['Pin Up Curls', 51.317715, -0.55761, "shop", 120, 144],
		['Heathside Car Park', 51.3164834, -0.5568375999999999, "parking",  40, 48]
	];
}


/*=menu
 */
function menu()
{
	$containsMenu.attr("style", "").show();

	$body.css(
	{
		"overflow": "hidden"
	});
	
	$containsPage.css(
	{
		"overflow": "hidden",
		"position": "absolute",
		"width": "100%",
		"height": "100%"
	});
	
	$containsLinkToMenuFixed.hide();

	$containsMenuPages.show().stop().transition(y("0"), function()
	{
		$body.attr("style","");
		
		$containsPage.attr("style","");
		
		$containsPages.hide();
	});
}


/*=page
 */
function page()
{
	var urlHashArg = appUrlHash().arg;
	
	if (urlHashArg === "location" && !googleMapsScriptLoaded())
	{
		var script = document.createElement("script");
		
		script.type = "text/javascript";
		script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAJSEvOEuVKcVnPELZS5tKSLqY7zcWL_uE&sensor=true&callback=page";
		
		document.body.appendChild(script);
		
		return this;
	}
	
	if (!$("#"+urlHashArg).length)
	{
		$containsPage.attr("style","").load(urlHashArg+".html main", function()
		{	
			animatePage();
		});
	} else {
		animatePage();
	}
	
	function animatePage()
	{
		$containsMenuPages.show();
		
		$containsPages.show();
		
		$body.css(
		{
			"overflow": "hidden"
		});
		
		$containsMenu.css(
		{
			"overflow": "hidden",
			"position": "absolute",
			"height": "100%"
		});
		
		$containsPage.attr("id", urlHashArg).show();
		
		$("#map").appViewGoogleMap();
	
		$containsMenuPages.stop().transition(y("-100%"), function()
		{
			$containsMenu.hide();
		
			$body.attr("style","");
			
			$containsLinkToMenuFixed.show();
		});
	}
}


/* app plugins
 */
(function( $ ) {


	/* appViewGoogleMap
	 */
	$.fn.appViewGoogleMap = function()
	{
		if ( this.length === 0 ) return this;
		
		var map = new google.maps.Map(this[0], mapOptions()),
				locations = mapMarkers(),
				i = 0;    
		
		while (i < locations.length)
		{
			var markerImage = $(".location-marker-"+locations[i][3]).attr("src");
			
			var marker = new google.maps.Marker(
			{
				icon: new google.maps.MarkerImage(markerImage, null, null, null, new google.maps.Size(locations[i][4],locations[i][5])),
				map: map,
				optimised: false,
				position: new google.maps.LatLng(locations[i][1], locations[i][2])
			});
			i++;
		}
		return this;
	}
}( jQuery ));


/* app functions
 */

function googleMapsScriptLoaded()
{
	return (typeof google === "object" && typeof google.maps === "object") ? true : false;
}


/*=appUrlHash
 *
 * returns an object with the url hash split 
 * between function and argument 
 */
function appUrlHash() 
{
	var hashParts = window.location.hash.replace(/\//g, '.').substring(1).split(".");
	
	return {
		"func": hashParts[0], 
		"arg": hashParts[1]
	};
}


/*=appUrlHashMatchesRoute
 *
 * return true if current url hash matches 
 * an url route declared in appUrlHashRoutes() 
 */
function appUrlHashMatchesRoute() 
{
	return (routes().hasOwnProperty(appUrlHash().func)) ? true : false;
}


/*=y(arg)
 *
 * depending on css transitions support
 * return either { y: arg } or { top: arg } 
 */
function y(arg)
{
	return (!$.support.transition) ? { top: arg } : { y: arg }; 
}