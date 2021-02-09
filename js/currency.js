
// set endpoint and your API key
$(document).ready(()=>{
    const $currencySubmit = $('#currencySubmit');
    $currencySubmit.submit(function(event){
        $.ajax({
            url: '../php/currency.php',   
            dataType: 'jsonp',
            data:{
                from: $("#currency").val(),
                to: $("#currencyConverted").val(),
                amount: document.getElementById("amount"),
            },
            success: function(json) {
        
                // access the conversion result in json.result
                alert(json.result);
                        
            }
        });
    })
    
})
