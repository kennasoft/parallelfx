# Parallel FX
Exchange rates and conversions API for parallel foreign exchange (FX) market (or black market)

**Parallel FX** is a node.js module `parallel-fx` that provides a promise-based API for retrieving current parallel market exchange rate. It also offers standard currency exchange rates as provided by [appspot](http://rate-exchange-1.appspot.com/).

I'm calling on anyone who knows other sources of parallel market currency info, to take a look at the codebase and see how they can contribute, and grow this into something that can be used by anyone. For now, the parallel rates cater to only Nigeria, while the standard rates are global.
If you can't code, and still want to contribute, you can help by pointing me to websites where I can get parallel market information for other countries.

Thanks!

### Status
[![Build Status](https://travis-ci.org/kennasoft/parallelfx.png)](https://travis-ci.org/kennasoft/parallelfx)

## Installation
To install just do 
```
npm i git+https://github.com/kennasoft/parallelfx.git
```

## Usage
Simply import the module, and use the promise-based methods like this

```js
var parallelfx = require('parllelfx');
```

### parallelfx.getRate()

```js
parallelfx.getRate({from: 'USD', to: 'CAD'}).then(
    function(resp){
        //use the response object
        //resp = {from: 'XXX', to: 'XXX', rate: [exchange_rate]}
    },
    function(err){
        //report error
    }
);
```

### parallelfx.convert()

```js
parallelfx.convert({value: 1000, from: 'USD', to: 'CAD'}).then(
    function(resp){
        //use the response object 
        //resp = {from: 'XXX', to: 'XXX', value: [converted amount], rate: [exchange_rate]}
    },
    function(err){
        //report error
    }
);
```

### parallelfx.getParallelRate()
Please note that the **getParallelRate()** method currently supports only conversion between NGN and USD,GBP, EUR

```js
parallelfx.getParallelRate({from: 'EUR', to: 'NGN'}).then(
    function(resp){
        //use the response object
        //resp = {from: 'XXX', to: 'XXX', rate: [exchange_rate]}
    },
    function(err){
        //report error
    }
);
```

### parallelfx.convertParallel()
Please note that the **convertParallel()** method currently supports only conversion between NGN and USD,GBP, EUR

```js
parallelfx.convertParallel({value: 1000, from: 'GBP', to: 'NGN'}).then(
    function(resp){
        //use the response object 
        //resp = {from: 'XXX', to: 'XXX', value: [converted amount], rate: [exchange_rate]}
    },
    function(err){
        //report error
    }
);
```