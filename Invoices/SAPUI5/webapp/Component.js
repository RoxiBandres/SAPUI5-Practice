// @ts-nocheck
sap.ui.define([
    'sap/ui/core/UIComponent',
    "logaligroup/SAPUI5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog"

],
/**    
 * @param {typeof sap.ui.core.UIComponent} UIComponent
 * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
*/

function(UIComponent, Models, ResourceModel, HelloDialog) {
    'use strict';

    return UIComponent.extend("logaligroup.SAPUI5.Component",{

        metadata : {
            manifest : "json"
            // "rootView" : {
            //     "viewName" : "logaligroup.SAPUI5.view.App",
            //     "type" : "XML",
            //     "async" : true,
            //     "id" : "app"
            // }
        },

        init : function () {
            UIComponent.prototype.init.apply(this,arguments);

            //Modelo de datos en la vista
                this.setModel(Models.createRecipient());

                // asignacion i18n en la vista
                var i18nModel = new ResourceModel({ bundleName: "logaligroup.SAPUI5.i18n.i18n" });
                this.setModel(i18nModel, "i18n")

                this._helloDialog = new HelloDialog(this.getRootControl());
        },

        exit: function () {
            this._helloDialog.destoy();
            delete this._helloDialog;          
        },
        //esta funcion es la que se invoca en los diferentes lugares para hacer uso del dialogo
        openHelloDialog: function () {
            //Funcion open que se creo en HelloDialog
            this._helloDialog.open();
            
        }
    });
    
});