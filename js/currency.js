$(document).ready(()=>{
    const $currencySubmit = $('#currencySubmit');
    $currencySubmit.on('click', ()=>{
    
    var $from= $("#currency").val();
    var $to= $("#currencyConverted").val();
    var $amount= $("#amount").val() ;
   
        $.ajax({
            url: 'php/currency.php',   
            dataType: 'json',
            data:{
                base: $from,
                symbols: $to,
                },
            success: function(result) {
                
                var $to= $("#currencyConverted").val();
                var multiplicar = result['data']['rates']['rates'][$to];
                var amount = $amount * multiplicar;
                $('#amountConverted').html(amount);
                $('#exchange').html(multiplicar);
            }
        });
    })
    
});
$('#currencyLink').on('click', () => {
    $('.tabla-currency').delay(1000).fadeToggle();
    $(".tabla-currency").siblings().css("display", "none");
  });
$('#currency-btn').click(function(){
    $('#currencyLink').click();
  });
  
