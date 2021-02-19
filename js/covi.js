$(document).ready(()=>{
    const $covi = $('#coviLink');
    $covi.on('click', ()=>{
    
    var $country=  $( "#inlineFormCustomSelect option:selected" ).text();

    if($country=='United Kingdom'){
        $country = 'UK'; 
      } else if($country=="United States"){
        $country="USA"
    };

   
        $.ajax({
            url: 'php/covi.php',   
            dataType: 'json',
            data:{
                country: $country
            },
            success: function(result) {
                $(".tabla-covi").siblings().css( "display", "none" );
                $('#confirmed').html(result['Total Cases_text']);
                $('#deaths').html(result['Total Deaths_text']);
                $('#recovered').html(result['Total Recovered_text']);
                $('#country-covid').html($country);
        }
    });
    })
    
});
$('#coviLink').on('click', () => {
    $('.tabla-covi').delay(1000).fadeToggle();
  });
