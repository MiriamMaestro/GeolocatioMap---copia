/*$(document).ready(()=>{
    const $monument = $('#monumentsLink');
    $monument.on('click', ()=>{
    
    var $country=  $( "#inlineFormCustomSelect option:selected" ).text();

   
        $.ajax({
            url: 'php/monuments.php',   
            dataType: 'json',
            data:{
                country: $country
            },
            success: function(result) {
                console.log(result);

                function layergroup(){
                    var monument1 = L.marker([result['data']['response']['groups'][0]['items'][0]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][0]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][0]['venue']['name']),
                    monument2 = L.marker([result['data']['response']['groups'][0]['items'][1]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][1]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][1]['venue']['name']),
                    monument3 = L.marker([result['data']['response']['groups'][0]['items'][2]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][2]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][2]['venue']['name']),
                    monument4 = L.marker([result['data']['response']['groups'][0]['items'][3]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][3]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][3]['venue']['name']),
                    monument5 = L.marker([result['data']['response']['groups'][0]['items'][4]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][4]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][4]['venue']['name']);
                    var monuments =  L.layerGroup([monument1, monument2, monument3, monument4, monument5]);
            /*
                    var map = L.map('map', {
                        center: [39.73, -104.99],
                        zoom: 10,
                        layers: [monuments]
                    });
                    var overlayMap = {
                        "Monuments": monuments
                    };*/
                   /* monuments.addTo(map);
                }
                layergroup();
                

        }
    });
    })
    
});

*//*
$('#monumentsLink').on('click', function(){
    var $country=  $( "#inlineFormCustomSelect option:selected" ).text();
    
    $("#monumentsLink").attr("disabled", true);
    
        $.ajax({
            url: 'php/monuments.php',   
            dataType: 'json',
            data:{
                country: $country
            },
            success: function(result) {
                console.log(result);

                
                    var monument1 = L.marker([result['data']['response']['groups'][0]['items'][0]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][0]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][0]['venue']['name']),
                    monument2 = L.marker([result['data']['response']['groups'][0]['items'][1]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][1]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][1]['venue']['name']),
                    monument3 = L.marker([result['data']['response']['groups'][0]['items'][2]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][2]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][2]['venue']['name']),
                    monument4 = L.marker([result['data']['response']['groups'][0]['items'][3]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][3]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][3]['venue']['name']),
                    monument5 = L.marker([result['data']['response']['groups'][0]['items'][4]['venue']['location']['lat'], result['data']['response']['groups'][0]['items'][4]['venue']['location']['lng']]).bindPopup(result['data']['response']['groups'][0]['items'][4]['venue']['name']);
                    var monuments =  L.layerGroup([monument1, monument2, monument3, monument4, monument5]);
                    monuments.addTo(map);
                    
                   /* var overlayMaps = {
                        "Monuments": monuments
                    };
                    L.control.layers(overlayMaps).addTo(map)*/
                  /*  $("#monumentsLink").attr("disabled", false);
              
                
            }
        });
    
    
});

$("#monumentsLink").click(function(event) {
    event.preventDefault();
    if(map.hasLayer(monuments)) {
        $(this).removeClass('selected');
        map.removeLayer(monuments);
    } else {
        map.addLayer(monuments);        
        $(this).addClass('selected');
   }
});*/
/*var map = L.map('map', {
    layers: [monuments]
});
var overlayMaps = {
    "Monuments": monuments
};
L.control.layers(overlayMaps).addTo(map);*/
    //const $monument = $('#monumentsLink');
    //$monument.on('click', enableclick);
    //$monument.off('click');
    //$monument.on('click', enableclick);