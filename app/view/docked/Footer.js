/**
 * The application header displayed at the top of the viewport
 * @extends Ext.Component
 */
Ext.define('AG.view.docked.Footer', {
    extend: 'Ext.Component',

    dock: 'bottom',
    baseCls: 'ag-footer',

    initComponent: function() {
        Ext.applyIf(this, {
            html: 'Footer'
        });

        this.callParent(arguments);
    }
});
