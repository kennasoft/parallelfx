var request = require('request'),
    cheerio = require('cheerio'),
    Promise = require('bluebird');

var fxUrl = 'https://www.bog.gov.gh/index.php?option=com_wrapper&view=wrapper&Itemid=89',
    errorMsgs = {
        invalidParams: "This method expects an object of the form {from: 'XXX', to: 'XXX'}",
        networkError: "There was an error fetching the exchange rates..."
    };

module.exports = {};