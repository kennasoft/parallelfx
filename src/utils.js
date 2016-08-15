
function toQueryString( obj ){
    var querystring='';
    if( obj ){
        for( var entry in obj ){
            if( obj.hasOwnProperty( entry ) ){
                if( querystring ){
                    querystring += '&';
                }
                querystring += entry + '=' + obj[ entry ];
            }
        }
    }
    return querystring;
}

var utils = {
    toQueryString: toQueryString
};

module.exports = utils;
