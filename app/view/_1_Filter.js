/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AG.view.Filter', {
    // Ext.panel.Panel-specific options:
    extend: 'Ext.panel.Panel',
    alias : 'widget.ag_filterpanel',
    title   : 'Filter',
    autoHeight: true,
    bodyPadding: 10,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },

    items : [
            {
            xtype: 'container',
            //fieldLabel: 'Date Range',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
                flex: 1
                //hideLabel: true
            },
            items: [
                {
                    xtype     : 'textfield',
                    name      : 'filter_cadnum',
                    id        : 'filter_cadnum',
                    fieldLabel: 'Select cadnum',
                    //vtype: 'email',
                    margin: '0 5 0 0'
                    //msgTarget: 'side',
                    //allowBlank: false
                },{
                    xtype     : 'textfield',
                    name      : 'filter_name',
                    id        : 'filter_name',
                    fieldLabel: 'Select name'
                    //vtype: 'email',
                   // msgTarget: 'side',
                    //allowBlank: false
                }
            ]
        },{
            xtype: 'splitter'
        },{
            xtype: 'container',
            //fieldLabel: 'Date Range',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
                flex: 1
                //hideLabel: true
            },
            items: [
                {
                    xtype     : 'datefield',
                    name      : 'begin_to',
                    id        : 'begin_to',
                    fieldLabel: 'Begin to',
                    format:'Y-m-d',
                    //vtype: 'email',
                    margin: '0 5 0 0'
                    //msgTarget: 'side',
                    //allowBlank: false
                },{
                    xtype     : 'datefield',
                    name      : 'begin_after',
                    id        : 'begin_after',
                    fieldLabel: 'Begin after',
                    format:'Y-m-d'
                    //vtype: 'email',
                    //msgTarget: 'side',
                    //allowBlank: false
                }
            ]
        },{
            xtype: 'splitter'
        },{
            xtype: 'container',
            //fieldLabel: 'Date Range',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
                flex: 1
                //hideLabel: true
            },
            items: [
                {
                    xtype     : 'datefield',
                    name      : 'end_to',
                    id        : 'end_to',
                    fieldLabel: 'End to',
                    format:'Y-m-d',
                    //vtype: 'email',
                    margin: '0 5 0 0'
                    //msgTarget: 'side',
                    //allowBlank: false
                },{
                    xtype     : 'datefield',
                    name      : 'end_after',
                    id        : 'end_after',
                    fieldLabel: 'End after',
                    format:'Y-m-d'
                    //vtype: 'email',
                    //msgTarget: 'side',
                    //allowBlank: false
                }
            ]
        }
    ],

    buttons : [
        {
            text: 'Set',
            action: 'filter',
            iconCls: 'save'
        },
        {
            text: 'Cancel',
            action: 'filter_cancel',
            iconCls: 'cancel'
        }
    ],

    initComponent: function() {
        var me = this

        me.callParent(arguments);
    }
});
