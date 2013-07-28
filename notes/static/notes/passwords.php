<?php
    $mysqli = mysqli_connect('localhost','mc','424424a','notebook');
    $results = mysqli_query($mysqli, "SELECT email, password, uId FROM users WHERE 1 = 1");
    while($result = mysqli_fetch_assoc($results))
    {
	$USERS[$result['email']]['password'] = $result['password'];
	$USERS[$result['email']]['id'] = $result['uId'];
    }

    function check_logged(){
	global $_SESSION, $USERS;
	if (!array_key_exists($_SESSION["logged"], $USERS)) {
	    header("Location: login.php");
	}
    };
?>
 
