var outputfile = ""
var csslink = "<link rel=\"stylesheet\" type=\"text/css\" href=\"stylesheet.css\">";
var a;
var b;
var a_length = 0;



function uploadXML() {

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            parser(this);
        }
    };

    request.open("GET", "sample_template.xml", true);
    request.send();
}

function parser(xml) {
    var doc, arch, i, j, elements, name_arch, name_elem, type;
    doc = xml.responseXML;
    var arch_string = "";
    var name_string = "";
    arch = doc.getElementsByTagName("archetype"); //get archetypes
   
    for (i = 0; i < arch.length; i++) { //number of archetypes in the teamplate

        //name of an archetype
        name_arch = arch[i].getElementsByTagName("name")[0].textContent;
        // console.log(name_arch);
        arch_string = arch_string +" "+ name_arch;

        //collection of elements contained in one archetype
        elements = arch[i].getElementsByTagName("element");

        for (j = 0; j < elements.length; j++) { //for every element

          //name and type of each element within an archetype
          name_elem = elements[j].getElementsByTagName("name")[0].textContent;
          type = elements[j].getElementsByTagName("type")[0].textContent;
          name_string = name_string+" "+ name_elem;
            }
          // console.log('---');
          // console.log(name_elem);
      
        }
    // console.log(arch_string);
    a = name_string.split(" ");
    b = arch_string.split(" ");
    console.log(a);
    console.log(b);
    a_length = a.length;
    generate();
}


function generatelist () {
	// a  = arraygenerator();
	var ul = generatetag("ul","","","");
	var result = ul;
  // console.log("textarea");
	
	listtag = generatetag("li","","field5","");
	for (var i = 0; i < a_length; i++) {
    console.log("i m in generate");
    result = result + listtag + generatetag("input",a[i],"","required") + closetab(listtag);    
    // console.log("textarea");
	
}
	result = result + generatebutton() +closetab(ul);
	return result;
}




function generatelist () {
	// a  = arraygenerator();
	var ul = generatetag("ul","","","");
	var result = ul;
	
	listtag = generatetag("li","","field5","");
	for (var i = 0; i < a_length; i++) {
	if(a[i]!="")
	{
    result = result + listtag + generatetag("input",a[i],"","required") + closetab(listtag);    
    // console.log(generatetag"textarea");
}
}
	result = result + generatebutton() +closetab(ul);
	return result;
}


// // validation
// function validateForm() {
//     var x = document.forms["myForm"]["fname"].value;
//     if (x == "") {
//         alert("Name must be filled out");
//         return false;
//     }
//   }

// parser
function generate(){
	var inputdata = document.getElementById("fileinput").value;
	var result = '5';
	document.getElementById("fileoutput").innerHTML = generatemarkupfile();
}



 

function generatemarkupfile(inputdata){
	// head = inputdata;
	var head = generatetag("html","","","");
	outputfile = head+ generatehead()+generatebody()+ closetab(head);	
	return outputfile;
}

function  generatehead () {
	var head = generatetag("head","","","");
	return head + csslink + closetab(head);
}

function generatebody () {
	var csstag = generatetag("div","" ,"form-style-9", "");
	var formtag = generatetag("form","","","");
		// var formtag = "<form onsubmit=\"return validateForm()\" method=\"post\">\n"
	return csstag + formtag + generatelist() + closetab(formtag)+closetab(csstag);

}



function generatebutton()
{
	button1 = generatetag("button","submit",""," type = \"submit\" onclick=\"myFunction()\" ")
	value = "submit";
	button2 = closetab(button1);
	return button1+value+button2;
}

function generatetag(inputdata,value,classname,extra)
{	var head = "<" + inputdata;
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

function paragraphitem(item)
{
	var firstpart = "<p>";
	var data = item;
	var secondpart = closetab("<p>");
	return firstpart+ data + secondpart;
}



