/**
 * Ext.Loader
 */
Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false,
    paths: {
        GeoExt: "/lib/geoext2/src/GeoExt",
        // for dev use
        Ext: "/lib/ext-4.2.1/src"
        // for build purpose
        //Ext: "ext-4.2.1.883/src"
    }
});

Ext.require([
    // We need to require this class, even though it is used by Ext.EventObjectImpl
    // see: http://www.sencha.com/forum/showthread.php?262124-Missed-(-)-dependency-reference-to-a-Ext.util.Point-in-Ext.EventObjectImpl
    'Ext.util.Point'
]);

/**
 * AG.app
 * A MVC application demo that uses GeoExt and Ext components to display
 * geospatial data.
 */
Ext.application({
    name: 'AG',
    appFolder: 'app',


    extend: 'Ext.app.Application',

    requires: [
        'GeoExt.tree.LayerContainer',
        'GeoExt.tree.OverlayLayerContainer',
        'GeoExt.tree.BaseLayerContainer',
        'GeoExt.data.LayerTreeModel'
    ],

    controllers: [
        //'Users',
        'Info',
        'Map'
    ],

    autoCreateViewport: true
});

/**
 * For dev purpose only
 */
var ctrl, map, mapPanel;
