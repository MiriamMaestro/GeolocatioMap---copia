
$("#inlineFormCustomSelect").change(function () {
    var $country=  $( "#inlineFormCustomSelect option:selected" ).text();
    if($country=='United Kingdom'){
        $country = 'UK'; 
      } else if($country=="United States"){
        $country="USA"
    };
    $.ajax({

        url: 'php/monuments.php',   
        dataType: 'json',
        data:{
            country: $country
        },
        error: function (err) {

            alert("Error: " + err.responseText.toString())

        },
        success: function (result) {
            
            if(!map.hasLayer(monument)){
                var monument1 = L.marker([result['data']['response']['groups'][0]['items'][0]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][0]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][0]['venue']['name'])
                monument2 = L.marker([result['data']['response']['groups'][0]['items'][1]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][1]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][1]['venue']['name'])
                monument3 = L.marker([result['data']['response']['groups'][0]['items'][2]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][2]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][2]['venue']['name'])
                monument4 = L.marker([result['data']['response']['groups'][0]['items'][3]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][3]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][3]['venue']['name'])
                monument5 = L.marker([result['data']['response']['groups'][0]['items'][4]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][4]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][4]['venue']['name'])
                var monuments =  L.layerGroup([monument1, monument2, monument3, monument4, monument5]);
               monument = monuments
               monument.addTo(map); 
            } else{
                monument.clearLayers();
                var monument1 = L.marker([result['data']['response']['groups'][0]['items'][0]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][0]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][0]['venue']['name'])
                monument2 = L.marker([result['data']['response']['groups'][0]['items'][1]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][1]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][1]['venue']['name'])
                monument3 = L.marker([result['data']['response']['groups'][0]['items'][2]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][2]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][2]['venue']['name'])
                monument4 = L.marker([result['data']['response']['groups'][0]['items'][3]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][3]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][3]['venue']['name'])
                monument5 = L.marker([result['data']['response']['groups'][0]['items'][4]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][4]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][4]['venue']['name'])
                var monuments =  L.layerGroup([monument1, monument2, monument3, monument4, monument5]);
               monument = monuments
               monument.addTo(map);
            }
            
   
            
            


        }
    });

});