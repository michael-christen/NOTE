<?php
    session_start();
    require("passwords.php");
    check_logged();
    $userId = intval($_SESSION['id']);
    $permission = $_POST['permission'] == 'public' ? 1 : 0;
    $mysqli = mysqli_connect('localhost','mc','424424a','notebook');
    $newTitle = $mysqli->real_escape_string($_POST['title']);
    $query = "INSERT INTO ideas(content)
	VALUES( '$newTitle')";
    $results = mysqli_query($mysqli, $query);
    if($results)
    {
	$titleId = $mysqli->insert_id;
	$query = "INSERT INTO books(owner_id, public, title_id) VALUES
	    (  $userId, $permission, $titleId)";
	$results = mysqli_query($mysqli, $query);
    }
    if($results)
    {
	$bookId = $mysqli->insert_id;
	$query = "UPDATE ideas set book_id = $bookId 
	    WHERE idea_id = $titleId";
	$results = mysqli_query($mysqli,$query);
    }
    if($results)
    	header("Location: textEditor.php?bookId=$bookId");
    else
    	echo "BAD";
?>
