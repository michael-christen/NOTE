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
<link rel="stylesheet" type="text/css" href="textEditor.css"/>
<script type="text/javascript" src="textEditor.js"> </script>
<script type="text/javascript" src="book.js"> </script>
<script type="text/javascript" src="utility.js"> </script>
<script type="text/javascript" src="math.js"> </script>
<script src="../../jQuery/jquery-1.10.1.min.js"></script>
<link href="../../bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
<link href="../../bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
</head>
<body>
    <div class="navbar navbar-inverse"
    style="clear:both;">
	<div class="navbar-inner">
	    <div class="container">
	    <button type="button" class="btn btn-navbar" 
		data-toggle="collapse" data-target=".nav-collapse">
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
		<span class="icon-bar"></span>
	    </button>
		<a class="brand" href="#">Notebook</a>
		<span class="user_creds"><?=$_SESSION["logged"]?>
		<div class="nav-collapse collapse">
		    <ul class="nav">
			<li class="active">
			    <a href="#">Home</a>
			</li>
			<li>
			    <a href="#">About</a>
			</li>
			<li>
			    <a href="#">Contact</a>
			</li>
			<li>
			    <a href="signup.php">Sign Up</a>
			</li>
			<li>
			    <a href="login.php">Sign In</a>
			</li>
			<li>
			    <a href="viewBooks.php">View books</a>
			</li>
			<li>
			    <a href="createBook.php">Create a book</a>
			</li>
		    </ul>
		</div>
	    </div>
	</div>
    </div>
<!--
<svg id='graph' xmlns='http://www.w3.org/2000/svg' version='1.1'
 preserveAspectRatio='xMidYMid slice'>
	<circle cx="100" cy='50' r='40' stroke='black'
	stroke-width='2' fill='red'/>
</svg>
-->

<canvas id='graph'>
</canvas>
<script src="../../bootstrap/js/bootstrap.min.js"></script>
<script src="../../bootstrap/js/bootstrap-dropdown.js"></script>
<script type="text/javascript" src="load.js"> </script>
<script>
<?php
if(array_key_exists('bookId',$_GET)){?>
    $.get('loadBook.php?bookId=' + <?= $_GET["bookId"]?>,
	    function(data){
	    theBook.id = <?= $_GET['bookId']?>;
	    theBook.resetByAjaxArr(JSON.parse(data));
    });
<?php }
else{ ?>
    theBook = new Book('Tutorial Book');
<?php } ?>
</script>

</body>
</html>
