<?php
    session_start();
    require("passwords.php");
    check_logged();
?>
	   <!doctype html>
	   <html xmlns='http://www.w3.org/1999/xhtml' lang = "en">
	   <head>
	   <title>Text editor</title>
	   <meta charset = "utf-8"/>
	   </head>
	   <body>
	   	<form action='createBook_control.php' method = 'post'>
		    <input type='text' name='title'
		    placeholder='Title' ></input>
		    <input type='radio' name='permission'
		    value='public'>Public</input>
		    <input type='radio' name='permission'
		    value='private' checked>Private</input>
		    <input type='submit' value='Create'></input>
		</form>
	   </body>
	   </html>
