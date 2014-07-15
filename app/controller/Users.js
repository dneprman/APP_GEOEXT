/**
 * Created by Dmitry on 15.06.14.
 */
Ext.require('Ext.window.MessageBox');

Ext.define('AG.controller.Users', {
    extend: 'Ext.app.Controller',
    stores: ['Users','Summits'],
    models: ['User'],

    views: [
        'user.List', // Представление списка пользователей
        'user.Edit' // Представление окна редактирования пользовател
    ],

    refs: [
        {
            ref: 'userlist',
            selector: 'userlist'
        },
        {
            ref: 'useredit',
            selector: 'useredit'
        },
        {
            ref: 'filter',
            selector: 'ag_filterpanel'
        },
        {
            ref: 'summitgrid',
            selector: 'summitgrid'
        }],

    init: function() {
        this.control({
            'userlist': {
                itemdblclick: this.edit
            },

            'userlist button[action=insert]': {
                click: this.insert
            },

            'userlist button[action=edit]': {
                click: this.edit
            },

            'userlist button[action=destroy]': {
                click: this.destroy
            },

            'userlist button[action=refresh]': {
                click: this.refresh
            },

            'useredit button[action=save]': {
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
        var store = this.getUserlist().store;
        //var store = this.getSummitgrid().store;
        store.clearFilter(true);
        //this.getUserlist().store.sync();
        this.getUserlist().store.load();
    },

    filter: function() {

        var filter_name = Ext.getCmp('filter_name').getValue();
        var store = this.getUserlist().store;
        //var store = this.getSummitgrid().store;
        store.clearFilter(true);
        store.filter('name', filter_name);
        this.getUserlist().store.sync();

        /*
            Ext.Msg.show({
                title: 'Attention',
                msg: 'Delete selected feature?',
                buttons: Ext.Msg.YESNO,
                icon : Ext.MessageBox.WARNING,
                scope: this,
                width: 450
            });
        */
    },

    refresh: function(){
        this.getUserlist().store.load();
    },

    insert: function(btn, evt, opt) {
        //console.log('Insert records');
        var view = Ext.widget('useredit');
        view.setTitle('Insert record');
        this.getUserlist().store.load();
    },

    destroy: function() {
        var grid = this.getUserlist(),
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
                        var store = this.getUserlist().store;
                        store.remove(records);
                        this.getUserlist().store.sync();
                    }
                }
            });
        }
    },

    save: function (btn) {
        var win     = btn.up('window'),
            form    = win.down('form').getForm(),
            id      = form.getRecord() ? form.getRecord().get('id') : 0;

        if (form.isValid()){
            var record = form.getRecord(),
                values = form.getValues();

            if (record) {
                if(record.data['id']){
                    record.set(values);
                }
            }else{
                var record = Ext.create('AG.model.User');
                record.set(values);
                this.getUserlist().store.add(record);
            }

            win.close();
            this.getUserlist().store.sync();
            this.refresh;
        }else{
            Ext.ux.Msg.flash({
                msg: "Don't save",
                type: 'error'
            });
        }
    },

    edit: function() {
        var records = this.getUserlist().getSelectionModel().getSelection();

        if(records.length === 1) {
            var record = records[0];
            var editWind = Ext.widget('useredit');
            var editForm = editWind.down('form');
            editForm.loadRecord(record);
            console.log(record);
        }else{
            return;
            //console.log('Select more then 1 records')
        }
        //console.log(records)
        //this.getUserlist().store.load();

    }
    /*
    // Обработка двойного клика на строке списка
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');

        // В экземпляр представления подгружаются данные пользователя
        view.down('form').loadRecord(record);

        console.log('Двойной клик на пользователе ' + record.get('name'));
    }
    */
});