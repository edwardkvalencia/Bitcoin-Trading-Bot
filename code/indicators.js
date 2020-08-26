const CCAPIKey = "<Your CryptoCompare API key>"
const CryptoCompareAPI = require("cryptocompare");
CryptoCompareAPI.setApiKey(CCAPIKey);

module.exports = {
    hourlyMovingAverage:function(cryptoAsset, fiatCurrency, hours, callback) {
        if(hours > 169) {
            console.error("Only up to 160 hours allowed")
            return
        }
        
        CryptoCompareAPI.histoHour(cryptoAsset, fiatCurrency)
        .then(data => {
            //Calculate MA for 100 past hrs
            data = data.reverse()
            // Var to add all close prices
            var sum = 0;
            //Loop thru all data
            for(var i = 0; i < hours; i++) {
                sum+=data[i].close;
            }
            //M.Average
            var movingAverage = Math.floor(sum/hours);
            callback(movingAverage);
        })
        .catch(console.error)
    },

    dailyMovingAverage:function(cryptoAsset, fiatCurrency, days, callback) {
        if(days > 31) {
            console.error("Only up to 31 days allowed")
            return
        }
        
        CryptoCompareAPI.histoDay(cryptoAsset, fiatCurrency)
        .then(data => {
            //Calculate MA for 100 past hrs
            data = data.reverse()
            // Var to add all close prices
            var sum = 0;
            //Loop thru all data
            for(var i = 0; i < days; i++) {
                sum+=data[i].close;
            }
            //M.Average
            var movingAverage = Math.floor(sum/hours);
            callback(movingAverage);
        })
        .catch(console.error)
    },
    
    minuteMovingAverage:function(cryptoAsset, fiatCurrency, minute, callback) {
        if(minute > 31) {
            console.error("Only up to 31 days allowed")
            return
        }
        
        CryptoCompareAPI.histoMinute(cryptoAsset, fiatCurrency)
        .then(data => {
            //Calculate MA for 100 past hrs
            data = data.reverse()
            // Var to add all close prices
            var sum = 0;
            //Loop thru all data
            for(var i = 0; i < minute; i++) {
                sum+=data[i].close;
            }
            //M.Average
            var movingAverage = Math.floor(sum/hours);
            callback(movingAverage);
        })
        .catch(console.error)
    }

}


