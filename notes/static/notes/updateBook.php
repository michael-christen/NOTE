<?php
    session_start();
    require('passwords.php');
    check_logged();

class updateBook{
    public static function createNewIdea($book_id, $parent_id, $child_order)
    {
	$mysqli = mysqli_connect('localhost','mc','424424a','notebook');
	$book_id = $mysqli->real_escape_string($book_id);
	$parent_id = $mysqli->real_escape_string($parent_id);
	$child_order = $mysqli->real_escape_string($child_order);
	$valid = mysqli_query($mysqli, 
		"INSERT INTO ideas(book_id, parent_id, child_order)
		Values($book_id,$parent_id, $child_order)");
	if($valid)
	{
	    $id = $mysqli->insert_id;
	    echo $id;
	}
	else
	    echo 'invalid';
    }
    public static function updateIdea($id, $parent, $child, $content)
    {
	$mysqli = mysqli_connect('localhost','mc','424424a','notebook');
	$id = $mysqli->real_escape_string($id);
	$parent = $mysqli->real_escape_string($parent);
	$child = $mysqli->real_escape_string($child);
	$content = $mysqli->real_escape_string($content);
	$valid = mysqli_query($mysqli,
		"UPDATE ideas set parent_id = $parent, 
		child_order = $child, content = '$content'
		WHERE idea_id = $id");
       echo $valid;	
    }

    public static function deleteIdea($id)
    {
	$mysqli = mysqli_connect('localhost','mc','424424a','notebook');
	$id = $mysqli->real_escape_string($id);
	$valid = mysqli_query($mysqli,
		"UPDATE ideas set book_id = NULL
		WHERE idea_id = $id");
	echo $valid;
    }
}

$book = array_key_exists('bId',$_GET);
$parent = array_key_exists('pId',$_GET);
$child  = array_key_exists('cOr',$_GET);
$content = array_key_exists('cont',$_GET);
$idea = array_key_exists('id',$_GET);
$del  = array_key_exists('del',$_GET);

if($book && $parent && $child)
    updateBook::createNewIdea($_GET['bId'], $_GET['pId'], $_GET['cOr']);
elseif($parent && $child && $content && $idea)
    updateBook::updateIdea($_GET['id'], $_GET['pId'], 
	    $_GET['cOr'], $_GET['cont']);
elseif($del && $idea)
    updateBook::deleteIdea($_GET['id']);
?>
