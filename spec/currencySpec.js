var parallelfx = require("../src/parallel-fx");

describe("Parallel FX Module ", function(){
    describe("Get global exchange rates", function(){
        //this method fetches standard exchange rates from http://rate-exchange-1.appspot.com/currency
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx}", function(done){
            parallelfx.getRate({from: "USD", to: "NGN"}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toBeGreaterThan(0);
                    done();
                },
                function(err){
                    done();
                }
            );
        });
        
        //this method converts an amount based on rates from http://rate-exchange-1.appspot.com/currency
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx, value:xxx}", function(done){
            parallelfx.convert({from: "USD", to: "NGN", value: 1000}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.value).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toBeGreaterThan(0);
                    expect(resp.value).toBeGreaterThan(0);
                    done();
                },
                function(err){
                    done();
                }
            );
        });
    });
    
    
    describe("Get Parallel (Black market) exchange rates for NGN", function(){    
        //this method gets parallel rates from http://abokifx.com
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx}", function( done ){
            parallelfx.getParallelRate( {from: "USD", to: "NGN"} ).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toBeGreaterThan(0);
                    done();
                },
                function(err){
                    done();
                }
            );
        });
        
        //this method converts an amount based on parallel rates from http://abokifx.com
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx, value:xxx}", function(done){
            parallelfx.convertParallel({from: "USD", to: "NGN", value: 1000}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.value).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toBeGreaterThan(0);
                    expect(resp.value).toBeGreaterThan(0);
                    done();
                },
                function(err){
                    done();
                }
            );
        });
    });
    
    
    describe("Get Parallel (Black market) exchange rates for GHS", function(){    
        //this method gets parallel rates from https://www.bog.gov.gh/data/bankindrate.php
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx}", function( done ){
            parallelfx.getParallelRate( {from: "USD", to: "GHS"} ).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("GHS");
                    expect(resp.rate).toBeGreaterThan(0);
                    done();
                },
                function(err){
                    done();
                }
            );
        });
        
        //this method converts an amount based on parallel rates from https://www.bog.gov.gh/data/bankindrate.php
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx, value:xxx}", function(done){
            parallelfx.convertParallel({from: "USD", to: "GHS", value: 1000}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.value).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("GHS");
                    expect(resp.rate).toBeGreaterThan(0);
                    expect(resp.value).toBeGreaterThan(0);
                    done();
                },
                function(err){
                    done();
                }
            );
        });
    });
});