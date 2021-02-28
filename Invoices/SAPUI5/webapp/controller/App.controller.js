// @ts-nocheck

sap.ui.define([
    //    "sap/m/Text" se usa si paso el texto directo desde el index.js
    "sap/ui/core/mvc/Controller",  
],
    /** 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.App", {

            onInit: function () {          
            },
            onOpenDialogHeader: function () {
                this.getOwnerComponent().openHelloDialog();
                
            }
        });
    });