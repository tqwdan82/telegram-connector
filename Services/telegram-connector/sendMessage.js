const telegramConn = require('../../util/telegramConn.js');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){

        console.log(telegramConn.initialized);
        telegramConn.send(inputs.message, inputs.chatId);
        let returnData = {};
        returnData["status"] = "Ok";
        returnData["details"] = "Message sent";
        returnData["data"] = null;

        callback(returnData);
        
    }
};

module.exports = operation;