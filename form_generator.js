var outputfile = ""
var csslink = "<link rel=\"stylesheet\" type=\"text/css\" href=\"stylesheet.css\">";
var content;//store the part dynamically generated from templates
var uploadedtemplate = "";

function uploadfile(){
	document.forms['myform'].elements['myfile'].onchange = function(evt) {
    if(!window.FileReader) return; // Browser is not compatible
// debugger;
    var reader = new FileReader();

    reader.onload = function(evt) {
        if(evt.target.readyState != 2) return;
        if(evt.target.error) {
            alert('Error while reading file');
            return;
        }

        filecontent = evt.target.result;

        // document.forms['myform'].elements['text'].value = evt.target.result;
        // console.log(evt.target.result);
        uploadedtemplate = evt.target.result;
        console.log(uploadedtemplate);
    };

    reader.readAsText(evt.target.files[0]);
};
}


function back(){
	 document.getElementById("fileoutput").innerHTML = "";
	 $('#myform').hide();
     $('#templatesection').show(); 
}


function uploadXML(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parser(this);
            $('#formsection').show();
            $('#templatesection').hide(); 
        }
    };
    console.log(document.getElementById("template").value);
    request.open("GET", document.getElementById("template").value, true);
    // request.open("GET", "sample_template.xml", true);
    request.send();
}


function parser(xml) {
    var doc, arch, i, j, elements, name_arch, name_elem, type;
    doc = xml.responseXML;
    var arch_string = "";
    var name_string = "";
    content = "";
    arch = doc.getElementsByTagName("archetype"); //get archetypes
    for (i = 0; i < arch.length; i++) { //number of archetypes in the teamplate
        //name of an archetype
        name_arch = arch[i].getElementsByTagName("name")[0].textContent;
        // console.log(name_arch)
        //collection of elements contained in one archetype
        elements = arch[i].getElementsByTagName("element");
        content = content + generatearchtypetag(name_arch);
        for (j = 0; j < elements.length; j++) { //for every element
	    //name and type of each element within an archetype
          name_elem = elements[j].getElementsByTagName("name")[0].textContent;
          type = elements[j].getElementsByTagName("type")[0].textContent;     
          content = content + generatefieldtag(name_elem);
            }
        }
                generate();
        }  

//generate archetypes in paragraph tag
function generatearchtypetag(a){
	return generateparagraphtag(a);
}


//generate fields in input tag
function generatefieldtag(f)
{
	listtag = generatetag("li","","field5","");
	return listtag + generatetag("input",f,"","required") + closetab(listtag);    
}


//generate a list containing archtypes and fields
function generatelist () {
	var ul = generatetag("ul","","","");
	result = ul + content + generatebutton() +closetab(ul);
	return result;
}



//connect to the index.html
function generate(){
	//get template from somewhere
	// var inputdata = document.getElementById("fileinput").value;
	var result = '5';
	document.getElementById("fileoutput").innerHTML = generatemarkupfile();
	}

//generate the html file
function generatemarkupfile(inputdata){
	// head = inputdata;
	console.log(1);
	var head = generatetag("html","","","");
	outputfile = head+ generatehead()+generatebody()+ closetab(head);	
	return outputfile;
}


//generate <head>
function generatehead () {
	var head = generatetag("head","","","");
	return head + csslink + closetab(head);
}


//generate <body>
function generatebody () {
	var csstag = generatetag("div","" ,"form-style-9", "");
	var formtag = generatetag("form","","","");
	return csstag + formtag + generatelist() + closetab(formtag)+closetab(csstag);

}

//generate <button> 
function generatebutton()
{
	button1 = generatetag("button","submit",""," type = \"submit\" onclick=\"myFunction()\" ")
	value = "submit";
	button2 = closetab(button1);
	return button1+value+button2;
}


//generate general tags
function generatetag(inputdata,value,classname,extra)
{	
	var head = "<" + inputdata;
	if (value != "")
		{
			head = head + " value = \""+ value + "\"";
		}
	if (classname!="")
		{
			head = head + " class = \""+ classname + "\"";
		}
	if(extra!="")
	{
		head = head + " " + extra;
	}
	head = head + ">\n";
	return head;	
}




//close tags for every tag
function closetab(string)
{
	var secondpart = string.split("<")[1];
	var secondpart = secondpart.split(" ")[0];
	var secondpart = secondpart.split(">")[0];
	var firstpart = "</";
	var thridpart = ">\n";
	// console.log(secondpart);
	var result = firstpart + secondpart+thridpart;
	return result;
}


//generate paragraphtag
function generateparagraphtag(item)
{
	var firstpart = "<p>";
	var data = item;
	var secondpart = closetab("<p><br>");
	return firstpart+ data + secondpart;
}
 

// function generatelistype(name,item)//name is for list name and item is the array for storing list items.
// {
// 	//example
// 	// <div class="dropdown">
//     //  <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
//     //     Dropdown
//     //   <span class="caret"></span>
//     // </button>
//     // <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
//     //     <li><a href="#">Action</a></li>
//     //     <li><a href="#">Another action</a></li>
//     //     <li><a href="#">Something else here</a></li>
//     //     <li role="separator" class="divider"></li>
//     //     <li><a href="#">Separated link</a></li>
//     //   </ul>
//     // </div>
// 	var firstpart = '<div class="dropdown">
//   <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">\n';
//   	var listname = name;
//   	var secondpart = '<span class="caret"></span>
//   </button>
//   <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">\n';
//   	var listitem = '';
//   	for ( i = 0 ; i < item.length;i++)
//   	{
//   		listitem = listitem + '<li><a href="#">'+item[i]+'</a></li>\n';
//   	}
//   	var thirdpart = '</ul>
// </div>\n';
// 	return firstpart+listname + secondpart+listitem ＋thirdpart;
// }

