/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AG.view.Layer', {
    // Ext.panel.Panel-specific options:
    extend: 'Ext.panel.Panel',
    alias : 'widget.ag_layerpanel',
    title: 'Layer panel',
    border: 'true',
    flex:1,

    initComponent: function() {
        var me = this

        me.callParent(arguments);
    }
});
