$(window).on('load', function () {    if ($('#preloader').length) {
  $('#preloader').delay(100).fadeOut('slow', function () {
  $(this).remove();
});
}})
var map = L.map('map').fitWorld();

L.tileLayer.provider('MapBox', {
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoieW9zb3ltYWlyaW0iLCJhIjoiY2trOGoyb2oxMDk2eDJ2czlzNm0wbnVmaSJ9.HvIfpKYqyZHeCNZPIpPSaw'
  }).addTo(map);

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
    .bindPopup("You are here")
        
    L.circle(e.latlng, radius).addTo(map);
    
    var clatitud = e.latlng.lat;
    currentLat=clatitud;
    var clongitud = e.latlng.lng;
    currentLong= clongitud;

}
var currentLat="";
var currentLong="";

function onLocationError(e) {
    alert(e.message);
}


map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 8});

var options = {
    key: '1241387f14a84f768dc7bac0933c0a72',
    limit: 10,
    proximity: '51.52255, -0.10249' // favour results near here
  };
  var geocoder = L.Control.OpenCageSearch.geocoder(options);
  var control = L.Control.openCageSearch(options).addTo(map);
  var marker;



map.on('click', function(e) {
    var query = e.latlng.lat.toString() + ',' + e.latlng.lng.toString();
    geocoder.geocode(query, function(results) {
      var r = results[0];
      if (r) {
        if (marker) {
          marker.setLatLng(r.center).setPopupContent(r.name).openPopup();
        } else {
          marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup();
        }
      }
    })
    var latitud = e.latlng.lat;
    lat=latitud;
    var longitud = e.latlng.lng;
    long= longitud;
});
var lat="";
var long="";
//Weather api

$(document).ready(() => {
    const $btnRun = $('#weather');

$btnRun.on('click', () => {
    $.ajax({
    url: "php/weather.php",
    type: 'POST',
    dataType: 'json',
    data: {
      lat: lat ,
      long: long
     },
    success: function(result) {
      console.log(result);
        if (result.status.name == "ok") {
          function temperatureConverter(valNum) {
            valNum = parseFloat(valNum);
            dec = valNum-273.15;
            return parseFloat(dec).toFixed(0);
          }
          var tiemp = result['data']['main']['temp'];
          var tempM =result['data']['main']['temp_max'];
          var tempm =result['data']['main']['temp_min'];
          var fl=result['data']['main']['feels_like'];
            $('#temperature').html(temperatureConverter(tiemp)).append(" º");
            $('#temp-max').html(temperatureConverter(tempM)).append(" º");
            $('#humidity').html(result['data']['main']['humidity']).append(" %");
            $('#pressure').html(result['data']['main']['pressure']);
            $('#feels-like').html(temperatureConverter(fl)).append(" º");
            $('#temp-min').html(temperatureConverter(tempm)).append(" º");
            $('#description').html(result['data']['weather'][0]['main']);
            $('#city').html(result['data']['name']);

        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("it´s not working");
    }
}); 
}).on('click', () => {
  $('.tabla-weather').toggle();
});

});

//Information

  
$(document).ready(() => {
    const $btnInf = $('#countryInformation');
  
  $btnInf.on('click', () => {
    var promise = $.ajax(
      {
        url: "php/countryCode.php",
        type: 'POST',
        dataType: 'json',
        data: {
  
            lat: lat ,
            long: long
         },
          success: function(result) {
            console.log(result);
            if (result.status.name == "ok") {
              $currentIso = result['data']['countryCode'];
             
            }
           
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log("it´s not working");
        }
       
        });
       
    promise.then(function(){
    $.ajax({
    url: "php/information.php",
    type: 'POST',
    dataType: 'json',
    data: {
      currentIso: $currentIso
      
     },
    success: function(result) {
      console.log(result);
        if (result.status.name == "ok") {
  
            $('#countryInf').html(result['data']['geonames'][0]['countryName']);
            $('#currencyInf').html(result['data']['geonames'][0]['currencyCode']);
            $('#populationInf').html(result['data']['geonames'][0]['population']);
            $('#capitalInf').html(result['data']['geonames'][0]['capital']);
            $('#continentInf').html(result['data']['geonames'][0]['continentName']);
            $('#areaInf').html(result['data']['geonames'][0]['areaInSqKm']);
  
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.log("it´s not working");
      },
    })
  });
  });
  });
 
    $('#countryInformation').on('click', () => {
      $('.tabla-information').toggle();
    });

//current country
$(document).ready(() => {
    $(window).on("load", ()=>{
      var promise = $.ajax(
        {
          url: "php/currentLocation.php",
          type: 'POST',
          dataType: 'json',
          data: {
    
              currentLat: currentLat ,
              currentLong: currentLong
           },
            success: function(result) {
              console.log(result);
              if (result.status.name == "ok") {
                $currentCountry = result['data'][0]['components']['country'];
  
              }
             
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log("it´s not working");
          }
         
          });
          promise.then(function(){
            //
            $.ajax({
              url: "php/codigo.php",
              type: 'POST',
              dataType: 'json',
              data: {
        
                  currentCountry: $currentCountry,
                  
               },
                success: function(result) {
                  //alert('AJAX call was successful!');
                  var myStyle = {
                    "color": "#fff200",
                    "weight": 5,
                    "opacity": 1
                  };
                  L.geoJSON(result,{
                    style: myStyle
                  }).addTo(map)
                },
                error: function() {
                  alert('There was some error performing the AJAX call!');
                },
            })
        });
    });
  
  
  });

  //wikipedia 

  function addMarker(e){
    var wikiIcon = L.icon({
      iconUrl: 'media/wiki.png',
      iconSize: [30, 30],})
    L.marker([51.5, -0.09], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/London">Go to wikipedia</a>');
    L.marker([51.75, -1.25], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Oxford">Go to wikipedia</a>');
    L.marker([53.47, -2.24], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Manchester">Go to wikipedia</a>');
    L.marker([52.48, -1.90], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Birmingham">Go to wikipedia</a>');
    L.marker([55.95, -3.18], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Edinburgh">Go to wikipedia</a>');
    L.marker([55.86, -4.25], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Glasgow">Go to wikipedia</a>');
    L.marker([53.35, -6.26], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Dublin">Go to wikipedia</a>');
    L.marker([54.60, -5.92], {icon: wikiIcon}).addTo(map).bindPopup('<a href="https://en.wikipedia.org/wiki/Belfast">Go to wikipedia</a>');
    //map.off('click', addMarker);
    //$('.wikipedia').on('click',enablewikipedia);
    //$('#wikipedia').attr("disabled", true);
  }
  
  $('#wikipedia').on('click',addMarker);

  
$('#weather-btn').click(function(){
  $('#weather').click();
});
$('#information-btn').click(function(){
  $('#countryInformation').click();
});
$('#wikipedia-btn').click(function(){
  $('#wikipedia').click();
});