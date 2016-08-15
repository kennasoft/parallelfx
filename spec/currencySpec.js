var africanfx = require("../src/parallel-fx");

describe("African FX Module ", function(){
    describe("Get global exchange rates", function(){
        //this method fetches standard exchange rates from http://rate-exchange-1.appspot.com/currency
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx}", function(done){
            africanfx.getRate({from: "USD", to: "NGN"}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toEqual(jasmine.any(Number));
                    done();
                },
                function(err){
                    done();
                }
            );
        });
        
        //this method converts an amount based on rates from http://rate-exchange-1.appspot.com/currency
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx, value:xxx}", function(done){
            africanfx.convert({from: "USD", to: "NGN", value: 1000}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.value).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toEqual(jasmine.any(Number));
                    expect(resp.value).toEqual(jasmine.any(Number));
                    done();
                },
                function(err){
                    done();
                }
            );
        });
    });
    
    
    describe("Get Parallel (Black market) exchange rates", function(){    
        //this method gets parallel rates from http://abokifx.com
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx}", function( done ){
            africanfx.getParallelRate( {from: "USD", to: "NGN"} ).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toEqual(jasmine.any(Number));
                    done();
                },
                function(err){
                    done();
                }
            );
        });
        
        //this method converts an amount based on parallel rates from http://abokifx.com
        it("returns a promise that resolves to {from:xxx, rate:xxx, to:xxx, value:xxx}", function(done){
            africanfx.convertParallel({from: "USD", to: "NGN", value: 1000}).then(
                function(resp){
                    expect(resp.from).toBeDefined();
                    expect(resp.to).toBeDefined();
                    expect(resp.rate).toBeDefined();
                    expect(resp.value).toBeDefined();
                    expect(resp.from.toUpperCase()).toEqual("USD");
                    expect(resp.to.toUpperCase()).toEqual("NGN");
                    expect(resp.rate).toEqual(jasmine.any(Number));
                    expect(resp.value).toEqual(jasmine.any(Number));
                    done();
                },
                function(err){
                    done();
                }
            );
        });
    });
});