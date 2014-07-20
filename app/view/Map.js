/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AG.view.Map', {
    // Ext.panel.Panel-specific options:
    extend: 'GeoExt.panel.Map',
    alias : 'widget.ag_mappanel',
    requires: [
        'Ext.window.MessageBox',
        'GeoExt.Action',
        'AG.view.help.Action'
    ],
    border: 'false',
    layout: 'fit',
    //region: 'center',
    //width: 600,
    // GeoExt.panel.Map-specific options :
    //center: '5.7,45.5',
    //zoom: 6,
    center: [3189500,6374700],
    zoom: 13,

    initComponent: function() {
        var me = this,
            items = [],
            ctrl;

        var options = {
            projection: new OpenLayers.Projection("EPSG:900913"),
            //displayProjection: new OpenLayers.Projection("EPSG:900913"),
            units: "m",
            numZoomLevels: 18,
            minZoomLevels: 5,
            maxZoomLevels: 20,
            maxResolution: 156543.0339,
            maxExtent: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508)
        };

        //var map = new OpenLayers.Map();
        map = new OpenLayers.Map('map', options);

        // ZoomToMaxExtent control, a "button" control
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            control: new OpenLayers.Control.ZoomToMaxExtent(),
            map: map,
            text: "max extent",
            tooltip: "zoom to max extent"
        })));

        items.push("-");

        // Navigation control
        items.push(Ext.create('Ext.button.Button',Ext.create('GeoExt.Action', {
            text: "nav",
            control: new OpenLayers.Control.Navigation(),
            map: map,
            // button options
            toggleGroup: "draw",
            allowDepress: false,
            pressed: true,
            tooltip: "navigate",
            // check item options
            group: "draw",
            checked: true
        })));

        items.push("-");

        // Navigation history - two "button" controls
        ctrl = new OpenLayers.Control.NavigationHistory();
        map.addControl(ctrl);
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "previous",
            control: ctrl.previous,
            disabled: true,
            tooltip: "previous in history"
        })));
        
        items.push(Ext.create('Ext.button.Button', Ext.create('GeoExt.Action', {
            text: "next",
            control: ctrl.next,
            disabled: true,
            tooltip: "next in history"
        })));
        items.push("->");

        // Help action
        items.push(
            Ext.create('Ext.button.Button', Ext.create('AG.view.help.Action', {
                windowContentEl: "help"
            }))
        );

        Ext.apply(me, {
            map: map,
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: items,
                style: {
                    border: 0,
                    padding: 0
                }
            }]
        });
                
        me.callParent(arguments);
    }
});
