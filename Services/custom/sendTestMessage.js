const telegramConn = require('../../util/telegramConn.js');

const operation = {
    loadOperation: function(serviceManager, inputs, callback, mcHeader){


        var handler = function(response){
            let chatRes = response.data;
            
            if(chatRes.length > 0){
                let chatData = chatRes[0];
                telegramConn.send("Hi there! Testing here.", chatData.value);
            }
            let returnData = {};
            callback(returnData);
        }

        let inCrit = {
            where:{
                group:"Telegram",
                key:"testChatId"
            }
        };
        serviceManager.callOperation("telegramConn", "ConfigTelegram", "findOperation", 
                                    {inputCriteria:inCrit}, handler, mcHeader);


        

    }
}
module.exports = operation;