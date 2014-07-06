<?php
  session_start();
  session_unset();
  session_set_cookie_params(60);
  srand();
  $challenge = "";
  for ($i = 0; $i < 80; $i++) {
    $challenge .= dechex(rand(0, 15));
  }
  $_SESSION[challenge] = $challenge;
?>
<html>
  <head>
     <title>Login</title>

     <!--<link rel="stylesheet" type="text/css" href="lib/ext-4.2.1/resources/css/ext-all.css">-->
     <link rel="stylesheet" type="text/css" href="../resources/css/app.css">
     <link rel="stylesheet" type="text/css" href="../resources/css/Ext.ux.MessageBox.css">

     <link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-3.3.0/resources/css/ext-all.css" />
     <!--Calls to ExtJS library files from Cachefly.-->
     <script type="text/javascript" src="http://extjs.cachefly.net/ext-3.3.0/adapter/ext/ext-base.js"></script>
     <script type="text/javascript" src="http://extjs.cachefly.net/ext-3.3.0/ext-all-debug.js"></script>

     <!--<script type="text/javascript" src="lib/ext-4.2.1/ext-all.js"></script>-->

    <!--
     <script type="text/javascript" src="lib/ext-4.2.1/ext-base.js"></script>
     <script type="text/javascript" src="app/ux/Ext.ux.MessageBox.js"></script>
     <script type="text/javascript" src="app/ux/Ext.ux.Notification.js"></script>
     <script type="text/javascript" src="app/ux/Ext.ux.plugin.FormEnter.js"></script>
    -->
     <script type="text/javascript" src="md5.js"></script>
     <script type="text/javascript">
       Ext.BLANK_IMAGE_URL = 'images/s.gif';
       Ext.onReady(function(){
         var loginForm = new Ext.form.FormPanel({
           frame: true,
           border: false,
           labelWidth: 75,
           items: [{
             xtype: 'textfield',
             width: 190,
             id: 'username',
             fieldLabel: 'User name'
           },{
             xtype: 'textfield',
             width: 190,
             id: 'password',
             fieldLabel: 'Password',
             inputType: 'password',
             submitValue: false
           },{
             xtype: 'hidden',
             id: 'challenge',
             value: "<?php echo $challenge; ?>",
             submitValue: false
           }],
           buttons: [{
             text: 'Login',
             handler: function(){
               if(Ext.getCmp('username').getValue() !== '' && Ext.getCmp('password').getValue() !== ''){
                 loginForm.getForm().submit({
                   url: 'authenticate.php',
                   method: 'POST',
                   params: {
                     response: hex_md5(Ext.getCmp('challenge').getValue()+hex_md5(Ext.getCmp('password').getValue()))
                   },
                   success: function(){
                     window.location = 'yourpage.php';
                   },
                   failure: function(form, action){
                     Ext.MessageBox.show({
                       title: 'Error',
                       msg: action.result.message,
                       buttons: Ext.Msg.OK,
                       icon: Ext.MessageBox.ERROR
                     });
                   }
                 });
               }else{
                 Ext.MessageBox.show({
                   title: 'Error',
                   msg: 'Please enter user name and password',
                   buttons: Ext.Msg.OK,
                   icon: Ext.MessageBox.ERROR
                 });
               }
             }
           }]
         });
         var loginWindow = new Ext.Window({
           title: 'Login',
           layout: 'fit',
           closable: false,
           resizable: false,
           draggable: false,
           border: false,
           height: 125,
           width: 300,
           items: [loginForm]
         });
         loginWindow.show();
       });
     </script>
   </head>
   <body>
   </body>
</html>