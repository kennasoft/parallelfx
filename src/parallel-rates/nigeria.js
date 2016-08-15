var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');

var fxUrl = 'http://abokifx.com/bdcs';
var allowedCurrencies = [
    'USD', 'GBP', 'EUR'
];
var errorMsgs = {
        invalidParams: "This method expects an object of the form {from: 'XXX', to: 'XXX'}",
        nairaRestriction: "This module only allows changing to- or from naira (one of your object values must be 'NGN')",
        networkError: "There was an error fetching the exchange rates...",
        invalidCurrency: "The only available currencies are: "+allowedCurrencies.join()
    };
    
function hasErrors( options, convert ){
    if(!options || !options.from || !options.to || (convert && !options.value)){
        if(convert){
            return errorMsgs.invalidParams.replace("{from: 'XXX', to: 'XXX'}",
            "{value:XXX, from: 'XXX', to: 'XXX'}");
        }
        return errorMsgs.invalidParams;
    }
    if(options.from.toUpperCase()!=='NGN' && options.to.toUpperCase()!=='NGN'){
        return errorMsgs.nairaRestriction;
    }
    if(allowedCurrencies.indexOf( options.to ) < 0
            && allowedCurrencies.indexOf( options.from ) < 0){
        return errorMsgs.invalidCurrency;
    }
    return false;
}

function getAbokiFxData( options, convert ){
    var errorStatus = hasErrors( options, convert );
    if( errorStatus ){
        return new Promise(function( resolve,reject ){
            reject(new Error( errorStatus ));
        });
    }
    
    return new Promise(function( resolve, reject ){
        request({
            url: fxUrl,
            headers: {'Cache-Control': 'max-age=1800'}  //cache for 30 mins
        }, function( error, response, body ){
            if(error || !body){
                return reject(new Error(errorMsgs.networkError+'\n\nTechnical:'+ error));
            }
            var currency = options.to === 'NGN' ? options.from : options.to;
            try{
                var $ = cheerio.load(body);
                var buySellRate = '';
                var fxRow = $('.entry-content').find('table:nth-of-type(1)').find('tr:nth-child(3)');
                switch(currency){
                    case 'USD': 
                        buySellRate = fxRow.find('td:nth-child(2)').text(); break;
                    case 'GBP':
                        buySellRate = fxRow.find('td:nth-child(3)').text(); break;
                    case 'EUR':
                        buySellRate = fxRow.find('td:nth-child(2)').text(); break;
                }
                buySellRate = buySellRate.split('/').map( function( item ){
                    return parseFloat( item );
                } );
                var resp = options;
                resp.rate = 0;
                switch( options.from.toUpperCase() ){
                    case 'NGN': resp.rate = 1/buySellRate[1]; break;
                    default: resp.rate = buySellRate[0];
                }
                if( convert ){
                    resp.value = parseFloat((options.value * resp.rate).toFixed(4));
                }
                resp.rate = parseFloat(resp.rate.toFixed(4));
                resolve( resp );
                
            }catch( exc ){
                reject( exc );
            }
            
        });
    });
}

nigeriaRates = {
    getParallelRate: function( options ){
        return getAbokiFxData( options );
    },

    convertParallel: function( options ){
        return getAbokiFxData( options, true );
    },
    
    invalidInput: hasErrors
};

module.exports = nigeriaRates;