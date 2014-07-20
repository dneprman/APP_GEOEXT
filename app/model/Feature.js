/**
 * Model for a summit
 */
Ext.define('AG.model.Feature', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'symbolizer',
            convert: function(v, r) {
                return r.raw.layer.styleMap.createSymbolizer(r.raw, 'default');
            }
        },
        {
            name: 'fid',
            convert: function(value, record) {
                // record.raw a OpenLayers.Feature.Vector instance
                if (record.raw instanceof OpenLayers.Feature.Vector) {
                    return record.raw.fid;
                } else {
                    return "This is not a Feature";
                }
            }
        },
        {name: 'parcel_id', type: 'number'},
        {name: 'cadnum', type: 'string'}
    ]
});
