/**
 * The store used for summits
 */
Ext.define('AG.store.Layers', {
    extend: 'Ext.data.TreeStore',
    model: 'GeoExt.data.LayerTreeModel',

    autoLoad: true,
    root: {
        expanded: true,
        children: [/*{
           plugins: [{
               ptype: 'gx_layercontainer'
               //store: 'layer'
           }],
           expanded: true
        },*/{
            plugins: ['gx_baselayercontainer'],
            expanded: true,
            text: "Base (raster) layer"
        },{
            plugins: ['gx_overlaylayercontainer'],
            expanded: true,
            text: "Information layer"
        }]
    }
});
