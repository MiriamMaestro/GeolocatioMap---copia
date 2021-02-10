$(document).ready(()=>{
    const $covi = $('#coviLink');
    $covi.on('click', ()=>{
    
    var $country=  $( "#inlineFormCustomSelect option:selected" ).text();

   
        $.ajax({
            url: 'php/covi.php',   
            dataType: 'json',
            data:{
                country: $country
            },
            success: function(result) {
                console.log(result);
        });
    })
    
});
/*$('#currencyLink').on('click', () => {
    $('.tabla-currency').toggle();
  });
$('#currency-btn').click(function(){
    $('#currencyLink').click();
  });
  */