<?php
if(isset($_POST['user']))
    $uName =  $_POST['user']; 
else
   $uName ='';
if(isset($_POST['password']))
    $pWord =  $_POST['password']; 
else
    $pWord = '';
if(strlen($uName) > 0 && strlen($pWord) > 0)
{
    //Insert into db
    mysql_connect('localhost','mc','424424a','notebook') or
	die(mysql_error());
    //if(mysqli_connect_error($con))
    //{
	//echo "Failed to connect to MySQL: " . mysqli_connect_error();
    //}
    //else
    //{
    mysql_select_db('notebook') or die(mysql_error());
	$iQuery = "INSERT INTO users (email,password) VALUES
	    ('$uName','$pWord')"; 
    mysql_query($iQuery) or die(mysql_error());

    echo "Welcome to NoteBook $uName.";

    //}
}
else
{
    $var = <<<END
    <!doctype html>
    <html lang = 'en'>
	<head>
	   <title>Home Page</title>
        </head>
	<body>
	   <form name='signup' action='signup.php'
	   method='post'>
	   Email Address:<input type='text' name='user'>
	   Password:<input type='password' name='password'>
	   <input type='submit' value='Sign In'>
	   </form>
        </body>
    </html>
END;

    echo $var;
}
?>
