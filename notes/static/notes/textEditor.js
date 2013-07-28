var theBook;

window.onload = function(){
    theBook = new Book('First Book');
//    theBook.insertIdea('i0');
};

function loadBook(bookId)
{
   var query = 'loadBook.php?bookId='+bookId;
   console.log(query);
   var myResponse;
   $.get( query,function(data){
       theBook.id = bookId;
       theBook.resetByAjaxArr(JSON.parse(data));
   }); 
}

function catchValue(evnt) {
    var theEvnt = evnt ? evnt : window.event;
    var oldElt = theEvnt.fromElement ?
       	theEvnt.fromElement : theEvnt.relatedTarget;
    var theSrc = theEvnt.target ?
       	theEvnt.target : theEvnt.srcElement;
    var keycode = window.event ? theEvnt.keyCode : theEvnt.which;
    const BACKSPACE = 8;
    const TAB 	= 9;
    const ENTER	= 13;
    const UP_ARROW = 38;
    const DN_ARROW = 40;
    theBook.updateHeight(theSrc.id);
    switch(keycode)
    {
	case BACKSPACE:
	    handleBackspace(theSrc,theEvnt);
	    break;
	case TAB:
	    handleTab(theSrc,theEvnt);
	    break;
	case ENTER:
	    handleEnter(theSrc,theEvnt);
	    break;
	case UP_ARROW:
	    traverseTo(theSrc.parentNode.previousSibling.lastChild);
	    stopEvent(theEvnt);
	    //theEvnt.preventDefault();
	    break;
	case DN_ARROW:
	    traverseDn(theSrc.parentNode.nextSibling);
	    stopEvent(theEvnt);
	    //theEvnt.preventDefault();
	    break;
    }
}
function traverseTo(src)
{
    if(!src)
	return;
    if(src.className == 'idea')
    {
	src.focus();
	setEndOfContentEditable(src);
    }
}
function traverseDn(src)
{
    if(src)
	traverseTo(src.lastChild);
}

function handleBackspace(src,evnt)
{
    //IF cursor @ beginning
    if(window.getSelection().getRangeAt(0).startOffset == 0)
    {
	var head = src.parentNode.firstChild;
	var mL = parseInt(head.style.left);
	//Delete the current div and move back
	if(src.innerHTML == "<br>" && (isNaN(mL)||mL == 0))
	{
	    if(src.parentNode.previousSibling.className ==
		    'idea-wrapper')
		theBook.dltIdea(src.id);
	}
	else
	    theBook.promote(src.id);
	stopEvent(evnt);
	//evnt.preventDefault();
    }
}

function handleTab(src,evnt)
{
    theBook.demote(src.id);
    stopEvent(evnt);
}

function handleEnter(src,evnt)
{
    theBook.insertIdea(src.id);
    stopEvent(evnt);
}

function drag(event)
{
    event.dataTransfer.setData('Text',event.target.id);
}

function allowDrop(event)
{
    event.preventDefault();
}

function drop(event)
{
    event.preventDefault();
    var data = event.dataTransfer.getData('Text');
    //Can't drop in a descendent
    if(theBook.isDescendant(data, event.target.id) ||
	    data == event.target.id)
	return;
    if(event.target.className == 'idea-type')
	theBook.moveAfter(data, event.target.id);
    else if(event.target.className == 'idea')
	theBook.moveBelow(data, event.target.id);
}
