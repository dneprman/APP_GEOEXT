/**
 * The main application viewport, which displays the whole application
 * @extends Ext.Viewport
 */
Ext.define('AG.view.Viewport', {
    extend: 'Ext.Viewport',
    layout: 'fit',

    requires: [
        'Ext.layout.container.Border',
        'Ext.resizer.Splitter',
        'AG.view.docked.Header',
        'AG.view.docked.Footer',
        'AG.view.Map',
        'AG.view.Legend',
        'AG.view.Layer',
        'AG.view.Filter',
        'AG.view.Info',
        'AG.view.user.List',
        'AG.view.user.Edit',
        'AG.view.summit.Chart',
        'AG.view.summit.Grid'/*,
        'Ext.container.Viewport',
        'GeoExt.panel.Map',
        'GeoExt.container.WmsLegend',
        'GeoExt.container.UrlLegend',
        'GeoExt.container.VectorLegend',
        'GeoExt.panel.Legend'*/
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            items: [{
                xtype: 'panel',
                border: false,
                layout: 'border',
                dockedItems: [
                    Ext.create('AG.view.docked.Header'),
                    Ext.create('AG.view.docked.Footer')
                ],
                items: [
                {
                    xtype: 'panel',
                    region: 'west',
                    width: 225,
                    collapsed: false,
                    collapsible: true,
                    border: true,
                    id    : 'layerlegend',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        Ext.create('AG.view.Layer'),
                        {xtype: 'splitter'},
                        /*Ext.create('GeoExt.panel.Legend',{
                            defaults: {
                                //abelCls: 'mylabel',
                                style: 'padding:5px'
                            },
                            flex: 1,
                            title: 'Legend panel',
                            bodyStyle: 'padding:5px',
                            autoScroll: true
                    })*/
                         Ext.create('AG.view.Legend')
                    ]
                },{
                    xtype: 'ag_mappanel',
                    region: 'center'
                }, {
                    xtype: 'panel',
                    region: 'east',
                    width: 475,
                    collapsible: true,
                    border: true,
                    id    : 'infopanel',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            Ext.create('AG.view.Filter'),
                            {xtype: 'splitter'},
                            //Ext.create('AG.view.Filter')
                            //Ext.create('AG.view.user.List')
                            Ext.create('AG.view.Info')
                        ]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
