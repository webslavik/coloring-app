var context = $('#coloring_canvas')[0].getContext('2d');

var clickX = [];
var clickY = [];
var clickDrag = [];
var paint = false;

// colors
var colorBlack = '#222222';
var colorRed = '#e74c3c';
var currentColor = colorBlack;
var clickColor = [];

// size
var currentSize = 5;

// tools
var currentTool = 'marker';


// Canvas size
function setCanvasSize() {
  var width = $(document).width();
  var height = $(document).height();

  $('#coloring_canvas').attr('width', width);
  $('#coloring_canvas').attr('height', height);
}
setCanvasSize();

// update cursor data
function getCanvasData(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);

  if (currentTool == 'eraser') {
    clickColor.push('#ffffff');
  } else {
    clickColor.push(currentColor);
  }
}

// drawing
function redraw() {
  clearColoring();

  context.lineJoin = 'round';

  for (var i = 0; i < clickX.length; i++) {

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
    context.lineWidth = 5;
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
  getCanvasData(mouseX, mouseY, false);
  redraw();
});

$('#coloring_canvas').on('touchstart', function(e) {
  var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
  var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
  
  paint = true;
  getCanvasData(mouseX, mouseY, false);
  redraw();
});

// move
$('#coloring_canvas').on('mousemove', function(e) {
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  if (paint) {
    getCanvasData(mouseX, mouseY, true);
    redraw();
  }
});

$('#coloring_canvas').on('touchmove', function(e) {
  var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
  var	mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

  if (paint) {
    getCanvasData(mouseX, mouseY, true);
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
  clearColoring();
});


/**
 *  Pencils
 */
$('#coloring_pencil_black').on('click', function() {
  currentColor = colorBlack;
  currentTool = 'marker';
  // currentSize = 5;
});

$('#coloring_pencil_red').on('click', function() {
  currentColor = colorRed;
  currentTool = 'marker';
  // currentSize = 5;
});


/**
 *  Tools
 */
$('#coloring_eraser').on('click', function() {
  currentTool = 'eraser';
  // currentSize = 10;
});


/**
 *  Menu
 */
$('#coloring_tools').on('click', function() {
  if ($('#coloring_menu').hasClass('is-open')) {
    $('#coloring_menu').removeClass('is-open');
  } else {
    $('#coloring_menu').addClass('is-open');
  }
});

$('.coloring-btn').on('click', function() {
  $('.coloring-btn').removeClass('is-active');
  $(this).addClass('is-active');
});