/**
 * Created by Dmitry on 15.06.14.
 */
Ext.require('Ext.window.MessageBox');

Ext.define('AG.controller.Info', {
    extend: 'Ext.app.Controller',
    stores: ['Info','Layers','Feature'],
    models: ['Info'],

    views: [
        'Info', // Представление списка пользователей
        'user.Parcelinfo', // Представление окна редактирования пользовател
        'user.Uploadfile'
    ],

    refs: [
        {
            ref: 'infogrid',
            selector: 'infogrid'
        },
        {
            ref: 'parcelinfo',
            selector: 'parcelinfo'
        },
        {
            ref: 'filter',
            selector: 'ag_filterpanel'
        }],

    init: function() {
        this.control({
            'infogrid': {
                itemdblclick: this.edit
            },

            'infogrid button[action=insert]': {
                click: this.insert
            },

            'infogrid button[action=edit]': {
                click: this.edit
            },

            'infogrid button[action=destroy]': {
                click: this.destroy
            },

            'infogrid button[action=refresh]': {
                click: this.refresh
            },

            'parcelinfo button[action=save]': {
                click: this.save
            },

            'ag_filterpanel button[action=filter]': {
                click: this.filter
            },

            'ag_filterpanel button[action=filter_cancel]': {
                click: this.filter_cancel
            }
        });
    },

    filter_cancel: function() {
        var store = this.getInfogrid().store;
        store.clearFilter(true);
        this.getInfogrid().store.load();
    },

    filter: function() {

        var filter_select = Ext.getCmp('filter_select').getValue();
        var filter_name = Ext.getCmp('filter_name').getValue();

        var filter = [{"property":filter_select,"value":filter_name}];

        var store = this.getInfogrid().store;

        store.clearFilter(true);
        store.filter(filter);
        this.getInfogrid().store.sync();
    },

    refresh: function(){
        this.getInfogrid().store.load();
    },

    insert: function(btn, evt, opt) {
        //console.log('Insert records');
        var view = Ext.widget('uploadfile');
        view.setTitle('Insert record');
        //this.getInfogrid().store.load();
    },

    destroy: function() {
        var grid = this.getInfogrid(),
            records = grid.getSelectionModel().getSelection();

        if(records.length === 0){
            Ext.Msg.alert('Attention');
            return false;
        }else{
            Ext.Msg.show({
                title: 'Attention',
                msg: 'Delete selected feature?',
                buttons: Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope: this,
                width: 450,
                fn: function(btn, ev){
                    if(btn == 'yes'){
                        var store = this.getInfogrid().store;
                        store.remove(records);
                        this.getInfogrid().store.sync();
                    }
                }
            });
        }
    },

    save: function (btn) {
        var win     = btn.up('window'),
            form    = win.down('form').getForm(),
            id      = form.getRecord() ? form.getRecord().get('cadnum') : 0;

        if (form.isValid()){
            var record = form.getRecord(),
                values = form.getValues();

            if (record) {
                if(record.data['cadnum']){
                    record.set(values);
                }
            }else{
                var record = Ext.create('AG.model.Info');
                record.set(values);
                this.getInfogrid().store.add(record);
            }

            win.close();
            this.getInfogrid().store.sync();
            this.refresh;
        }else{
            Ext.ux.Msg.flash({
                msg: "Don't save",
                type: 'error'
            });
        }
    },

    edit: function() {
        var records = this.getInfogrid().getSelectionModel().getSelection();

        if(records.length === 1) {
            var record = records[0];
            var editWind = Ext.widget('parcelinfo');
            var editForm = editWind.down('form');
            editForm.loadRecord(record);
            console.log(record);
        }else{
            return;
        }
    }

});