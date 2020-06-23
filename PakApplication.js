const fs = require('fs')
const path = require('path')
require('dotenv').config();
const telegramConn = require('./util/telegramConn.js');

const pakDetails = {
    "AI_Enabled": false,
    "VI_Enabled": false,
    "WI_Enabled": false,
    "DBI_Enabled": false,
    "pakCode":"MCP_TELEGRAM_0_0_1",
    "Name":"Manti-core Telegram Connector Package",
    "Description": "This is a Telegram connector module",
    "WebContext": "telegramConn",
    "AppName": "telegramConn"
}

const init = function(dbMgr, svcMgr, webMgr){
    PakManager.dbMgr = dbMgr;
    PakManager.svcMgr = svcMgr;
    PakManager.webMgr = webMgr;
    let allAccessObj = { appresources: [ '*' ], dbresources: ['*'] };

    //look at all the package models and create them
    let modelsPath =  path.join(__dirname, 'Models');
    let allPromises = [];
    if (fs.existsSync(modelsPath)) //if the models directory exists
    {
        //get all models file name
        let modFileNames = fs.readdirSync(modelsPath);
        //iterate all models file name
        modFileNames.forEach(function(modFileName) {
            let modelFilePath = path.join(modelsPath, modFileName)
            allPromises.push(dbMgr.addModel(modelFilePath, modFileName));
        });
    }
    Promise.all(allPromises).then(function() {
        // all loaded

        let tokenCallback = function(response){

            // if(typeof process.env.TELEGRAM_BOT_TOKEN !== 'undefined'
            // && typeof process.env.TELEGRAM_BOT_ID !== 'undefined'){
            //     telegramConn.init(process.env.TELEGRAM_BOT_TOKEN, process.env.TELEGRAM_BOT_ID);
            // }
            let resData = response.data;
            if(resData.length > 0){
                telegramConn.init(resData[0].value);
            }

        };
        
        let queryCriteria = {
            where:{
                "group": "Telegram",
                "key": "token"
            },
        };
        svcMgr.ServiceManager.callDBOperation.query('ConfigTelegram', queryCriteria, tokenCallback, allAccessObj);

      }, function() {
        // one or more failed
        console.log("Cannot create the Telegram Connector configuration data.");
    });

    //look at all the services and operations
    let svcsPath =  path.join(__dirname, 'Services');
    if (fs.existsSync(svcsPath)) //if the services directory exists
    {
        //get all contexts
        let services = fs.readdirSync(svcsPath);
        //iterate all services
        services.forEach(function(service) {

            let svcDirPath = path.join(svcsPath, service)
            //read and iterate the service for all the operations
            let operations = fs.readdirSync(svcDirPath);
            //iterate all operations to slice the extention
            let returnOperations = [];
            operations.forEach(function(operation) {
                // console.log(svcDirPath, operation);
                var opName = operation.substring(0, operation.indexOf(".js"));
                returnOperations.push(opName);
            });

            //register the service and operations
            svcMgr.ServiceManager.registerPackageService(
                svcsPath,
                pakDetails.AppName,
                service,
                returnOperations
            );

        });
    }

    //look at all web app contexts
    let webAppContextsPath =  path.join(__dirname, 'WebApp', "views");
    //get all other scripts and css directories
    let scriptDirs = [];
    if (fs.existsSync(webAppContextsPath)) //if the web app directory exists
    {
        //get all contexts
        let contexts = fs.readdirSync(webAppContextsPath);
        //iterate all context to add scripts and css directoryu
        contexts.forEach(function(context) {
            scriptDirs.push(path.join(webAppContextsPath, context,"main","script"));
            // scriptDirs.push(path.join(webAppContextsPath, context,"main","css"));
            //scriptDirs.push(path.join(webAppContextsPath, context,"pages"));
        });
    }

    //register the view with the platform
    PakManager.webMgr.registerView({
        contextPath: pakDetails.WebContext,
        directory: webAppContextsPath,
        miscellaneous: scriptDirs
    });
}

const PakManager = {
    init:init,
    pakDetails:pakDetails
};

module.exports = PakManager;