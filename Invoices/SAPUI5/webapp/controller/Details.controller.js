// @ts-nocheck

sap.ui.define([
    //    "sap/m/Text" se usa si paso el texto directo desde el index.js
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent"
],
    /** 
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     */
    function (Controller, History, UIComponent) {
        "use strict";

        return Controller.extend("logaligroup.SAPUI5.controller.Details", {

            _onObjectMatch: function (oEvent) {
                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                });

            },

            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //cuando se coincide con ese patron se ejecuta la funcion _onObjectMatch
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            },
            onNavBack: function () {
                const oHistory = History.getInstance();
                // hash anterior anterior en el que estuvo
                const sPreviousHash = oHistory.getPreviousHash();
                if (sPreviousHash !== undefined) {
                    //debe ir a la anterior vista
                    window.history.go(-1);
                } else {
                    //Llamamos a la pagina principal por si ingreso directo a una subpagina
                    const oRouter = UIComponent.getRouterFor(this);
                    // como no queremos pasar datos {}
                    oRouter.navTo("RouteApp", {}, true);
                }
            }

        });
    });