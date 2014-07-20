/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.view.Info' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.infogrid',
    requires: [
        'GeoExt.selection.FeatureModel',
        'GeoExt.grid.column.Symbolizer',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Number'
    ],
    flex: 1,
    //height: 415,
    store: 'Info',
    //store: 'Feature',
    title: 'All Info',
    //selModel: {mode: 'MULTI'},
    selModel: Ext.create('Ext.selection.CheckboxModel'),
    //selType: 'featuremodel',
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

/*
    columns: [
        {
            header: '',
            dataIndex: 'symbolizer',
            menuDisabled: true,
            sortable: false,
            xtype: 'gx_symbolizercolumn',
            width: 30
        },
        {header: 'Cadnum', dataIndex: 'cadnum', flex: 1}
    ],
*/
    // Добавляем пагинацию
    dockedItems: [{
        xtype: 'pagingtoolbar',
        store: 'Info',
        //store: 'Feature',
        dock: 'bottom',
        displayInfo: true
    }],

    initComponent: function(){
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        //AG.view.Info.selectionModel = this.getSelectionModel();
    },

    onRender: function(){
        this.store.load();
        this.callParent(arguments);
    },

    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length !== 1);

    }
});