var request = require('request'),
    cheerio = require('cheerio'),
    Promise = require('bluebird');

var fxUrl = 'https://www.bog.gov.gh/data/bankindrate.php';
var allowedCurrencies = [
    'USD', 'GBP', 'EUR', 'CHF', 'AUD', 'CAD', 'JPY', 
    'CNY', 'DKK', 'NZD', 'ZAR', 'NOK', 'SEK'
];
var errorMsgs = {
        invalidParams: "This method expects an object of the form {from: 'XXX', to: 'XXX'}",
        cediRestriction: "This module only allows changing to- or from Cedi (one of your object values must be 'GHS')",
        networkError: "There was an error fetching the exchange rates...",
        invalidCurrency: "The only currencies available on the parallel market are: "+allowedCurrencies.join()        
    };
    
function hasErrors( options, convert ){
    if(!options || !options.from || !options.to || (convert && !options.value)){
        if(convert){
            return errorMsgs.invalidParams.replace("{from: 'XXX', to: 'XXX'}",
            "{value:XXX, from: 'XXX', to: 'XXX'}");
        }
        return errorMsgs.invalidParams;
    }
    if(options.from.toUpperCase()!=='GHS' && options.to.toUpperCase()!=='GHS'){
        return errorMsgs.cediRestriction;
    }
    if(allowedCurrencies.indexOf( options.to ) < 0
            && allowedCurrencies.indexOf( options.from ) < 0){
        return errorMsgs.invalidCurrency;
    }
    return false;
}

function getBOGFxData( options, convert ){
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
            var currency = options.to === 'GHS' ? options.from : options.to;
            try{
                var $ = cheerio.load(body);
                var fxRow = $('table:nth-of-type(1)').find('td').filter(function(){
                    return $(this).text().trim() === (currency+'GHS');
                }).closest('tr');
                var fxData = {
                    currencyName: fxRow.find('td:nth-child(1)').text().trim(),
                    currencyCode: currency,
                    buyingRate: fxRow.find('td:nth-child(3)').text().trim(),
                    sellingRate: fxRow.find('td:nth-child(4)').text().trim()
                };
                var resp = options;
                resp.rate = 0;
                switch( options.from.toUpperCase() ){
                    case 'GHS': resp.rate = 1/fxData.sellingRate; break;
                    default: resp.rate = fxData.buyingRate;
                }
                if( convert ){
                    resp.value = parseFloat((options.value * resp.rate).toFixed(4));
                }
                resp.rate = parseFloat((resp.rate * 1).toFixed(4));
                resolve( resp );
                
            }catch( exc ){
                reject( exc );
            }
            
        });
    });
}

ghanaRates = {
    getParallelRate: function( options ){
        return getBOGFxData( options );
    },

    convertParallel: function( options ){
        return getBOGFxData( options, true );
    },
    
    invalidInput: hasErrors
};

module.exports = ghanaRates;