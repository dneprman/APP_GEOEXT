/**
 * Created by Dmitry on 15.06.14.
 */
Ext.define('AG.model.User', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'id',
            type: 'int'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        }
    ],
    idProperty	: 'id'
});