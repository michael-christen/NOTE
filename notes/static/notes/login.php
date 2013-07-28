<?php 
session_start(); 
require("passwords.php"); 
if(isset($_POST['ac'])){
if ($_POST["ac"]=="log") { /// do after login form is submitted  
    if ($USERS[$_POST["email"]]['password']==$_POST["password"]) { 
	    $_SESSION["logged"]=$_POST["email"]; 
	    $_SESSION["id"]=$USERS[$_POST['email']]['id'];
    } else { 
	echo 'Incorrect email/password.
	    Please, try again.'; 
    }; 
}; 
}
if(isset($_SESSION['logged'])) {
    if (array_key_exists($_SESSION["logged"],$USERS)) { 
	header("Location: textEditor.php");
    }
}
else { 
    echo '<form action="login.php" method="post"><input
	type="hidden" name="ac" value="log"> '; 
    echo 'Username: <input type="text" name="email" />'; 
    echo 'Password: <input type="password"
	name="password" />'; 
    echo '<input type="submit" value="Login" />'; 
    echo '</form>'; 
}; 
?>
