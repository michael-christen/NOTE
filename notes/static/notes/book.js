function Idea(id)
{
    // i.e), ans, ?, &bull;, I, i, a, A
    this.type  = null;
    //string
    this.id    = id;
    this.parent = null;
    //Push and pop, use arr location for order
    this.children = new Array();
    //Special relationships
    //have id# and weight of type of rel
    //no key
    this.relations = new Array();

    //create the div
    this.obj = document.createElement('div');
    this.obj.className = 'idea-wrapper';
    this.obj.id = id;
    this.depth = 0;
    createIdeaDiv(this.obj);
    this.obj.lastChild.style.left = this.depth * 20 + 'px';

    

    Idea.prototype.rmChild = function(childId){
	var i = this.children.indexOf(childId);
	if(i != -1)
	    this.children.splice(i.toString(),1);
    }
    
    Idea.prototype.updateHeight = function(){
	this.obj.style.height =
	    this.obj.lastChild.offsetHeight + 'px';
    }

    Idea.prototype.updateIndent = function(){
	this.obj.firstChild.style.left = (this.depth-1) * 20 + 'px';
	this.obj.lastChild.style.left  = (this.depth  ) * 20 + 'px';
    }
    
    //Doesn't take care of depth or children
    Idea.prototype.resetByAjaxObj = function(ajaxObj){
	this.id = 'i' + ajaxObj['idea_id'];
	if(ajaxObj['parent_id'])
	    this.parent = 'i' + ajaxObj['parent_id'];
	else
	    this.parent = null;
	this.obj.id = this.id;
	this.obj.lastChild.innerHTML = ajaxObj['content'];
    }
}

function createIdeaDiv(obj)
{
    //Create type
    var type = document.createElement('div');
    type.id = obj.id;
    type.className = 'idea-type';
    type.innerHTML = obj.id;
    type.draggable = true;
    type.style.left = '0px';
    addEListener(type,'dragstart',drag,false);
    addEListener(type,'dragover',allowDrop,false);
    addEListener(type,'drop',drop,false);
    //Need to put event handlers here
    obj.appendChild(type);

    //Create idea
    var idea = document.createElement('div');
    idea.id = obj.id;
    idea.className = 'idea';
    idea.contentEditable = true;
    idea.innerHTML = '<br>';
    addEListener(idea,'keydown',catchValue,false);
    addEListener(idea,'focus',highlightBorder,false);
    addEListener(idea,'focus',invParse,false);
    addEListener(idea,'blur',revert,false);
    addEListener(idea,'blur',parse,false);
    addEListener(idea,'blur',dbUpdate,false);
    addEListener(idea,'dragover',allowDrop,false);
    addEListener(idea,'drop',drop,false);
    //Need to put event handlers here
    obj.appendChild(idea);
}
function insertIdeaAjax(b, p, c)
{
    return parseInt($.ajax({
	type: "GET",
	url: 'updateBook.php?bId='+b+'&pId='+p+'&cOr='+c,
	async: false,
    }).responseText);
}

function updateIdeaAjax(id, content, parent, child_order)
{
    return $.get('updateBook.php?id='+id+'&cont='+content + 
	    '&pId='+parent+'&cOr='+child_order);
}

function deleteIdeaAjax(id)
{
    return $.get('updateBook.php?del=yes&id='+id);
}

function Book(title)
{
    this.ideas = new Array();
    //unique-id
    var curId = 0;
    //Create the title
    this.title = new Idea('i' + curId++);
    this.id = 1;
    this.title.obj.firstChild.style.display = 'none';
    this.title.obj.lastChild.innerHTML = title;
    this.ideas['i0'] = this.title;
    document.body.appendChild(this.title.obj);
    this.title.updateHeight();

    //Assuming not already sorted
    Book.prototype.resetByAjaxArr = function(ajaxArr)
    {
	var curObj;
	/*
	//get all of the ideas in the document
	for(var i = 0; i < ajaxArr.length; ++i)
	{
	    curObj = ajaxArr[i];
	    var curIdea = new Idea('i' + curObj['idea_id']);
	    if(curObj['idea_id'] >= curId) curId = curObj['idea_id'] + 1;
	    curIdea.resetByAjaxObj(curObj); 
	    this.ideas[curIdea.id] = curIdea;
	    document.body.appendChild(curIdea.obj);
	    curIdea.updateHeight();
	}
	*/
	//Get rid of current ideas and title
	for(var i in this.ideas)
	    this.dltIdea(i);
	//Sort and update children and depths
	var curPos = 0; 
	var curDepth = 0;
	var targetParent = null;
	var targetOrder = 0;
	var orderArr = new Array();
	var swapped = false;
	var titleSet = false;
	while(curPos < ajaxArr.length)
	{
	    swapped = false;
	    for(var i = curPos; i < ajaxArr.length; ++i)
	    {
		if(ajaxArr[i]['parent_id'] == targetParent &&
			ajaxArr[i]['child_order'] == targetOrder)
		{
		    var temp = ajaxArr[i];
		    ajaxArr[i] = ajaxArr[curPos];
		    ajaxArr[curPos] = temp;
		    var curIdea = new Idea('i' + temp['idea_id']); 
		    if(temp['idea_id'] >= curId) curId =
		       	temp['idea_id'] + 1;
		    curIdea.resetByAjaxObj(temp); 
		    curIdea.depth = curDepth;
		    this.ideas[curIdea.id] = curIdea;
		    //Set the title
		    if(!titleSet)
		    {
			this.title = curIdea;
			this.title.obj.firstChild.style.display = 'none';
			document.body.appendChild(this.title.obj);
			this.title.updateHeight();
			titleSet = true;
		    }
		    if(targetParent)
		    {
			var theParent = this.ideas['i'+targetParent];
			if(theParent.children.length)
			    this.moveAfter(curIdea.id,
				    theParent.children[theParent.children.length-1]);
			else
			    this.moveBelow(curIdea.id, 'i'+targetParent);
		//	this.insertChild(curIdea,this.ideas['i'+targetParent]);
				/*
			this.ideas['i'+targetParent].children[targetOrder]
			    = curIdea.id;
			    */
		    }
		    targetParent = temp['idea_id'];
		    orderArr['i'+targetParent] = targetOrder;
		    targetOrder = 0;
		    curPos ++;
		    curDepth ++;
		    swapped = true;
		    break;
		}
	    }
	    //watch out for cases of <= 1 idea
	    if(!swapped)
	    {
		curDepth --;
		targetOrder = orderArr['i'+targetParent] + 1;
		if(targetParent)
		{
		    var parentString = this.ideas['i'+targetParent].parent;
		    targetParent = parentString ?  parseInt(
			    parentString.substring(1, parentString.length))
		    : null;
		}
		else
		    break;
	    }
	}
	
	//document.body.appendChild(curIdea.obj);
	//curIdea.updateHeight();
    }
    //Inserts right next to cur
    Book.prototype.insertSibling = function(newIdea, targetIdea){
	//Need parent
	var pIdea = this.ideas[targetIdea.parent];
	this.rmParent(newIdea);
	//Insert next to fromIdea
	if(pIdea)
	{
	    pIdea.children = insert(pIdea.children,
		    pIdea.children.indexOf(targetIdea.id)+1,
		    newIdea.id);
	    //Update parent
	    newIdea.parent = pIdea.id;
	    /*
	    for(var i = 0; i < pIdea.children.length; ++i)
		this.updateIdeaDB(pIdea.children[i]);
		*/
	}
	else
	    newIdea.parent = null;
	newIdea.depth = this.depth;
	newIdea.updateIndent();
    }

    //Inserts as first child
    Book.prototype.insertChild = function(newIdea, targetIdea){
	this.rmParent(newIdea);
	targetIdea.children.unshift(newIdea.id);
	//Update all of the other children
	/*
	for(var i = 0; i < targetIdea.children.length; ++i)
	    this.updateIdeaDB(targetIdea.children[i]);
	    */
	newIdea.parent = targetIdea.id;
	newIdea.depth = targetIdea.depth + 1;
	newIdea.updateIndent();
    }
    Book.prototype.rmParent = function(curIdea){
	//Remove from old parent
	if(curIdea.parent)
	{
	    var pIdea = this.ideas[curIdea.parent];
	    pIdea.rmChild(curIdea.id);
	    /*
	    for(var i = 0; i < pIdea.children.length; ++i)
		this.updateIdeaDB(pIdea.children[i]);
		*/
	}

	//Necessary?
	curIdea.parent = null;
    }

    //Requires that there is a previous sibling
    Book.prototype.pSibling = function(curIdea){
	var i = this.ideas[curIdea.parent].children.indexOf(curIdea.id);
	if( i == 0)
	{
	    return -1;
	}
	return this.ideas[curIdea.parent].children[i-1];
    }

    Book.prototype.insertIdea = function(fromId){
	var curIdea = this.ideas[fromId];
	var insertBelow = curIdea.depth == 0 ||
	    curIdea.children.length > 0;
	var pIdea = this.ideas[curIdea.parent];
	var childOrder = insertBelow ? 0 :  
		    pIdea.children.indexOf(fromId)+1;
	var newId = insertIdeaAjax( this.id,
		parseInt(fromId.substring(1,fromId.length)),
		childOrder);
	var newIdea = new Idea('i' + newId);
	this.ideas[newIdea.id] = newIdea;
	//Make child of title
	if(insertBelow)
	    this.moveBelow(newIdea.id,curIdea.id);
	else
	    this.moveAfter(newIdea.id,curIdea.id);
    }

    Book.prototype.updateIdeaDB = function(curId){
	var curIdea = this.ideas[curId];
	var id = parseInt(curIdea.id.substring(1,curIdea.id.length));
	var pId = curIdea.parent ?
	    parseInt(curIdea.parent.substring(1,curIdea.parent.length))
	    : null;
	var child_order = curIdea.parent ?
	    this.ideas[curIdea.parent].children.indexOf(curId) :
	    0;
	var content =
	    encodeURIComponent(curIdea.obj.lastChild.innerText);
	updateIdeaAjax(id, content, pId, child_order);
    }

    Book.prototype.demote = function(cId){
	var curIdea = this.ideas[cId];
	var pSibId = this.pSibling(curIdea);
	if(pSibId != -1)
	{
	    var pIdea = this.ideas[pSibId];
	    if(pIdea.children.length > 0)
		this.moveAfter(cId,this.lowestId(pSibId));
	    else
		this.moveBelow(cId,pSibId);
	}
    }

    Book.prototype.promote = function(cId){
	var curIdea = this.ideas[cId];
	var pId = curIdea.parent;
	if(pId)
	    this.moveAfter(cId,pId);
    }


    //Move self and all children past the lowest descendant
    //of the targetId as a sibling
    Book.prototype.moveAfter = function(cId,targetId){
	var curIdea = this.ideas[cId];
	var oldPIdea = this.ideas[curIdea.parent];
	var tIdea   = this.ideas[targetId];
	var lowestCDescendant = this.lowestId(cId);
	var lowestTDescendant = this.lowestId(targetId);

	this.insertSibling(curIdea, tIdea);
	this.updateDepths(cId);
	this.movePost(cId,lowestCDescendant,lowestTDescendant);
	curIdea.obj.lastChild.focus();

	this.updateTypeByIdea(oldPIdea);
	this.updateTypeByIdea(this.ideas[curIdea.parent]);
	this.updateIdeaDB(cId);
	this.updateIdeaDB(targetId);
	if(oldPIdea)
	    this.updateIdeaDB(oldPIdea.id);
    }
    //Make self the first child of targetId
    Book.prototype.moveBelow = function(cId,targetId){
	var curIdea = this.ideas[cId];
	var oldPIdea = this.ideas[curIdea.parent];
	var tIdea   = this.ideas[targetId];
	var lowestCDescendant = this.lowestId(cId);
	this.insertChild(curIdea, tIdea);
	this.updateDepths(cId);
	this.movePost(cId,lowestCDescendant,targetId);
	curIdea.obj.lastChild.focus();
	this.updateTypeByIdea(oldPIdea);
	this.updateTypeByIdea(this.ideas[curIdea.parent]);
	this.updateIdeaDB(cId);
	this.updateIdeaDB(targetId);
	if(oldPIdea)
	    this.updateIdeaDB(oldPIdea.id);
    }
    Book.prototype.newConn = function(cId,targetId,weight){
    }

    Book.prototype.dltIdea = function(cId){
	var curIdea = this.ideas[cId];
	var pSib = curIdea.obj.previousSibling.lastChild;
	if(pSib)
	{
	    pSib.focus();
	    setEndOfContentEditable(pSib);
	}
	for(var i = curIdea.children.length-1; i >= 0; --i)
	    this.promote(curIdea.children[i]);
	var pIdea = this.ideas[curIdea.parent];
	this.rmParent(curIdea);
	document.body.removeChild(curIdea.obj);
	var intId = parseInt(cId.substring(1,cId.length));
	deleteIdeaAjax(intId);
	delete this.ideas[cId];
	this.updateTypeByIdea(pIdea);
    }

    //Move past targetId, don't indent or change parent or anything
    Book.prototype.movePost = function(cId,lId,targetId){
	if(targetId == lId || cId == targetId)
	    return;
	var targetNd = this.ideas[targetId].obj;
	var curNd    = this.ideas[lId].obj;
	var tempNd = curNd.previousSibling;
	mvDivAfter(curNd,targetNd);
	while(curNd.id != cId)
	{
	    targetNd = curNd;
	    curNd = tempNd; 
	    tempNd = curNd.previousSibling;
	    document.body.insertBefore(curNd,targetNd);
	}
	if(cId != lId)
	    document.body.insertBefore(curNd,targetNd);
	curNd.lastChild.focus();
    }

    //Returns lowest descendantId of curId
    Book.prototype.lowestId   = function(curId){
	var curIdea = this.ideas[curId];
	var ln = curIdea.children.length;
	if( ln == 0)
	    return curId;
	return this.lowestId(curIdea.children[ln-1]);
    }

    Book.prototype.isDescendant = function(anId, posDesId){
	var anIdea = this.ideas[anId];
	var tmpId;
	for(var i in anIdea.children)
	{
	    tmpId = anIdea.children[i];
	    if(tmpId == posDesId)
		return true;
	    else if(this.isDescendant(tmpId, posDesId))
		return true;
	}
	return false;
    }

    Book.prototype.updateHeight = function(cId){
	this.ideas[cId].updateHeight();
    }

    Book.prototype.updateType = function(cId){
	var curIdea = this.ideas[cId];
	var pIdea = this.ideas[curIdea.parent];
	curIdea.obj.firstChild.innerHTML =
	    pIdea.children.indexOf(cId) + 1;
    }

    Book.prototype.updateTypeByIdea = function(curIdea){
	if(curIdea)
	    for(var i in curIdea.children)
	    {
		this.updateType(curIdea.children[i]);
		this.updateIdeaDB(curIdea.children[i]);
	    }
    }

    //Update curentDepth and all children depths and tabs
    Book.prototype.updateDepths = function(cId){
	var curIdea = this.ideas[cId];
	var pIdea = this.ideas[curIdea.parent];
	if(pIdea)
	    curIdea.depth = pIdea.depth+1;
	//The root
	else
	    curIdea.depth = 0;
	curIdea.updateIndent();
	for(var i in curIdea.children)
	    this.updateDepths(curIdea.children[i]);
    }
    Book.prototype.printRels = function(){
	var str;
	for(var i in this.ideas)
	{
	    str = i;
	    str += ' children: ';
	    for(var j in this.ideas[i].children)
		str += this.ideas[i].children[j] + ' ';
	    if(this.ideas[i].parent)
		str += '\nparent: ' + this.ideas[i].parent + '\n';
	    else
		str += '\nparent: null\n';
	    console.log(str);
	}
    }
}
