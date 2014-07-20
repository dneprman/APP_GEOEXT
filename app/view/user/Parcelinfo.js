/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.view.user.Parcelinfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.parcelinfo',
    title: 'Parcel Info',
    layout: 'fit',
    autoShow: true,
    width: 350,
    modal: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'cadnum',
                        fieldLabel: 'cadnum'
                    },
                    {
                        xtype: 'textfield',
                        name : 'area_size',
                        fieldLabel: 'area_size'
                    },
                    {
                        xtype: 'textfield',
                        name : 'measurement_unit',
                        fieldLabel: 'measurement_unit'
                    },
                    {
                        xtype: 'textfield',
                        name : 'last_name',
                        fieldLabel: 'last_name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'first_name',
                        fieldLabel: 'first_name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'middle_name',
                        fieldLabel: 'middle_name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'identification_code',
                        fieldLabel: 'identification_code'
                    },
                    {
                        xtype: 'textfield',
                        name : 'doc_number',
                        fieldLabel: 'doc_number'
                    },
                    {
                        xtype: 'textfield',
                        name : 'doc_series',
                        fieldLabel: 'doc_series'
                    },
                    {
                        xtype: 'datefield',
                        name : 'onm_reg_date',
                        format:'Y-m-d',
                        fieldLabel: 'onm_reg_date'
                    },
                    {
                        xtype: 'datefield',
                        name : 'onm_end_date',
                        format:'Y-m-d',
                        fieldLabel: 'onm_end_date'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save',
                iconCls: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                iconCls: 'cancel',
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});