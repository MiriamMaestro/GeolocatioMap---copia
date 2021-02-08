var latitudecurrent;
var longitudecurrent;

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

}
function onLocationError(e) {
  alert(e.message);
}


map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({setView: false});

$(document).ready(() => {
  const $btnRun = $('#weather');

$btnRun.on('click', () => {
  $.ajax({
  url: "php/weathercountry.php",
  type: 'POST',
  dataType: 'json',
  data: {
    iso: $( "#inlineFormCustomSelect" ).val(),
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
  
            lat:(lat == "") ? latitudecurrent:  lat ,
            long: (long == "") ? longitudecurrent:  long 
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

/*  
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
 */
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

  
  //$('#wikipedia').on('click',addMarker);

  
$('#weather-btn').click(function(){
  $('#weather').click();
});
$('#information-btn').click(function(){
  $('#countryInformation').click();
});
$('#wikipedia-btn').click(function(){
  $('#wikipedia').click();
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
                  tag.value= result['data']['features']['features'][i]["properties"]["name"] ;
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
      