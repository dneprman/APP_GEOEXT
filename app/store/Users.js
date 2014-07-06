/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.store.Users', {
    extend: 'Ext.data.Store',
    model: 'AG.model.User', // Вместо опции fields:

    autoLoad: true,
    remoteSort: false,
    pageSize: 15,
    proxy: {
        simpleSortMode: true,
        type: 'ajax',
        api: {
            read: 'data/php/Users.php?action=fetchAll',
            create: 'data/php/Users.php?action=insert',
            update: 'data/php/Users.php?action=update',
            destroy: 'data/php/Users.php?action=delete'
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
            sort : 'name',
            dir : 'ASC'
            //total: 5
        }
    }

});