
$(document).ready(() => {
  const $btnRun = $('#weather');
  
    
$btnRun.on('click', () => {
  var $iso = $( "#inlineFormCustomSelect option:selected").text(); 
  if($iso='United Kingom'){
    $iso = 'GBR'
  };
  //var currentCountry;
  var promise = $.ajax({
      url: "php/latitudLongitud.php",
     // url:"php/latLong1.php",
      type: 'POST',
      dataType: 'json',
      data: {
       iso: $iso
     // iso: ($iso = null )? currentCountry: $iso
      },
      success: function(result) {
        console.log(result);
        if (result.status.name == "ok") {
          $lat = result['data']['data'][0]['latitude'];
          $long= result['data']['data'][0]['longitude'];
         // $lat = result['data']['latitude'];
         // $long= result['data']['longitude'];


        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("it´s not working");
      }
    });
promise.then(function(){
  $.ajax({
      url: "php/weathercountry.php",
      type: 'POST',
      dataType: 'json',
      data: {
       lat: $lat,
       long: $long
      },
      success: function(result) {
        console.log(result);
        $(".tabla-weather").siblings().css( "display", "none" );
          if (result.status.name == "ok") {
            function temperatureConverter(valNum) {
              valNum = parseFloat(valNum);
              dec = valNum-273.15;
              return parseFloat(dec).toFixed(0);
            }
            $('#day').on('change', ()=>{
              var day = $( "#day").val();
              var tiemp = result['data']['daily'][day]['temp']['day'];
              var tempM =result['data']['daily'][day]['temp']['max'];
              var tempm =result['data']['daily'][day]['temp']['min'];
              var fl=result['data']['daily'][0]['feels_like']['day'];
                $('#temperature').html(temperatureConverter(tiemp)).append(" º");
                $('#temp-max').html(temperatureConverter(tempM)).append(" º");
                $('#humidity').html(result['data']['daily'][day]['humidity']).append(" %");
                $('#pressure').html(result['data']['daily'][day]['pressure']);
                $('#feels-like').html(temperatureConverter(fl)).append(" º");
                $('#temp-min').html(temperatureConverter(tempm)).append(" º");
                $('#description').html(result['data']['daily'][day]['weather'][0]['main']);
                $('#city').html($( "#inlineFormCustomSelect option:selected" ).text());
      
            });

          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("it´s not working");
      }
    });
})
})
});

/*
const $btnRun = $('#weather');
  
    
$btnRun.on('click', () => {
  var $iso = $( "#inlineFormCustomSelect option:selected").text(); 
  //var currentCountry;
  if($iso='United Kingom'){
    $iso = 'GBR'
  };
  $.ajax({
      url: "php/latitudLongitud.php",
      //url:"php/latLong1.php",
      type: 'POST',
      dataType: 'json',
      data: {
       iso: $iso
     // iso: ($iso = null )? currentCountry: $iso
      },
      success: function(result) {
        console.log(result);
        if (result.status.name == "ok") {
          $lat = result['data']['data'][0]['latitude'];
          $long= result['data']['data'][0]['longitude'];
         // $lat = result['data']['latitude'];
         // $long= result['data']['longitude'];


        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("it´s not working");
      }
    });
  });*/
$('#weather').on('click', () => {
  $('.tabla-weather').delay(1000).fadeToggle();
});
$('#weather-btn').click(function(){
  $('#weather').click();
})