var map=function(){var e,a,t=function(){if(e=document.querySelector("[data-map=map]")){a=document.querySelectorAll("[data-map=marker]");var t=document.createElement("script");t.async=!0,t.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBe2xGalbZ8CZShyObqUvw78DkLhpbBOVY&callback=map.initMap",document.getElementsByTagName("head")[0].appendChild(t)}},n=function(){return{center:new google.maps.LatLng(51.317715,-.55761),disableDefaultUI:!0,mapTypeId:"roadmap",styles:[{featureType:"landscape.natural.terrain",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.business",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"on"}]}],zoom:16}};return t(),{init:function(){t()},initMap:function(){!function(){var t=new google.maps.Map(e,n());for(i=0;i<a.length;i++)new google.maps.Marker({icon:new google.maps.MarkerImage(a[i].src,null,null,null,new google.maps.Size(a[i].width,a[i].height)),map:t,optimised:!1,position:new google.maps.LatLng(a[i].dataset.long,a[i].dataset.lat)})}()}}}();