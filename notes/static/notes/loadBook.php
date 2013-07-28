<?php
    session_start();
    require("passwords.php");
    check_logged();
    
 
class loadBook{
   public static function getJsonFromBook($book_id)
   {
       $mysqli = mysqli_connect('localhost','mc','424424a','notebook');
       $book_id = $mysqli->real_escape_string($book_id);
       $results = mysqli_query($mysqli, "SELECT idea_id, parent_id,
	       child_order, content_type, content
	       FROM ideas WHERE book_id = $book_id");
       while($result = mysqli_fetch_array($results))
       {
	   $myBook[] = $result;
       }
       /*
       ?>
	   <!doctype html>
	    <html xmlns='http://www.w3.org/1999/xhtml' lang = "en">
	    <head>
	    <title>Text editor</title>
	    <meta charset = "utf-8"/>
	   </head>
	   <body>
	   <table border='1'>
	   <tr>
	      <th>ID</th>
	      <th>Parent Id</th>
	      <th>Order</th>
	      <th>Content</th>
	   </tr>
	   <?
	   loadBook::sortBook($myBook);
       	   foreach($myBook as $idea){?>
	       <tr>
		   <td><?=$idea['idea_id']?></td>
		   <td><?=$idea['parent_id']?></td>
		   <td><?=$idea['child_order']?></td>
		   <td><?=$idea['content']?></td>
	       </tr>
	   <? }
	   echo json_encode($myBook);
	?>
	</body>
	</html>
	<?
	*/
//	   loadBook::sortBook($myBook);
	   echo json_encode($myBook);
   }
   //Very naive selection sort (O(n^2))
   public static function sortBook(& $rawBook){
       $curPos = 0;
       $targetParent = null;
       $targetOrder = 0;
       $length = count($rawBook);
       if($length <= 1) return;
       $orderArr = array();
       $parentArr = array();
       //Get all first children in order then second children and so on
       while($curPos < $length)
       {
	   $swapped = false;
	   for($i = $curPos; $i < $length; ++$i)
	   {
	       if($rawBook[$i]['parent_id'] == $targetParent &&
		       $rawBook[$i]['child_order'] == $targetOrder)
	       {
		   loadBook::swap($rawBook, $i, $curPos);
		   $parentArr[$rawBook[$curPos]['idea_id']] =
		       $targetParent;
		   $targetParent = $rawBook[$curPos]['idea_id'];
		   $orderArr[$rawBook[$curPos]['idea_id']] = $targetOrder;
		   $targetOrder = 0;
		   $curPos ++;
		   $swapped = true;
		   break;
	       }
	   }
	   if(!$swapped)
	   {
	       //Need to know current order of spot
	       $targetOrder = $orderArr[$targetParent] + 1; 
	       $targetParent = $parentArr[$targetParent];
	   }
       }
   }
   public static function swap(& $arr, $index1, $index2){
       if($index1 == $index2) return;
       assert('$index1 >= 0 && $index1 < count($arr) /*$index1 out of range in swap*/');
       assert('$index2 >= 0 && $index2 < count($arr) /*$index2 out of range in swap*/');
       assert('is_array($arr) /*$arr not array in swap*/');
       $temp = $arr[$index1];
       $arr[$index1] = $arr[$index2];
       $arr[$index2] = $temp;
   }
}
if(isset($_GET['bookId']))
    loadBook::getJsonFromBook($_GET['bookId']);
else
    echo "Invalid Book Id";

?>
