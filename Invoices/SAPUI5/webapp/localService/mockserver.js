//@ts-nocheck
sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/UriParameters",
    "sap/base/Log"
],
    /**
     * 
     * @param {typeof sap.ui.core.util.MockServer} MockServer
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.base.util.UriParameters} UriParameters
     * @param {typeof sap.base.console.log} Log 
     */

    function (MockServer, JSONModel, UriParameters, Log) {
        'use strict';
        var oMockServer,
            _sAppPath = "logaligroup/SAPUI5/",
            _SJsonFilesPath = "_sAppPath + localService/mockdata";

        var oMockServerInterface = {
            /**
             * @protected
             * @param {object} oOptionsParameter 
             * @returns{Promise}
             */
            init: function (oOptionsParameter) {

                var oOptions = oOptionsParameter || {};
                return new Promise(function (fnResolve, fnReject) {
                    var sManifestURL = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestURL);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParameters = new UriParameters(window.location.href);

                        //Parse manifest datos locales
                            var _sJsonFilesURL = sap.ui.require.toUrl(_SJsonFilesPath),
                                oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService"),
                                sMetaDataURL = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);
                        //ensure
                            var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();
                        //Create mockserver
                            if(!oMockServer){
                                oMockServer = new MockServer({
                                    rootUri: sMockServerUrl
                                });
                            } else{
                                oMockServer.stop();
                            }
                        //Configuracion mock server con la optencion de opcines o delay
                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter : (oOptions.delay || oUriParameters.get("server.Delay") || 500)
                        });
                        // simular todos los llamados usando data mock server
                        oMockServer.simulate(sMetaDataURL, {
                            sMockDataBaseUrl : _sJsonFilesURL,
                            bGenerateMissingMockData : true

                        });
                        var aRequests =  oMockServer.getRequests();

                        //obtener mesajes de error para cada respuesta
                        var fnResponse = function(iErrcode, sMessage, aRequest){
                            aRequest.respond = function(oXhr){
                                oXhr.respond(iErrcode,{"Content-type" : "text/plain;charset=utf-8"},sMessage);
                            };
                        };
                        // simular metadata de error
                        if(oOptions.metadataError || oUriParameters.get("metadataError")){
                            aRequests.forEach(function (aEntry){
                                if(aEntry.path.toString().indexof("$metada") > -1){
                                    fnResponse(500,"metadata error", aEntry);
                                }
                            });
                        };

                        //simular error de peticiones
                        var sErrorParam = oOptions.errorType || oUriParameters.get("errorType");
                        var iErrorcode = sErrorParam === 'badRequest' ? 400: 500;

                        if(sErrorParam){
                            aRequests.forEach(function(aEntry){
                                fnResponse(iErrcode,sErrorParam,aEntry);
                            });
                        };
                        // set request and start the server
                        oMockServer.setRequests(aRequests);
                        oMockServer.start();

                        Log.info("Running app with mockdata");
                        fnResolve();

                    });
                    oManifestModel.attachRequestFailed(function(){
                        var sError = "Fallo cargar de archivo manifest";
                        Log.error(sError);
                        fnReject( new Error(sError));
                    });

                });

            }
        };
        return oMockServerInterface;

    });