Ext.define('AG.controller.Map', {
    extend: 'Ext.app.Controller',

    models: ['Feature'],
    stores: ['Feature','Legends'],

    refs: [
        {ref: 'summitFeature', selector: 'summitfeature'},
        {ref: 'ag_legendpanel', selector: 'ag_legendpanel'}
    ],

    init: function() {
        var me = this;

        me.getFeatureStore().on({
            scope: me,
            load : me.onSummitsStoreLoad
        });

        this.control({
            'ag_mappanel': {
                'beforerender': this.onMapPanelBeforeRender
            }
        }, this);
    },
    /*
     onLegendPanelBeforeRender: function(mapPanel) {

     },
     */
    onMapPanelBeforeRender: function(mapPanel, options) {
        var me = this;

        var geoserver_patch = "http://212.26.131.154:85";
        var kadastr_patch = "http://212.26.144.110";

        var layers = [];


        // OpenLayers object creating
        var wms = new OpenLayers.Layer.WMS(
            "OpenStreetMap WMS",
            "http://ows.terrestris.de/osm/service?",
            {layers: 'OSM-WMS'},
            {
                attribution: '&copy; terrestris GmbH & Co. KG <br>' +
                    'Data &copy; OpenStreetMap ' +
                    '<a href="http://www.openstreetmap.org/copyright/en"' +
                    'target="_blank">contributors<a>'
            }
        );
        layers.push(wms);


        // OpenLayers object creating
        var wmsLayer_kadastr = new OpenLayers.Layer.WMS(
            "Land kadastr", kadastr_patch+"/geowebcache/service/wms?tiled=true", {
                LAYERS:                   'kadastr',
                STYLES:                   '',
                format:                   'image/png',
                tiled:                     true,
                transparent:              'true'
            },{
                buffer:                    0,
                displayOutsideMaxExtent:   true,
                isBaseLayer:               false,
                visibility:				   false,
                yx:                      {'EPSG:900913':false }
            });
        layers.push(wmsLayer_kadastr);

        // config layer PZF (WMS layer)
        var wms_parcel = new OpenLayers.Layer.WMS("Parcel",
            geoserver_patch+"/agro/geoserver/dzk/wms", {
                layers: "parcel_orenda",
                transparent: true,
                format: "image/png",
                tiled: true
            },{
                buffer: 0,
                displayOutsideMaxExtent: true,
                isBaseLayer: false,
                visibility: true,
                yx : {"EPSG:900913" : false}
            }
        );
        layers.push(wms_parcel);

        // config layer PZF (WMS layer)
        var wms_fields = new OpenLayers.Layer.WMS("Fields",
            geoserver_patch+"/agro/geoserver/dzk/wms", {
                layers: "fields",
                transparent: true,
                format: "image/png",
                tiled: true
            },{
                buffer: 0,
                displayOutsideMaxExtent: true,
                isBaseLayer: false,
                visibility: false,
                yx : {"EPSG:900913" : false}
            }
        );
        layers.push(wms_fields);

        var tms_orto = new OpenLayers.Layer.TMS( "Orto M 1:10000", "",
            {   // url: '', serviceVersion: '.', layername: '.',
                type: 'jpg', getURL: me.overlay_getTileURL, visibility: true, isBaseLayer: true
            }
        );
        layers.push(tms_orto);

        // config layer TMS Map_10000 (from publi kadastr portal)
        var tms_map = new OpenLayers.Layer.TMS( "Map M 1:100000", "",
            {   // url: '', serviceVersion: '.', layername: '.',
                type: 'jpg', getURL: me.overlay_getTileURL, visibility: false, isBaseLayer: true
            });
        layers.push(tms_map);

        // create vector layer
        var context = {
            getColor: function(feature) {
                /*if (feature.attributes.elevation < 2000) {
                 return 'green';
                 }
                 if (feature.attributes.elevation < 2300) {
                 return 'orange';
                 }*/
                return 'blue';
            }
        };

        var template = {
            cursor: "pointer",
            fillOpacity: 0.65,
            fillColor: "${getColor}",
            pointRadius: 3.5,
            strokeWidth: 1,
            strokeOpacity: 1,
            strokeColor: "${getColor}",
            graphicName: "triangle"
        };

        var style = new OpenLayers.Style(template, {context: context});
        var selectStyle = new OpenLayers.Style({'fillColor': 'yellow','strokeColor': 'red'});

         var vecLayer = new OpenLayers.Layer.Vector("Filter", {
             styleMap: new OpenLayers.StyleMap({
                 'default': style,
                 'select': selectStyle
             }),
             protocol: new OpenLayers.Protocol.HTTP({
                 url: "../../data/feature.json",
                 format: new OpenLayers.Format.GeoJSON()
             }),
             strategies: [new OpenLayers.Strategy.Fixed()]
         });
         layers.push(vecLayer);

/*
        var vecLayer = new OpenLayers.Layer.Vector("Filter", {
            styleMap: new OpenLayers.StyleMap({
                'default': style,
                'select': selectStyle
            }),
            projection: "EPSG:900913"
        });
        layers.push(vecLayer);
        // manually bind store to layer
*/
        me.getFeatureStore().bind(vecLayer);

        mapPanel.map.addLayers(layers);

        //me.getLayerlegendStore().bind(mapPanel.map);
        /*
         var lstore = new GeoExt.data.LayerStore({
         map: map,
         layers: layers
         });
         */
        /*
         me.getLayerlegendStore.layerStore = Ext.create('GeoExt.data.LayerStore', {
         map: mapPanel.map,
         layers: layers
         });

         me.getLayerlegendStore().bind(mapPanel.map);
         */
        /*
         me.getLayerStore().bind(mapPanel.map);
         */

        // some more controls
        mapPanel.map.addControls([new OpenLayers.Control.DragFeature(vecLayer, {
            autoActivate: true,
            onComplete: function(feature, px) {
                var store = me.getSummitsStore();
                store.fireEvent('update', store, store.getByFeature(feature));
            }
        })]);

        // for dev purpose
        map = mapPanel.map;
        mapPanel = mapPanel;
    },

    onLaunch: function() {
        var me = this;
/*
        me.getLegendsStore().store({
            map: map,
            layers: map.layers
        });
*/
        //me.getLayerlegendStore().bind(map);
/*
         var lstore = new GeoExt.data.LayerStore({
             map: map,
             layers: map.layers
             });
*/
        // for dev purpose
        ctrl = this;
    },

    onSummitsStoreLoad: function(store, records) {
        // do custom stuff on summits load if you want, for example here we
        // zoom to summits extent
        var dataExtent = store.layer.getDataExtent();
        if (dataExtent) {
            store.layer.map.zoomToExtent(dataExtent);
        }
    },

    overlay_getTileURL: function(bounds) {
        var mapBounds = new OpenLayers.Bounds(2216505,5459622,4753408,6985696);
        var mapMinZoom = 4;
        var mapMaxZoom = 22

        var res = this.map.getResolution();
        var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
        var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h)); //так работало
        var z = this.map.getZoom();
        if (this.map.baseLayer.name == 'Virtual Earth Roads' || this.map.baseLayer.name == 'Virtual Earth Aerial' || this.map.baseLayer.name == 'Virtual Earth Hybrid') {
            z = z + 1;
        }

        if (mapBounds.intersectsBounds(bounds) && z >= mapMinZoom && z <= mapMaxZoom ) {
            //console.log( this.url + z + "/" + x + "/" + y + "." + this.type);
            //alert (this.name);
            if (this.map.layers[4].visibility==true) {
                return "http://212.26.144.110/tile2/orto_10000/" + z + "/" + x + "/" + y + "." + this.type
            };
            if (this.map.layers[5].visibility==true) {
                return "http://212.26.144.110/tile2/map_100000/" + z + "/" + x + "/" + y + "." + this.type
            };
        } else {
            //alert;
            return "/images/none.png";
        }
    }
});