/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.view.Info' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.infogrid',
    flex: 1,
    //height: 415,
    store: 'Info',
    title: 'All Info',
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

    columns: [{
        header: 'Parcel',
        xtype: 'templatecolumn',
        tpl: '{cadnum} <br/> S = {area_size} {measurement_unit}',
        flex: 3
    },{
        header: 'Person',
        xtype: 'templatecolumn',
        tpl: '{last_name} {first_name} {middle_name} <br/> INN {identification_code}',
        flex: 3
    },{
        header: 'Document',
        xtype: 'templatecolumn',
        tpl: 'Num: {doc_number} {doc_series} <br/> B: {onm_reg_date}  <br/> E: {onm_end_date}',
        flex: 2
    }],

    // Добавляем пагинацию
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Info',
        dock: 'bottom',
        displayInfo: true
    }],

    initComponent: function(){
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },

    onRender: function(){
        //this.store.load();
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