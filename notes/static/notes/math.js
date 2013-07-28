var counter = 2;
function parse(evnt)
{
    var theEvnt = evnt ? evnt : window.event;
    var theSrc = theEvnt.target ?
	theEvnt.target : theEvnt.srcElement;
    var str = theSrc.innerHTML;
    var pStr = convertExp(str);
    //When click outside of window, there's a problem
    //if(inverseExp(pStr) != str)
//	alert("Not consistent!");
    theSrc.innerHTML = pStr;
}
function invParse(evnt)
{
    var theEvnt = evnt ? evnt : window.event;
    var theSrc = theEvnt.target ?
	theEvnt.target : theEvnt.srcElement;
    var str = theSrc.innerHTML;
    var pStr = inverseExp(str);
    //if(convertExp(pStr) != str)
//	alert("Not consistent!");
    theSrc.innerHTML = pStr;
}

function convertExp(str)
{
    var re = new RegExp('\\^\\w+','g');
    var a,b,c,arr,li,al;
    arr = re.exec(str);
    li = re.lastIndex;
    while(li != 0)
    {
	al = arr[0].length;
	a = str.substring(0,li - al);
	//alert(a);
	b = str.substring(li - (al-1),li);
	b = b.sup();
	//alert(b);
	c = str.substring(li,str.length);
	//alert(c);
	str = a + b + c;
	arr = re.exec(str);
	li = re.lastIndex;
    }
    return str;
}
function inverseExp(pStr)
{
    pStr = pStr.replace(/<sup>/g,'^');
    pStr = pStr.replace(/<\/sup>/g,'');
    return pStr;
}

