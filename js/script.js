var context = document.querySelector('#coloring_canvas').getContext('2d');

var clickX = [];
var clickY = [];
var clickDrag = [];
var paint = false;

// update cursor data
function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

// drawing
function redraw() {
  clearColoring();

  context.strokeStyle = '#df4b26';
  context.lineJoin = 'round';
  context.lineWidth = 5;

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
  clearColoring();
});

