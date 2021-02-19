var latitudecurrent;
var longitudecurrent;
var currentCountry;
var currentIso;
var monument;


$(window).on('load', function () {    if ($('#preloader').length) {
  $('#preloader').delay(100).fadeOut('slow', function () {
  $(this).remove();
});
}})



var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoieW9zb3ltYWlyaW0iLCJhIjoiY2trOGoyb2oxMDk2eDJ2czlzNm0wbnVmaSJ9.HvIfpKYqyZHeCNZPIpPSaw';


  var wikiIcon = L.icon({
    iconUrl: 'media/wiki.png',
    iconSize: [20, 20],});
   
  var london = L.marker([51.5, -0.09], {icon: wikiIcon}).bindPopup('London: <a href="https://en.wikipedia.org/wiki/London">Wikipedia link</a>'),
  oxford = L.marker([51.75, -1.25], {icon: wikiIcon}).bindPopup('Oxford: <a href="https://en.wikipedia.org/wiki/Oxford">Wikipedia link</a>'),
  manchester = L.marker([53.47, -2.24], {icon: wikiIcon}).bindPopup('Manchester: <a href="https://en.wikipedia.org/wiki/Manchester">Wikipedia link</a>'),
  birmigham = L.marker([52.48, -1.90], {icon: wikiIcon}).bindPopup('Birmingham: <a href="https://en.wikipedia.org/wiki/Birmingham">Wikipedia link</a>'),
  edimburgh= L.marker([55.95, -3.18], {icon: wikiIcon}).bindPopup('Edinburgh: <a href="https://en.wikipedia.org/wiki/Edinburgh">Wikipedia link</a>'),
  glasgow = L.marker([55.86, -4.25], {icon: wikiIcon}).bindPopup('Glasgow: <a href="https://en.wikipedia.org/wiki/Glasgow">Wikipedia link</a>'),
  dublin = L.marker([53.35, -6.26], {icon: wikiIcon}).bindPopup('Dublin: <a href="https://en.wikipedia.org/wiki/Dublin">Wikipedia link</a>'),
  belfast = L.marker([54.60, -5.92], {icon: wikiIcon}).bindPopup('Belfast: <a href="https://en.wikipedia.org/wiki/Belfast">Wikipedia link</a>');
var cities = L.layerGroup([london, oxford, manchester,birmigham, edimburgh, glasgow, dublin, belfast]);
var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr}),
  streets  = L.tileLayer(mbUrl, {id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1, attribution: mbAttr});


var map = L.map('map', {
  layers: [grayscale, cities]
});

var baseLayers = {
  "Street": grayscale,
  "Satelite": streets
};
var overLayers = {
  "Wikipedia Link": cities
}


L.control.layers(baseLayers, overLayers).addTo(map);


function onLocationFound(e) {
  var radius = e.accuracy / 2;
  var localIcon = L.icon({
    iconUrl: 'media/japan.png',
    iconSize: [40, 40],});

  L.marker(e.latlng,{icon: localIcon}).addTo(map)
  .bindPopup("You are here")
      
  L.circle(e.latlng, radius).addTo(map);

}
function onLocationError(e) {
  alert(e.message);
}


map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({setView: false});



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
    }
    $(window).on("load", getLocation);


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
                    if (result.status.name == "ok") {
                      $currentCountry = result['data'][0]['components']['country'];
                      currentCountry = $currentCountry;
                      $currentIso = result['data'][0]['components']['ISO_3166-1_alpha-2'];
                      currentIso = $currentIso; 
                      var tag = document.createElement('option');
                      tag.value= currentIso;
                      tag.text = currentCountry ;
                      var element = document.getElementById('inlineFormCustomSelect');
                      element.appendChild(tag);
                      
                    }
                   
                  },
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log("it´s not working");
                }
               
                });
                promise.then(function(){
                  $curentIso= $("inlineFormCustomSelect").val();
                  $.ajax({
                    url: "php/codigo1.php",
                    type: 'POST',
                    dataType: 'json',
                    data: {

                      countryCode: $curentIso='none'? currentIso: $currentIso
                        
                    },
                      success: function(result) {
                        var myStyle = {
                          "color": "#fff200",
                          "weight": 5,
                          "opacity": 1
                        };

                        border = L.geoJSON(result['data']['border'],{
                          style: myStyle
                        }).addTo(map);
                        
                        map.fitBounds(border.getBounds());
                            

                      },
                      error: function() {
                        alert('There was some error performing the AJAX call!');
                      },
                  })
                });
                promise.then(function(){
                  $.ajax({

                    url: 'php/monuments.php',   
                    dataType: 'json',
                    data:{
                        country: currentIso
                    },
                    error: function (err) {
            
                        alert("Error: " + err.responseText.toString())
            
                    },
                    success: function (result) {
                      var monumentIcon = L.icon({
                        iconUrl: 'media/mecca.png',
                        iconSize: [30, 30],});
                       
                        var monument1 = L.marker([result['data']['response']['groups'][0]['items'][0]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][0]['venue']['location']['lng']], {icon: monumentIcon}).bindPopup(result['data']['response']['groups'][0]['items'][0]['venue']['name'])
                            monument2 = L.marker([result['data']['response']['groups'][0]['items'][1]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][1]['venue']['location']['lng']], {icon: monumentIcon}).bindPopup(result['data']['response']['groups'][0]['items'][1]['venue']['name'])
                            monument3 = L.marker([result['data']['response']['groups'][0]['items'][2]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][2]['venue']['location']['lng']], {icon: monumentIcon}).bindPopup(result['data']['response']['groups'][0]['items'][2]['venue']['name'])
                            monument4 = L.marker([result['data']['response']['groups'][0]['items'][3]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][3]['venue']['location']['lng']], {icon: monumentIcon}).bindPopup(result['data']['response']['groups'][0]['items'][3]['venue']['name'])
                            monument5 = L.marker([result['data']['response']['groups'][0]['items'][4]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][4]['venue']['location']['lng']], {icon: monumentIcon}).bindPopup(result['data']['response']['groups'][0]['items'][4]['venue']['name'])
                            var monuments =  L.layerGroup([monument1, monument2, monument3, monument4, monument5]);
                           monument = monuments;
                           monument.addTo(map); 
                    }
    
                  })
              });
              promise.then(function(){
     
                $.ajax(
                  {
                    url: "php/countryList.php",
                    type: 'POST',
                    dataType: 'json',
                    success: function(result) {
                          for (i=0; i<result['data'].length ; i++) {
                            var tag = document.createElement('option');
                            tag.value= result['data'][i]["code"] ;
                            tag.text = result['data'][i]["name"] ;
                            var element = document.getElementById('inlineFormCustomSelect');
                            element.appendChild(tag);
                            
                        }
          
          
                      
                      },
                      error: function(jqXHR, textStatus, errorThrown) {
                        console.log("it´s not working");
                    }
                   
                    });
              })
          });
        
          }
       
        });
    });




