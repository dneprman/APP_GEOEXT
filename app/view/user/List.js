/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.view.user.List' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',
    height: 415,
    store: 'Users',
    title: 'All Users',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    tbar: [
        {
            text: 'Insert',
            action: 'insert',
            iconCls: 'add',
            itemId: 'insert'
        },{
            text: 'Edit',
            action: 'edit',
            iconCls: 'edit',
            itemId: 'edit',
            disabled: true
        },{
            text: 'Delete',
            action: 'destroy',
            iconCls: 'delete',
            itemId: 'delete',
            disabled: true
        },{
            text: 'Refresh',
            action: 'refresh',
            iconCls: 'refresh',
            itemId: 'refresh'
        }
    ],

    columns: [
        {header: 'ID', dataIndex: 'id', flex: 1, hidden: true},
        {header: 'Name', dataIndex: 'name', flex: 1},
        {header: 'Email', dataIndex: 'email', flex: 1}
    ],
    // Добавляем пагинацию
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Users',
        dock: 'bottom',
        displayInfo: true
    }],

    initComponent: function(){
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onRender: function(){
        this.store.load();
        this.callParent(arguments);
    },

    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length !== 1);
    }

    /*
     initComponent: function() {

     this.columns = [
     {header: 'Name', dataIndex: 'name', flex: 1},
     {header: 'Email', dataIndex: 'email', flex: 1}
     ];

     this.callParent(arguments);
     }
     */
});