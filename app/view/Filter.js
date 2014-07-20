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
        anchor: '100%'
        //labelWidth: 50
    },

    items : [{
            xtype: 'container',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            items: [
                {
                    //the width of this field in the HBox layout is set directly
                    //the other 2 items are given flex: 1, so will share the rest of the space
                    flex: 1,
                    labelWidth: 40,
                    xtype:          'combo',
                    mode:           'local',
                    //value:          'mrs',
                    triggerAction:  'all',
                    forceSelection: true,
                    editable:       false,
                    fieldLabel:     'Select',
                    name:           'select',
                    id:             'filter_select',
                    displayField:   'name',
                    valueField:     'value',
                    queryMode: 'local',
                    store:          Ext.create('Ext.data.Store', {
                        fields : ['name', 'value'],
                        data   : [
                            {name : 'parcel',   value: 'parcel'},
                            {name : 'person',  value: 'person'},
                            {name : 'document', value: 'document'}
                        ]
                    })
                },
                {
                    xtype     : 'textfield',
                    margin: '0 0 0 10',
                    name      : 'filter_name',
                    id        : 'filter_name',
                    fieldLabel: 'Find',
                    labelWidth: 30,
                    flex: 2
                }
            ]
        },{
        xtype: 'container',
        combineErrors: true,
        msgTarget : 'side',
        layout: 'hbox',
        margin: '10 0 0 0',
        flex :1,
        items: [
            {
                xtype: 'radiogroup',
                fieldLabel: 'Lease end',
                labelWidth: 60,
                flex :3,
                items: [
                    {boxLabel: 'to', name: 'rb-auto', inputValue: 1},
                    {boxLabel: 'after', name: 'rb-auto', inputValue: 2}
                ]
            },{
                xtype     : 'datefield',
                name      : 'date_to',
                id        : 'date_to',
                fieldLabel: 'Data',
                format:'Y-m-d',
                labelWidth: 30,
                flex: 2
            },{
                xtype: 'checkbox',
                fieldLabel: 'Load all',
                margin: '0 0 0 10',
                labelWidth: 50,
                boxLabel: '',
                name: 'load_all',
                inputValue: 'load_all',
                flex: 1
            }
        ]
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
        }/*,
        {
            text: 'Clean',
            action: 'filter_clean'
            //iconCls: 'cancel'
        }*/
    ],

    initComponent: function() {
        var me = this

        me.callParent(arguments);
    }
});
