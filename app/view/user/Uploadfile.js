/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.view.user.Uploadfile', {
    extend: 'Ext.window.Window',
    alias: 'widget.uploadfile',
    title: 'Load File',
    bodyPadding: 5,
    width: 350,
    layout: 'fit',
    autoShow: true,
    modal: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'filefield',
                name: 'file1',
                fieldLabel: 'File upload'
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