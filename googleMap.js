var directionsService=null;
var directionsDisplay=null;


function initlizeMap(MapComponent){

    var map=Ext.ComponentQuery.query("#"+MapComponent)[0];
    if(map)
    {
        var mapInstance=map.getMap();
        var marker=null;
        mapInstance.setCenter(new google.maps.LatLng(18.520430300000000000,73.856743699999920000));
        geocoder = new google.maps.Geocoder();
        //clearListerneronMap(mapInstance);

        google.maps.event.addListener(mapInstance, 'click', function (e) {
            
            if(map.getItemId()=="trackorderPageMap")
            {
                     
            }  
            else
            {
                HandleSingleMarker(e,mapInstance,selectLocationMarker);
            }    
            
           
        });

        if(selectLocationMarker)
        {
            google.maps.event.addListener(selectLocationMarker, 'dragstart', function() {
                updateMarkerAddress('Dragging...');
            });

            google.maps.event.addListener(selectLocationMarker, 'drag', function() {
                updateMarkerStatus('Dragging...');
                updateMarkerPosition(selectLocationMarker.getPosition());
            });

            google.maps.event.addListener(selectLocationMarker, 'dragend', function() {
                updateMarkerStatus('Drag ended');
                geocodePosition(selectLocationMarker.getPosition());
            });  
        }    

    }

}
function toggleBounce()
{
    console.error(arguments);
    updateMarkerPosition(selectLocationMarker.getPosition());
}
function geocodePosition(pos) {
    geocoder.geocode({
        latLng: pos
    }, function(responses) {
        if (responses && responses.length > 0) {
            updateMarkerAddress(responses[0].formatted_address);
        } else {
            updateMarkerAddress('Cannot determine address at this location.');
        }
    });
}

function updateMarkerStatus(latLng) {
    console.error(latLng);
}

function updateMarkerPosition(latLng) {
    console.error(latLng);
}

function updateMarkerAddress(latLng) {
    console.error(latLng);
}
function HandleSingleMarker(e,mapInstance,marker){
    if(!selectLocationMarker)
    {
        selectLocationMarker = new google.maps.Marker({
            map: mapInstance,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng (e.latLng.lat(),e.latLng.lng()),
            markerId: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            draggable: true
        });
    }
    else
    {
        selectLocationMarker.setPosition(new google.maps.LatLng (e.latLng.lat(),e.latLng.lng()));
    }

}
function clearListerneronMap(Map){
    google.maps.event.clearInstanceListeners(Map);

}

function calculateDistanceBetweenTwoPlaces(origin,destination,callback) {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins:[origin] ,
      destinations:[destination] ,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, callback);
}

function handleSuccessResponseforDistance(response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
    } 
    else 
    {
        if(response.rows[0].elements[0].distance)
        {
            var PageDetails={};
            console.error(response.rows[0].elements[0].distance.text);
            console.error(response.rows[0].elements[0].duration.text); 
            PageDetails.distance=response.rows[0].elements[0].distance.text;
            PageDetails.duration=response.rows[0].elements[0].duration.text;
            
            setDetailsOntrackerPage(PageDetails);
           
        }
        else
        {
            

        }
    }    
}

function displayDirections(map,source,destination){

      if((!directionsService) && (!directionsDisplay))
    {
         directionsService = new google.maps.DirectionsService();
         directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);



        var request = {
            origin: source,
            destination: destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setMap(null);
                directionsDisplay.setDirections(response);
            }
        }); 
    }  
    else
    {	
         directionsDisplay.setMap(map);
        var request = {
            origin: source,
            destination: destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                //directionsDisplay.setMap(null);
                directionsDisplay.setDirections(response);
            }
        }); 
        
    }    
   


}    
    

function setDetailsOntrackerPage(PageDetails)
{
    getterSetter("lblTimeTrackerPage",PageDetails.duration);
}
function loadGoogleMaps(){
   
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src","http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
}

//var start = new google.maps.LatLng(-33.890542, 151.274856);
//var end = new google.maps.LatLng(-34.028249, 151.157507);

    