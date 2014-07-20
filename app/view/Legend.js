/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AG.view.Legend', {
    // Ext.panel.Panel-specific options:
    extend: 'GeoExt.panel.Legend',
    alias : 'widget.ag_legendpanel',
    store: 'Legendlayer',
    requires: [
        'GeoExt.container.WmsLegend',
        'GeoExt.container.UrlLegend',
        'GeoExt.container.VectorLegend',
        'GeoExt.panel.Legend'
    ],


    onRender: function(){
        //this.layerStore
        this.callParent(arguments);
    },

    initComponent: function() {
        Ext.apply(this, {
            //layersStore: this.store,
            title: 'Legend panel',
            border: 'true',
            flex:1
        });

        this.callParent(arguments);
    }

});