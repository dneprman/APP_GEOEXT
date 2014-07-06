<?php 
  function getPasswordForUser($username) {
    $config_file = file_get_contents("config.json");
    $config_array = json_decode($config_file, true);
    return $config_array["config"][0]["password"];
  }
  function validate($challenge, $response, $password) {
    return md5($challenge . $password) == $response;
  }
  function authenticate() {
      //echo "challenge = " . $_SESSION[challenge] . " username = " . $_REQUEST[username] . " response = " . $_REQUEST[response];
    if (isset($_SESSION[challenge]) && isset($_REQUEST[username]) && isset($_REQUEST[response])) {
      $password = getPasswordForUser($_REQUEST[username]);
      if (validate($_SESSION[challenge], $_REQUEST[response], $password)) {
        $_SESSION[authenticated] = "yes";
        $_SESSION[username] = $_REQUEST[username];;
        unset($_SESSION[challenge]);
      } else {
        echo '{"success":false,"message":"Incorrect user name or password"}';
        exit;
      }
    } else {
      echo '{"success":false,"message":"Session expired"}';
      exit;
    }
  }
  session_start();
  authenticate();
  echo '{"success":true}';
  exit();
?>