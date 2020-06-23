const telegramConn = require('../../util/telegramConn.js');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){
        telegramConn.send("Hi there!", '128509566');
        let returnData = {};
        callback(returnData);

    }
}
module.exports = operation;