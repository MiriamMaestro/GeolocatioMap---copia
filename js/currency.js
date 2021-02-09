
// set endpoint and your API key
$(document).ready(()=>{
    const $currencySubmit = $('#currencySubmit');
    $currencySubmit.on('click', ()=>{
    
    var $from= $("#currency").val();
    var $to= $("#currencyConverted").val();
    //var $amount= $("#amount").val() ;
   
        $.ajax({
            url: '../php/currency1.php',   
            dataType: 'json',
            data:{
                base: $from,
                symbols: $to,
                //amount: $amount,
            },
            success: function(json) {
        
        // exchange rata data is stored in json.rates
        alert(json.rates.GBP);
        
        // base currency is stored in json.base
        alert(json.base);
        
        // timestamp can be accessed in json.timestamp
        alert(json.timestamp);
            }
        });
    })
    
})
