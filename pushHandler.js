

var gcmSenderId="xyz";// This is app id
var apiKey="";//Gooogle cloude gives apiKey
var deviceToken="";

var app={

    createAndRegisterforPush:function(){
        if(window.plugins && window.plugins.pushNotification)
        {
            var pushNotification = window.plugins.pushNotification;   
            pushNotification.register(
                app.successHandler, 
                app.errorHandler,
                { "senderID":gcmSenderId,
                 "ecb":"app.onNotificationGCM"
                }
            );

        }  
        

    },
    successHandler: function(result) {
        
    },

    errorHandler:function(error) {
        
    },

    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    console.log("Regid " + e.regid);
                    deviceToken=e.regid;
                    alert(deviceToken);    
                   
                }
                break;

            case 'message':
                  console.error(e.payload);
                  alert(JSON.stringify(e)); 
                if (e.foreground) {
                    try {

                        this.HandlePush(e.payload);
                    } 
                    catch(b) 
                    {
                        

                    }
                } 
                else 
                {
                    try 
                    {
                        
                        this.HandlePush(e.payload);  
                    } 
                    catch (b) {

                    }
                }

                
                  
                     
                break;

            case 'error':
                
                break;

            default:
                
                break;
        }
    },
    HandlePush:function(data)
    {
       
    }


};
