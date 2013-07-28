<?php
    session_start();
    require("passwords.php");
    check_logged();
    $userId = $_SESSION['id'];
    $mysqli = mysqli_connect('localhost','mc','424424a','notebook');
    $results = mysqli_query($mysqli, "SELECT books.book_id, owner_id,
	    content FROM books, ideas WHERE idea_id = title_id AND (public = 1 OR owner_id = $userId)");
    while($result = mysqli_fetch_assoc($results))
    {
	$books[] = $result;
    }


?>
	   <!doctype html>
	   <html xmlns='http://www.w3.org/1999/xhtml' lang = "en">
	   <head>
	   <title>Text editor</title>
	   <meta charset = "utf-8"/>
	   </head>
	   <body>
	   <ul>
	   <?foreach($books as $book){?>
	       <li>
		   <a href='textEditor.php?bookId=<?=$book['book_id']?>'>
		   <?=$book['content']?></a>
		   <span class='book_id'><?=$book['book_id']?></span>
	       </li>
	   <?}?>
	   </ul>
	   </body>
	   </html>
