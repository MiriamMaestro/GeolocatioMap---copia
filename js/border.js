
$("#inlineFormCustomSelect").change(function () {
   
    var $currentIso1 = $("#inlineFormCustomSelect").val();
    $.ajax({
      url: "php/codigo1.php",
      type: 'POST',
      dataType: 'json',
      data: {

        countryCode: $currentIso1
          
      },
        error: function (err) {

            alert("Error: " + err.responseText.toString())

        },
        success: function (result) {
            if(map.hasLayer(border)){
                border.clearLayers();
                var myStyle = {
                    "color": "#fff200",
                    "weight": 5,
                    "opacity": 1
                  };

                  border = L.geoJSON(result['data']['border'],{
                    style: myStyle
                  }).addTo(map);
                  
                 // map.fitBounds(border.getBounds());
                  

            } 
            
   
            
            


        }
    });

});