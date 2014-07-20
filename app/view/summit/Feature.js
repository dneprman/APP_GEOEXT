/**
 * The grid in which summits are displayed
 * @extends Ext.grid.Panel
 */
Ext.define('AG.view.summit.Feature' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.summitfeature',
    requires: [
        'GeoExt.selection.FeatureModel',
        'GeoExt.grid.column.Symbolizer',
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Number'
    ],
    initComponent: function() {
        Ext.apply(this, {
            border: false,
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
            flex: 1,
            store: 'Feature',
            selType: 'featuremodel',
            /*
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 2
                })
            ]
            */
        });
        this.callParent(arguments);
        // store singleton selection model instance
        AG.view.summit.Feature.selectionModel = this.getSelectionModel();
    }
});
