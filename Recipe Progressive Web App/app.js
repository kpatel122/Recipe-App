
async function GetData() {
    console.log("Get Data Called");

    console.log("Got here");
    const response = await fetch("http://127.0.0.1:3000/winter", {
        method: "GET",
        headers: { "Content-Type": "text/plain" }
    }
    );
    const json = await response.json();

    console.log(json);
    document.getElementById("Main").innerHTML = JSON.stringify(json);

}

window.addEventListener('load', e => {
    console.log("Page loaded");
    //GetData();

})

if('serviceWorker' in navigator){
    try{
        navigator.serviceWorker.register('sw.js');
        console.log("Registered SW");
    }
    catch(error){
        console.log("Couldnt register service worker");
    }
    
}


function onAddInstructionClk(){
    if (typeof onAddInstructionClk.counter == 'undefined') {
        // It has not... perform the initialization
        onAddInstructionClk.counter = 1;
    }
    
    var counter = onAddInstructionClk.counter;

    var valsText = [];
    var valsLinks = [];

    //save the imput box values
    for (i = 0; i < counter; i++) {
        valsText.push($("#Instruction" + i).val());
        valsLinks.push($("#vidins"+i).val());   
    }

    document.getElementById("InstructionGroup").innerHTML += "<div id='ins"+counter+"'><div class='input-group'><div class='input-group-prepend'>"+
    "<div class='input-group-text'>"+(counter+1)+"</div></div><input id='Instruction"+counter+"' name='Instruction"+counter+"Name' class='form-control' type='text' required>"+
    "<button type='button' class='close' aria-label='Close' onclick=\"onRemoveInstruction('ins"+counter+"')\"><span aria-hidden='true'>&times;</span>"+
    "</button></div><div class='input-group'><div class='input-group-prepend'><div class='input-group-text' for='imgInp"+counter+"'>Image</div>"+
    "</div><input type='file' id='imgInp"+counter+"' onchange=\"onImageSelect('"+counter+"')\" /></div><div id='img"+counter+"'></div><div class='col-md-6'>"+
    "<label class='control-label' for='vidins"+counter+"'>Youtube link</label><input id='vidins"+counter+"' name='vid-ins"+counter+"' class='form-control' type='text'>"+
    "</div></div>";

    //restore the input box values
    for (i = 0; i < counter; i++) {
        $("#Instruction" + i).val(valsText[i]);
        $("#vidins"+i).val(valsLinks[i]);
    }

    onAddInstructionClk.counter++;

}

function onAddIngredientClk() {

    if (typeof onAddIngredientClk.counter == 'undefined') {
        // It has not... perform the initialization
        onAddIngredientClk.counter = 1;
    }

    var vals = [];
    var counter = onAddIngredientClk.counter;

    //save the imput box values
    for (i = 0; i < counter; i++) {
        vals.push($("#Ingredient" + i).val());
    }

    //add a new input box 
    document.getElementById("IngredientGroup").innerHTML +="<div id=\"ing"+counter+"\">" +
    "<div class=\"input-group\"><div class=\"input-group-prepend\"><div class=\"input-group-text\">"+(counter+1)+"</div>"+
    "</div><input id=\"Ingredient"+counter+"\" name=\"Ingredient"+counter+"Name\" type=\"text\" placeholder=\"Ingredient + Quantity\" class=\"form-control input-md\""+
    "required><button type=\"button\" class=\"close\" aria-label=\"Close\" onclick=\"onRemoveIngredient('ing"+counter+"')\">"+
    "<span aria-hidden=\"true\">&times;</span></button></div></div>";

    //restore the input box values
    for (i = 0; i < onAddIngredientClk.counter; i++) {
        $("#Ingredient" + i).val(vals[i]);
    }

    onAddIngredientClk.counter++;
}



function onAddTagClk() {

    if (typeof onAddTagClk.counter == 'undefined') {
        // It has not... perform the initialization
        onAddTagClk.counter = 1;
    }

    var vals = [];
    var counter = onAddTagClk.counter;

    //save the imput box values
    for (i = 0; i < counter; i++) {
        vals.push($("#tag" + i).val());
    }

    //add a new input box 
    document.getElementById("tags").innerHTML +="<div id='recipetag"+counter+"'><div class='input-group'><div class='input-group-prepend'>"+
    "<div class='input-group-text'>#</div></div><input id='tag"+counter+"' name='recipetag"+counter+"name' type='text' placeholder='tag' class='form-control input-md'>"+
    "<button type='button' class='close' aria-label='Close' onclick=\"onRemoveTag('recipetag"+counter+"')\"><span aria-hidden='true'>&times;</span>"+
    "</button></div></div>";

    //restore the input box values
    for (i = 0; i < counter; i++) {
        $("#tag" + i).val(vals[i]);
    }

    onAddTagClk.counter++;
}

function onRemoveTag(id) {
    var element = document.getElementById(id);
    element.outerHTML = "";
    onAddTagClk.counter--;
 
    delete element;
}


function onRemoveInstruction(id) {
    var element = document.getElementById(id);
    element.outerHTML = "";
    onAddInstructionClk.counter--;
 
    delete element;
}

function onRemoveIngredient(id) {
    var element = document.getElementById(id);
    element.outerHTML = "";
    onAddIngredientClk.counter--;
 
    delete element;
}

function readURL(input,id) {

    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        document.getElementById("img"+id).innerHTML="<img width=\"200\" height=\"200\" id=\"imgtag"+id+"\" src=\"#\" />"
        $('#imgtag'+id).attr('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
}


$(document).ready(function () {
    $('#mainForm').submit(function() {
        // set hidden values
        $("#NumIngredients").val(onAddIngredientClk.counter || 1); 
        $("#NumInstructions").val(onAddInstructionClk.counter  || 1 );
       
        if(onAddTagClk.counter == undefined){
            $("#NumTags").val( $("#tag0").val() == "" ? 0 : 1 );  
        }
        else{
            $("#NumTags").val(onAddTagClk.counter);
        }
 
      });  
});


function onImageSelect(id){ 
    readURL(document.getElementById("imgInp"+id),id);
}



  
  