/** 
 * 
 **/

//server libraries
// const utils = require('../../../../../server/util/utils.js');
// const logger = utils.logger() // logger object

//operation object
const operation = {
    details : {
        description: "Standard create operation for ConfigTelegram"
    },
    /** 
     * 
     * Header configuration requirement
     * modify this based on the requirements
     * 
     * 
    */
    headerConfig : {},
    /** 
     * 
     * Input data validation
     * modify this based on the requirements
     * 
     * 
    */
    inputValidation : function(data)
    {
        var check = true;
        return check;
    },
    //operation object
    loadWebOperation: function(serviceManager, httpObj)
    {
        //operation implementation
        
        /** 
         * 
         * OPERATION IMPLEMENTATION STARTS HERE
         * 
         * 
        */

        let resourceName = 'ConfigTelegram';

        var handler = function(response){
            httpObj.responseData = {"data":response.data}; //set the response data
            httpObj.completeHttpResponse(httpObj); // respond to the http call   
        }

        serviceManager.callOperation("telegramConn", resourceName, "createOperation", 
                                        httpObj.request.body, handler, httpObj.request.mcHeader);
        /** 
         * 
         * OPERATION IMPLEMENTATION ENDS HERE
         * 
         * 
        */
    }
    
}

module.exports = {
    operation:operation
};
