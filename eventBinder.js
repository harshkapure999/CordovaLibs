document.addEventListener("deviceready", onDedeviceReady, false);




function onDedeviceReady()
{
    app.createAndRegisterforPush();
   document.addEventListener("backbutton", handleDeviceBackButton, false);
   document.addEventListener("online", onOnline, false);
   document.addEventListener("offline", onOffline, false); 

}
function onOnline()
{

    networkStatus=true;
    loadGoogleMaps();

}
function onOffline()
{

    networkStatus=false;
}
function handleDeviceBackButton()
{
    
    setPreviousPage();
}


