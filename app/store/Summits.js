/**
 * The store used for summits
 */
Ext.define('AG.store.Summits', {
    extend: 'GeoExt.data.FeatureStore',
    model: 'AG.model.Summit',
    autoLoad: false
});
