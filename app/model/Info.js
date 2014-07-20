/**
 * Model for a summit
 */
Ext.define('AG.model.Info', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'parcel_id', type: 'number'},
        {name: 'cadnum', type: 'string'},
        {name: 'area_size', type: 'number'},
        {name: 'measurement_unit', type: 'string'},
        {name: 'person_id', type: 'number'},
        {name: 'last_name', type: 'string'},
        {name: 'first_name', type: 'string'},
        {name: 'middle_name', type: 'string'},
        {name: 'identification_code', type: 'string'},
        {name: 'doc_id', type: 'number'},
        {name: 'doc_number', type: 'string'},
        {name: 'doc_series', type: 'string'},
        {name: 'onm_reg_date', type: 'string'},
        {name: 'onm_end_date', type: 'string'}
    ]
});
