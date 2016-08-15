# Parallel FX
Exchange rates and conversions API for parallel foreign exchange (FX) market (or black market)

**Parallel FX** is a node.js module `parallel-fx` that provides a promise-based API for retrieving current parallel market exchange rate. It also offers standard currency exchange rates as provided by [appspot](http://rate-exchange-1.appspot.com/)

## Installation
To install just do 
```
npm i git+https://github.com/kennasoft/africanfx.git
```

## Usage
Simply import the module, and use the promise-based methods like this

```js
var parallelfx = require('parllel-fx');
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
Please note that the getParallelRate() method currently supports only conversion between NGN and USD,GBP, EUR

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