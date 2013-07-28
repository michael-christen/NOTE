function highlightBorder(evnt)
{
    var theEvnt = evnt ? evnt : window.event;
    var theSrc = theEvnt.target ?
       	theEvnt.target : theEvnt.srcElement;
    theSrc.style.border= "solid 5px yellow";
}
function revert(evnt)
{
    var theEvnt = evnt ? evnt : window.event;
    var theSrc = theEvnt.target ?
       	theEvnt.target : theEvnt.srcElement;
    theSrc.style.border= "solid 5px gray";
}
function dbUpdate(evnt)
{
    var theEvnt = evnt ? evnt : window.event;
    var theSrc = theEvnt.target ?
       	theEvnt.target : theEvnt.srcElement;
    theBook.updateIdeaDB(theSrc.parentNode.id);
}
function getStyle(obj,jsProp, cssProp)
{
   if(obj.currentStyle)
      return obj.currentStyle[jsProp];
   else if(window.getComputedStyle)
       return document.defaultView.getComputedStyle(obj,null).getPropertyValue(cssProp);
   else
       alert( "currentStyle nor getComputed supported");
}
//http://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity
function setEndOfContentEditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
	range = document.createRange();//Create a range 
	//(a range is a like the selection but invisible)
	range.selectNodeContents(contentEditableElement);
	//Select the entire contents of the element with the range
	range.collapse(false);//collapse the range to the end point.
       	//false means collapse to end rather than the start
	selection = window.getSelection();//get the selection
       	//object (allows you to change selection)
	selection.removeAllRanges();//remove any selections already made
	selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
	range = document.body.createTextRange();
	//Create a range (a range is a like the selection but invisible)
	range.moveToElementText(contentEditableElement);
	//Select the entire contents of the element with the range
	range.collapse(false);
	//collapse the range to the end point. false means
        //collapse to end rather than the start
	range.select();//Select the range (make it the visible selection
    }
}

function stdFxn(evnt)
{
    var theEvnt = evnt ? evnt : window.event;
    var oldElt = theEvnt.fromElement ?
	theEvnt.fromElement : theEvnt.relatedTarget;
    var theSrc = theEvnt.target ?
	theEvnt.target : theEvnt.srcElement;
}
function stopEvent(evnt)
{
    if(evnt.preventDefault) {
	evnt.preventDefault();
	evnt.stopPropagation();
    }
    else {
	evnt.returnValue = false;
	evnt.cancelBubble = true;
    }
}
function addEListener(obj, evntName, evntFxn, notBbl)
{
    if(obj.addEventListener)
	obj.addEventListener(evntName,evntFxn,notBbl);
    else if(obj.attachEvent)
	obj.attachEvent("on" + evntName,evntFxn);
    //else if(obj.onClick)...
    else
	alert("Not supported");
}
function rmEListener(obj, evntName, evntFxn, notBbl)
{
    if(obj.removeEventListener)
	obj.removeEventListener(evntName,eventFxn,notBbl);
    else if(obj.detachEvent)
	obj.detachEvent("on" + evntName, eventFxn);
    else
	alert("Not supported");
}

//Insert @ index
function insert(arr,index,val)
{
    if(index < 0 || index > arr.length)
    {
	console.log('Error with array insert: invalid index');
	console.log(index);
	return;
    }
    var fArr = arr.slice(index,arr.length);
    arr.splice(index);
    arr.push(val);
    return arr.concat(fArr);
}

//Moves curDiv after targetDiv
function mvDivAfter(curDiv,targetDiv)
{
    document.body.insertBefore(curDiv,targetDiv);
    document.body.insertBefore(targetDiv,curDiv);
}
