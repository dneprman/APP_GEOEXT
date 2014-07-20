<?php
  require("common.php");
  require_authentication();
?>
<html>
<head>
    <title>My GIS</title>

    <link rel="stylesheet" type="text/css" href="/lib/ext-4.2.1/resources/css/ext-all.css">
    <link rel="stylesheet" type="text/css" href="/lib/OpenLayers-2.13.1/theme/default/style.css" />
    <!--<link rel="stylesheet" type="text/css" href="resources/css/ag.css" />-->
    <!-- Basic example styling -->
    <link rel="stylesheet" type="text/css" href="/shared/example.css" />

    <link rel="stylesheet" type="text/css" href="/resources/css/app.css">
    <link rel="stylesheet" type="text/css" href="/resources/css/Ext.ux.MessageBox.css">

    <style type="text/css">
        .legend {
            padding-left: 18px;
        }
        .x-tree-elbow, .x-tree-elbow-end {
            width: 3px !important;
        }
        .gx-tree-layer-icon {
            display: none !important;
        }
    </style>

    <!-- Include OpenLayers.  Isn't managed by Ext.Loader -->
    <script src="/lib/OpenLayers-2.13.1/OpenLayers.js"></script>

    <!-- Ext and GeoExt files are fetched by the loader.  See in app.js -->
    <script type="text/javascript" charset="utf-8" src="/lib/ext-4.2.1/ext-all.js"></script>

    <!-- In order to be able to build app-all.js, you need to have a local
         extjs copy.  If you want to try it, comment the above script tag
         and uncomment the one below.  You'll also need to edit app.js -->
    <!-- <script type="text/javascript" charset="utf-8" src="ext-4.2.1.883/ext-dev.js"></script> -->

    <script type="text/javascript" src="/app/ux/Ext.ux.MessageBox.js"></script>
    <script type="text/javascript" src="/app/ux/Ext.ux.Notification.js"></script>
    <script type="text/javascript" src="/app/ux/Ext.ux.plugin.FormEnter.js"></script>

    <script type="text/javascript" src="app.js"></script>
</head>

<body>
<div style="display:none;">
    <div id="help">
        <p>
            Please, visit
            <a href="simple-dev.html">simple-dev.html</a> for help.
        </p>
    </div>
</div>
</body>
</html>
