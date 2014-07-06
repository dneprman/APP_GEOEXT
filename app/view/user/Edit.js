/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.view.user.Edit', {
    extend: 'Ext.window.Window',
    alias: 'widget.useredit',
    title: 'Edit User',
    layout: 'fit',
    autoShow: true,
    modal: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
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