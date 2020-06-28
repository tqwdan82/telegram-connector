const telegramConn = require('../../util/telegramConn.js');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        // console.log(inputs);
        telegramConn.send(inputs.message, inputs.dest);
        let returnData = {};
        callback(returnData);

    }
}
module.exports = operation;