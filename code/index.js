global.fetch = require("node-fetch");
const indicators = require("./indicators.js");
const exchange = require("./exchange.js");

var hasPosition = false;

var strategy = function() {
    // if btc price < MA then buy (if we have no position)

    // IF BTC > MA then sell (if we have a position)
    console.log("                    ");
    console.log("===========================");
    console.log("Executing Strategy");
    indicators.hourlyMovingAverage("BTC", "USD", 100, function(ma) {    
        exchange.bitcoinPrice()
        .then(res => {
            var price = res.last
            
            console.log("MA is now: ", ma);      
            console.log("Price: ", price);
            
            if(price < ma && !hasPosition) {
                console.log("Buying");
                exchange.marketBuyBitcoin()
                .then(res => {
                    console.log("Buy successful");
                    hasPosition = true;

                    setTimeout(strategy, 1000);
                })
                .catch(error => console.error)
            }
            else if(price > ma && hasPosition) {
                console.log("Selling");
                exchange.marketSellBitcoin()
                .then(res => {
                    console.log("Sell successful");
                    hasPosition = false;

                    setTimeout(strategy, 1000);
                })
                .catch(error => console.error)
            }

            else {
                console.log("Holding");
                setTimeout(strategy, 1000);
            }

        })
        
    });
}

strategy();