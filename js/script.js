var context = document.querySelector('#coloring_canvas').getContext('2d');

// 
var clickX = [];
var clickY = [];
var clickDrag = [];
var paint = false;

// colors
var colorBlack = '#34495e';
var colorRed = '#e74c3c';
var currentColor = colorBlack;
var clickColor = [];

// size
var clickSize = [];
var currentSize = 'normal';

// tools
var clickTool = [];
var currentTool = 'marker';


// update cursor data
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickSize.push(currentSize);

  if (currentTool == 'eraser') {
    clickColor.push('#ffffff');
  } else {
    clickColor.push(currentColor);
  }
}

// drawing
function redraw() {
  clearColoring();

  var radius;
  context.lineJoin = 'round';

  for (var i = 0; i < clickX.length; i++) {

    if(clickSize[i] == "small"){
			radius = 2;
		} else if(clickSize[i] == "normal"){
			radius = 5;
		} else if(clickSize[i] == "large"){
			radius = 10;
		} else if(clickSize[i] == "huge"){
			radius = 20;
		}

    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i-1], clickY[i-1]);
    } else {
      context.moveTo(clickX[i]-1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.stroke();
    context.strokeStyle = clickColor[i];
    context.lineWidth = radius;
  }
}

// clear coloring
function clearColoring() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}


/**
 *  Actions
 */
// start
$('#coloring_canvas').on('mousedown', function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(mouseX, mouseY, false);
  redraw();
});

$('#coloring_canvas').on('touchstart', function(e) {
  var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
  var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
  
  paint = true;
  addClick(mouseX, mouseY, false);
  redraw();
});

// move
$('#coloring_canvas').on('mousemove', function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  if (paint) {
    addClick(mouseX, mouseY, true);
    redraw();
  }
});

$('#coloring_canvas').on('touchmove', function(e) {
  var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
  var	mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

  if (paint) {
    addClick(mouseX, mouseY, true);
    redraw();
  }
});

// up
$('#coloring_canvas').on('mouseup touchend', function(e) {
  paint = false;
  redraw();
});

// leave
$('#coloring_canvas').on('mouseleave touchcancel', function(e) {
  paint = false;
});


// Clear coloring
$('#clear_coloring').on('click', function() {
  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
  clickSize = [];
  clearColoring();
});


/**
 *  Colors
 */
$('#color_black').on('click', function() {
  currentColor = colorBlack;
});

$('#color_red').on('click', function() {
  currentColor = colorRed;
});


/**
 *  Size
 */
$('#size_small').on('click', function() {
  currentSize = 'small';
});
$('#size_normal').on('click', function() {
  currentSize = 'normal';
});
$('#size_large').on('click', function() {
  currentSize = 'large';
});
$('#size_huge').on('click', function() {
  currentSize = 'huge';
});


/**
 *  Tools
 */
// $('#tool_crayon').on('click', function() {
//   currentTool = 'crayon';
// });

$('#tool_marker').on('click', function() {
  currentTool = 'marker';
});

$('#tool_eraser').on('click', function() {
  currentTool = 'eraser';
});