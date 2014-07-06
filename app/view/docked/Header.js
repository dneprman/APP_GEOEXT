/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AG.view.docked.Header', {
    extend: 'Ext.Component',

    dock: 'top',
    baseCls: 'ag-header',

    initComponent: function() {
        Ext.applyIf(this, {
            html: 'My GIS ' +
                '(First version)'
        });

        this.callParent(arguments);
    }
});
