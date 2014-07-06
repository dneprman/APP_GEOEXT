/**
 * Help Window with static content using 'contentEl' property.
 * @extends Ext.window.Window
 */
Ext.define('AG.view.help.Window', {
    extend: 'Ext.window.Window',
    alias : 'widget.ag_helpwindow',
    initComponent: function() {
        Ext.apply(this, {
            bodyCls: "ag-helpwindow",
            closeAction: "hide",
            layout: 'fit',
            maxWidth: 600,
            title: "Help"
        });
        this.callParent(arguments);
    }
});
