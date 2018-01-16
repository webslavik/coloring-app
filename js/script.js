$(function () {

  var context = $('#coloring_canvas')[0].getContext('2d');

  var radius = 5;
  var paint = false;
  var toolMode = 'pencil';
  
  /**
   *  set Canvas size
   */
  function setCanvasSize() {
    var width = $(document).width();
    var height = $(document).height();

    $('#coloring_canvas').attr('width', width);
    $('#coloring_canvas').attr('height', height);
  }
  setCanvasSize();


  // default settings
  context.lineWidth = radius * 2;
  context.fillStyle = '#222222';
  context.strokeStyle = '#222222';


  /**
   *  draw
   */
  function drawLine(x, y) {
    if (paint) {
      if (toolMode == 'pencil') {
        context.globalCompositeOperation = "source-over";
      } else {
        context.globalCompositeOperation = "destination-out";
      }

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(x, y);
    }
  }

  /**
   *  set color
   */
  function setColor(color) {
    context.fillStyle = color;
    context.strokeStyle = color;
  }

  /**
   *  clear Canvas
   */
  function clearColoring() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }


  /**
   *  Actions
   */
  // start
  $('#coloring_canvas').on('mousedown', function (e) {
    var x = e.clientX;
    var y = e.clientY;
    paint = true;

    drawLine(x, y);
  });

  $('#coloring_canvas').on('touchstart', function (e) {
    var x = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
    var y = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
    paint = true;

    drawLine(x, y);
  });

  // move
  $('#coloring_canvas').on('mousemove', function (e) {
    var x = e.clientX;
    var y = e.clientY;

    drawLine(x, y);
  });

  $('#coloring_canvas').on('touchmove', function (e) {
    var x = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
    var y = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

    drawLine(x, y);
  });

  // up
  $('#coloring_canvas').on('mouseup touchend', function (e) {
    paint = false;
    context.beginPath();
  });

  // leave
  $('#coloring_canvas').on('mouseleave touchcancel', function (e) {
    paint = false;
    context.beginPath(); 
  });


  /**
   *  Menu
   */
  $('#coloring_tools').on('click', function () {
    if (!$('#coloring_menu').hasClass('is-open')) {
      $('#coloring_menu').addClass('is-open');
      $('#coloring_canvas').addClass('is-active');
    } else {
      $('#coloring_menu').removeClass('is-open');
      $('#coloring_canvas').removeClass('is-active');
      clearColoring();
    }
  });

  // pencil
  $('.coloring-btn.pencil').on('click', function () {
    $('.coloring-btn').removeClass('is-active');
    $(this).addClass('is-active');

    toolMode = 'pencil';
    var color = $(this).data('color');
    setColor(color);
  });

  // eraser
  $('#coloring_eraser').on('click', function () {
    $('.coloring-btn').removeClass('is-active');
    $(this).addClass('is-active');

    toolMode = 'eraser';
    var color = $(this).data('color');
    setColor(color);
  });

});
