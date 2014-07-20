/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.store.Info', {
    extend: 'Ext.data.Store',
    model: 'AG.model.Info', // Вместо опции fields:

    autoLoad: false,
    remoteSort: false,
    remoteFilter: true,
    pageSize: 15,
    proxy: {
        simpleSortMode: true,
        type: 'ajax',
        api: {
            read: 'data/php/Info.php?action=fetchAll',
            //create: 'data/php/Info.php?action=insert',
            update: 'data/php/Info.php?action=update'
            //destroy: 'data/php/Info.php?action=delete'
        },
        actionMethods: {
            read: 'POST',
            create: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        reader: {
            type: 'json',
            root: 'data',
            rootProperty: 'data',
            successProperty: 'success',
            messageProperty: 'message'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'data',
            encode: true
        },
        extraParams: {
            //start : 1,
            //limit : 4,
            sort : 'cadnum',
            dir : 'ASC'
            //total: 5
        }
    }

});