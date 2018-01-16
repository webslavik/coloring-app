$(function () {

  var context = $('#coloring_canvas')[0].getContext('2d');

  var radius = 5;
  var paint = false;

  
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
  function drawLine(data) {
    if (paint) {
      context.lineTo(data.clientX, data.clientY);
      context.stroke();
      context.beginPath();
      context.arc(data.clientX, data.clientY, radius, 0, Math.PI*2);
      context.fill();
      context.beginPath();
      context.moveTo(data.clientX, data.clientY);
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
    // var x = e.clientX;
    // var x = e.clientX;

    paint = true;
    drawLine(e);
  });

  $('#coloring_canvas').on('touchstart', function (e) {
    var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
    var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;
    console.log(mouseY, mouseX);
    paint = true;
  });

  // move
  $('#coloring_canvas').on('mousemove', function (e) {
    drawLine(e);
  });

  // $('#coloring_canvas').on('touchmove', function (e) {
  //   var mouseX = (e.changedTouches ? e.changedTouches[0].pageX : e.pageX) - this.offsetLeft;
  //   var mouseY = (e.changedTouches ? e.changedTouches[0].pageY : e.pageY) - this.offsetTop;

  //   if (paint) {
  //     getCanvasData(mouseX, mouseY, true);
  //     redraw();
  //   }
  // });

  // up
  $('#coloring_canvas').on('mouseup touchend', function (e) {
    paint = false;
    context.beginPath();
  });

  // // leave
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

    var color = $(this).data('color');
    setColor(color);
  });

  // eraser
  $('#coloring_eraser').on('click', function () {
    $('.coloring-btn').removeClass('is-active');
    $(this).addClass('is-active');

    var color = $(this).data('color');
    setColor(color);
  });

});
