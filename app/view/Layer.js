/**
 * The GeoExt.tree.Panel used in the application.
 * @extends GeoExt.panel.Map
 */

Ext.define('AG.view.Layer', {
    extend: 'GeoExt.tree.Panel',
    alias : 'widget.ag_layerpanel',

    requires: [
        'GeoExt.tree.Panel',
        'Ext.tree.plugin.TreeViewDragDrop',
        'GeoExt.tree.View',
        'GeoExt.tree.Column'
    ],

    initComponent: function(){
         Ext.apply(this, {
             title: 'Layer panel',
             store: 'Layers',
             autoScroll: false,
             flex:1,
             viewConfig: {
                 plugins: [{
                     ptype: 'treeviewdragdrop',
                     appendOnly: false
                 }]
             },
             rootVisible: false,
             lines: false
         });

         this.callParent();
    }

});
