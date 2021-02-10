
// set endpoint and your API key
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
                //amount: $amount,
            },
            success: function(result) {
                var $to= $("#currencyConverted").val();
                console.log(result);
                var multiplicar = result['data']['rates']['rates'][$to];
                var amount = $amount * multiplicar;
                $('#amountConverted').html(amount);
                $('#exchange').html(multiplicar);
            }
        });
    })
    
});
$('#currencyLink').on('click', () => {
    $('.tabla-currency').toggle();
  });
$('#currency-btn').click(function(){
    $('#currency').click();
  });
  
