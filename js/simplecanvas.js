var canvasWidth = 837;
var canvasHeight = 450;

var drawingAreaX = 60;
var drawingAreaY = 40;
var drawingAreaWidth = 609.65;
var drawingAreaHeight = 350;
var drawingTotalWidth = drawingAreaX+drawingAreaWidth;//670
var drawingTotalHeight = drawingAreaY+drawingAreaHeight;//390

//how many pixels per year, 4.45
var totalNumberofYear = 141;// from 1880-2021


var clickX_simple = new Array();
var clickY_simple = new Array();
var clickDrag_simple = new Array();
var clickXY_simple = new Array();

var paint_simple = false;
var canvas_simple;
var context_simple;

var outlineImage = new Image();
outlineImage.src = "images/graph.png";
/**
* Creates a canvas element.
*/

function prepareSimpleCanvas(id) {
	// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
	var canvasDiv = document.getElementById(id);
	canvas_simple = document.createElement('canvas');
	canvas_simple.setAttribute('width', canvasWidth);
	canvas_simple.setAttribute('height', canvasHeight);
	canvas_simple.setAttribute('id', 'canvasSimple');
	canvasDiv.appendChild(canvas_simple);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas_simple = G_vmlCanvasManager.initElement(canvas_simple);
	}
    context_simple = canvas_simple.getContext("2d");
    
	context_simple.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);

	// Add mouse events
	// ----------------
	$('#canvasSimple').mousedown(function(e)
	{
		// Mouse down location
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
        
		if ((drawingAreaX<mouseX && mouseX<=drawingTotalWidth) && (drawingAreaY<mouseY && mouseY<=drawingTotalHeight)){
			paint_simple = true;
			addClickSimple(mouseX, mouseY, false);
			redrawSimple();
		}
	});
	
	$('#canvasSimple').mousemove(function(e){
		if(paint_simple){

			var mouseX = e.pageX - this.offsetLeft;
			var mouseY = e.pageY - this.offsetTop;

			if ((drawingAreaX<mouseX && mouseX<=drawingTotalWidth) && (drawingAreaY<mouseY && mouseY<=drawingTotalHeight)){
				addClickSimple(mouseX, mouseY, true);
				redrawSimple();
			}
        }
	});
	
	$('#canvasSimple').mouseup(function(e){
		paint_simple = false;
	  	redrawSimple();
	});
	
	$('#canvasSimple').mouseleave(function(e){
		paint_simple = false;
	});
	
	$('#clearCanvasSimple').mousedown(function(e)
	{
		clickX_simple = new Array();
		clickY_simple = new Array();
		clickDrag_simple = new Array();
		clickXY_simple = new Array();
		clearCanvas_simple(); 
	});
	
	// Add touch event listeners to canvas element
	canvas_simple.addEventListener("touchstart", function(e)
	{
		// Mouse down location
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
			mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
		

		if ((drawingAreaX<mouseX && mouseX<=drawingTotalWidth) && (drawingAreaY<mouseY && mouseY<=drawingTotalHeight)){
			paint_simple = true;
			addClickSimple(mouseX, mouseY, false);
			redrawSimple();
		}

	}, false);
	canvas_simple.addEventListener("touchmove", function(e){
		
		var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft,
			mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
					
		if(paint_simple){
			if ((drawingAreaX<mouseX && mouseX<=drawingTotalWidth) && (drawingAreaY<mouseY && mouseY<=drawingTotalHeight)){
				addClickSimple(mouseX, mouseY, true);
				redrawSimple();
			}
		}
		e.preventDefault()
	}, false);
	canvas_simple.addEventListener("touchend", function(e){
		paint_simple = false;
	  	redrawSimple();
	}, false);
	canvas_simple.addEventListener("touchcancel", function(e){
		paint_simple = false;
	}, false);
}



function addClickSimple(x, y, dragging)
{
	clickX_simple.push(x);
	clickY_simple.push(y);
	clickDrag_simple.push(dragging);
	//get the time
	var timepermove = new Date().getTime();

	clickXY_simple.push(x, y, timepermove);

    //console.log(clickX_simple);
	//console.log(clickY_simple);
	console.log(clickXY_simple);
	
	document.drawingGraph.Xcoord.value = clickX_simple;
	document.drawingGraph.Ycoord.value = clickY_simple;
	document.drawingGraph.XYcoord.value = clickXY_simple;

	var timeElapse = clickXY_simple[clickXY_simple.length - 1] - clickXY_simple[2];
	document.drawingGraph.drawTime.value = timeElapse;

}

function clearCanvas_simple()
{
	context_simple.clearRect(0, 0, canvasWidth, canvasHeight);
	context_simple.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);
}


function redrawSimple()
{
	clearCanvas_simple();
	
	context_simple.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);

	var radius = 1;
	context_simple.strokeStyle = "#696969";
	context_simple.lineJoin = "round";
	context_simple.lineWidth = radius;

    // Keep the drawing in the drawing area
	context_simple.save();
	context_simple.beginPath();
	context_simple.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
	context_simple.clip();

	for(var i=0; i < clickX_simple.length; i++)
	{		
		context_simple.beginPath();
		if(clickDrag_simple[i] && i){
			context_simple.moveTo(clickX_simple[i-1], clickY_simple[i-1]);
		}else{
			context_simple.moveTo(clickX_simple[i]-1, clickY_simple[i]);
		}
		context_simple.lineTo(clickX_simple[i], clickY_simple[i]);
		context_simple.closePath();
		context_simple.stroke();
	}
	context_simple.restore();
}


function validate(){

	//check whether there is an X value in every interval of 5 pixels
	for(var i=0; i < (clickX_simple.length-1); i++){
		//prevent from drawing to values on the X 
		//by checking whether the next X value in array is smaller than the previous X value
		if (clickX_simple[i+1]<clickX_simple[i]){
			alert("Please redraw the graph from left to right.");
			return false;

		//check whether the mouse moved too fast
		}else if ((clickX_simple[i+1]-clickX_simple[i]) > 15){
			alert("Please redraw the entire graph slowly.");
			return false;
		}
		
		//check whether we have a data point every 10 years
		if (clickX_simple.length<50) {
			alert("Please redraw the entire graph slowly.");
			return false;
		}
	}

	
	save();
}

function save() {
	var dataURL= canvas_simple.toDataURL();
	// post the dataUrl to php

	$.ajax({
		type: "POST",
		url: "saveimage.php",
		data: {image: dataURL}
	}).done(function( respond ) {
		// you will get back the temp file name
		// or "Unable to save this image."
		console.log(respond);
	});
	
}