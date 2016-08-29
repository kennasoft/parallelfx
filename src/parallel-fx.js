var request = require('request');
var naija = require('./parallel-rates/nigeria');
var ghana = require('./parallel-rates/ghana');
var utils = require('./utils');
   

function invalidInput( options, convert ){
    if(!options || !options.from || !options.to || (convert && !options.value)){
        if(convert){
            return naija.errorMsgs.invalidParams.replace("{from: 'XXX', to: 'XXX'}",
            "{value:XXX, from: 'XXX', to: 'XXX'}");
        }
        return naija.errorMsgs.invalidParams;
    }
    return false;
}

function getAppspotFx( options, convert ){
    var errorStatus = invalidInput( options, convert );
    if( errorStatus ){
        return new Promise(function( resolve,reject ){
            reject( new Error( errorStatus ) );
        });
    }
    
    var fxUrl = 'http://rate-exchange-1.appspot.com/currency?'+utils.toQueryString( options );
    return new Promise(function( resolve, reject ){
        request({
            url: fxUrl,
            headers: { 'Cache-Control': 'max-age=1800' }  //cache for 30 mins
        }, function( error, response, body ){
            try{
                var resp = JSON.parse(body);
                if(convert){
                    resp.value = resp.rate * options.value;
                }
                resolve(resp);
            } catch ( exc ){
                reject( exc );
            }
        });
    });
}

        
var parallelfx = {
    
    getRate: function( options ){
        return getAppspotFx( options );
    },
    
    convert: function( options ){
        return getAppspotFx(options, true);
    },
    
    getParallelRate: function( options ){
        if((options.to && options.from) 
            && 
            (options.to.toUpperCase()==='NGN' 
            || options.from.toUpperCase()==='NGN')){
                return naija.getParallelRate( options );
        }
        if((options.to && options.from) 
            && 
            (options.to.toUpperCase()==='GHS' 
            || options.from.toUpperCase()==='GHS')){
                return ghana.getParallelRate( options );
        }
        
    },
    
    convertParallel: function( options ){
        if((options.to && options.from) 
            && 
            (options.to.toUpperCase()==='NGN' 
            || options.from.toUpperCase()==='NGN')){
                return naija.convertParallel( options );
        }
        if((options.to && options.from) 
            && 
            (options.to.toUpperCase()==='GHS' 
            || options.from.toUpperCase()==='GHS')){
                return ghana.convertParallel( options );
        }
    }
    
};

//parallelfx.getParallelRate({from: "USD", to: "GHS"})
//        .then(function(resp){
//            console.log("USD->GHS: ", resp);
//        },
//        function(err){
//            console.log(err);
//        });
//parallelfx.convertParallel({value:5000, from:"GHS", to: "USD"})
//        .then(function(resp){
//            console.log("5000GHS->USD", resp);            
//        },
//        function(err){
//            console.log(err);
//        });

module.exports = parallelfx;