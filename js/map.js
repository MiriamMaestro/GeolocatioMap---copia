var latitudecurrent;
var longitudecurrent;
var currentCountry;

$(window).on('load', function () {    if ($('#preloader').length) {
  $('#preloader').delay(100).fadeOut('slow', function () {
  $(this).remove();
});
}})
/*
var map = L.map('map').fitWorld();
L.tileLayer.provider('MapBox', {
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1IjoieW9zb3ltYWlyaW0iLCJhIjoiY2trOGoyb2oxMDk2eDJ2czlzNm0wbnVmaSJ9.HvIfpKYqyZHeCNZPIpPSaw'
}).addTo(map);
*/


var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieW9zb3ltYWlyaW0iLCJhIjoiY2trOGoyb2oxMDk2eDJ2czlzNm0wbnVmaSJ9.HvIfpKYqyZHeCNZPIpPSaw';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
  streets  = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});

var map = L.map('map', {
  layers: [grayscale]
});

var baseLayers = {
  "Street": grayscale,
  "Satelite": streets
};


L.control.layers(baseLayers).addTo(map);

/* */
function onLocationFound(e) {
  var radius = e.accuracy / 2;

  L.marker(e.latlng).addTo(map)
  .bindPopup("You are here")
      
  L.circle(e.latlng, radius).addTo(map);

}
function onLocationError(e) {
  alert(e.message);
}


map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({setView: false});
/*
$(document).ready(() => {
  const $btnRun = $('#weather');
  //var isoC = $( "#inlineFormCustomSelect" ).val();

$btnRun.on('click', () => {
  $.ajax({
  url: "php/weathercountry.php",
  type: 'POST',
  dataType: 'json',
  data: {
   // iso: (isoC= "") ? currentIso: $isoC,
   iso: $( "#inlineFormCustomSelect option:selected" ).text(),
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

*/
//Information

$(document).ready(() => {
  const $btnInf = $('#countryInformation');

$btnInf.on('click', () => {
$.ajax({
  url: "php/information.php",
  type: 'POST',
  dataType: 'json',
  data: {
    currentIso: $( "#inlineFormCustomSelect").val(),
    
   },
  success: function(result) {
    console.log(result);
      if (result.status.name == "ok") {

          $('#countryInf').html(result['data']['geonames'][0]['countryName']);
          $('#currencyInf').html(result['data']['geonames'][0]['currencyCode']);
          $('#populationInf').html(result['data']['geonames'][0]['population'].toLocaleString());
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

    $('#countryInformation').on('click', () => {
      $('.tabla-information').toggle();
    });
function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);


      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }

function showPosition(position) {
      var latitudec =  position.coords.latitude;
      latitudecurrent = latitudec;
      var longitudec = position.coords.longitude;
      longitudecurrent = longitudec;
      //alert("Latitude: " + latitudecurrent +      "<br>Longitude: " + longitudecurrent);
      //alert("Latitude: " + latitudec +      "<br>Longitude: " + longitudec);
    }
    $(window).on("load", getLocation);

    

//current country
$(document).ready(() => {
    $(window).on("load", ()=>{
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
         
          var promise = $.ajax(
            {
              url: "php/currentLocation.php",
              type: 'POST',
              dataType: 'json',
              data: {
        
                  currentLat: position.coords.latitude,
                  currentLong: position.coords.longitude
               },
               
    
                success: function(result) {
                  console.log(result);
                  if (result.status.name == "ok") {
                    $currentCountry = result['data'][0]['components']['country'];
                    currentCountry = $currentCountry
      
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
    
                      border = L.geoJSON(result,{
                        style: myStyle
                      }).addTo(map);
                      
                      map.fitBounds(border.getBounds());

                    },
                    error: function() {
                      alert('There was some error performing the AJAX call!');
                    },
                })
            });
        });
      
        }
     
      });
  });

  var wikiIcon = L.icon({
    iconUrl: 'media/wiki.png',
    iconSize: [20, 20],});
  var london = L.marker([51.5, -0.09], {icon: wikiIcon}).bindPopup('London: <a href="https://en.wikipedia.org/wiki/London">Wikipedia link</a>');
      oxford = L.marker([51.75, -1.25], {icon: wikiIcon}).bindPopup('Oxford: <a href="https://en.wikipedia.org/wiki/Oxford">Wikipedia link</a>');
      manchester = L.marker([53.47, -2.24], {icon: wikiIcon}).bindPopup('Manchester: <a href="https://en.wikipedia.org/wiki/Manchester">Wikipedia link</a>');
      birmigham = L.marker([52.48, -1.90], {icon: wikiIcon}).bindPopup('Birmingham: <a href="https://en.wikipedia.org/wiki/Birmingham">Wikipedia link</a>');
      edimburgh= L.marker([55.95, -3.18], {icon: wikiIcon}).bindPopup('Edinburgh: <a href="https://en.wikipedia.org/wiki/Edinburgh">Wikipedia link</a>');
      glasgow = L.marker([55.86, -4.25], {icon: wikiIcon}).bindPopup('Glasgow: <a href="https://en.wikipedia.org/wiki/Glasgow">Wikipedia link</a>');
      dublin = L.marker([53.35, -6.26], {icon: wikiIcon}).bindPopup('Dublin: <a href="https://en.wikipedia.org/wiki/Dublin">Wikipedia link</a>');
      belfast = L.marker([54.60, -5.92], {icon: wikiIcon}).bindPopup('Belfast: <a href="https://en.wikipedia.org/wiki/Belfast">Wikipedia link</a>');
  var cities = L.layerGroup([london, oxford, manchester,birmigham, edimburgh, glasgow, dublin, belfast]);
cities.addTo(map);

  

$('#information-btn').click(function(){
  $('#countryInformation').click();
});





$(window).on("load", ()=>{
      
 $.ajax(
        {
          url: "php/border.php",
          type: 'POST',
          dataType: 'json',    
          success: function(result) {
              console.log(result);
              
                for (i=0; i<result['data']['features']['features'].length ; i++) {
                  var tag = document.createElement('option');
                  tag.value= result['data']['features']['features'][i]["properties"]["iso_a2"] ;
                  tag.text = result['data']['features']['features'][i]["properties"]["name"] ;
                  var element = document.getElementById('inlineFormCustomSelect');
                  element.appendChild(tag);
                  
              }


            
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log("it´s not working");
          }
         
          });
        });
       