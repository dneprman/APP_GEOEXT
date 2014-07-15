/**
 * The GeoExt.panel.Map used in the application.  Useful to define map options
 * and stuff.
 * @extends GeoExt.panel.Map
 */
Ext.define('AG.view.Filter', {
    // Ext.panel.Panel-specific options:
    extend: 'Ext.panel.Panel',
    alias : 'widget.ag_filterpanel',
    title   : 'FieldContainers',
    autoHeight: true,
    width   : 600,
    bodyPadding: 10,
    fixed: 1,
    defaults: {
        anchor: '100%',
        labelWidth: 100
    },
    items   : [
        {
            xtype     : 'textfield',
            name      : 'filter_cadnum',
            id        : 'filter_cadnum',
            fieldLabel: 'Select cadnum',
            //vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        },{
            xtype     : 'textfield',
            name      : 'filter_name',
            id        : 'filter_name',
            fieldLabel: 'Select name',
            //vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        },{
            xtype     : 'datefield',
            name      : 'begin_to',
            id        : 'begin_to',
            fieldLabel: 'Orenda begin to',
            //vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        },{
            xtype     : 'datefield',
            name      : 'begin_after',
            id        : 'begin_after',
            fieldLabel: 'Orenda begin after',
            //vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        },{
            xtype     : 'datefield',
            name      : 'end_to',
            id        : 'end_to',
            fieldLabel: 'Orenda end to',
            //vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        },{
            xtype     : 'datefield',
            name      : 'end_after',
            id        : 'end_after',
            fieldLabel: 'Orenda end after',
            //vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        }],
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
