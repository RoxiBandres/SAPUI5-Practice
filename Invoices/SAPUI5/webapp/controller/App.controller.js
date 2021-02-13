// @ts-nocheck

sap.ui.define([
    //    "sap/m/Text" se usa si paso el texto directo desde el index.js
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"  
],
    /** 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.App", {

            onInit: function () {          
            },

            onShowHello: function () {
                // Lectura desde el i18n model
                var oBundle = this.getView().getModel("i18n").getResourceBundle();

                // Leyendo las propiedades desde el modelo de datos
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);
                MessageToast.show(sMsg);


            }
        });
    });