
$(document).ready(() => {
    const $btnInf = $('#countryInformation');
  
  $btnInf.on('click', () => {
  $.ajax({
    url: "php/information.php",
    type: 'POST',
    dataType: 'json',
    data: {
      currentIso: $("#inlineFormCustomSelect").val(),
      
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
      $('#information-btn').click(function(){
        $('#countryInformation').click();
      });
      
      
      
      
$(document).ready(() => {
    const $btnInf = $('#countryInformation');
      
      $btnInf.on('click', () => {
        $currentIso= $("#inlineFormCustomSelect").val();
          var iso= $currentIso;
          var za = iso.toLowerCase();
            var img = document.createElement("IMG");
            img.src = "https://flagcdn.com/28x21/"+za+".png";
            $('#image').html(img); 
        
      });
      });