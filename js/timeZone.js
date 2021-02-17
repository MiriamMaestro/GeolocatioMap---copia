$(document).ready(() => {
    const $btnTime = $('#timeLink');

  
  $btnTime.on('click', () => {
    var $country = $( "#inlineFormCustomSelect option:selected").text();
    var date =  new Date().toLocaleString('en-ZA');
    date = date.split('/').join('-');
    date = date.replace(',', '');
    
    $.ajax({
        url: 'php/timeZone.php',   
        dataType: 'json',
        data:{
            baseLocation: currentCountry,
            baseDatetime: date,
            targetLocation: $country
        },
        success: function(result) {
          $(".tabla-time").siblings().css( "display", "none" );
            var time = result['data']['target_location']['datetime'];
            var values = time.split(/T| /);
            var f_time = values[1];
            f_time =f_time.split(/[.\*+/_]/);
            var h_time = f_time[0];
            $('#country-hour').html(h_time);
            $('#country-zone').html($country);
            $('#timezone-name').html(result['data']['target_location']['timezone_name']);
            $('#gmt').html(result['data']['target_location']['gmt_offset']);

        }
    });
  });
  });
  $('#timeLink').on('click', () => {
    $('.tabla-time').delay(1000).fadeToggle();
  });
  $('#time-btn').click(function(){
    $('#timeLink').click();
  });