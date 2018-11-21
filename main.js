canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
autoSetCanvasSize(canvas);

listenToUser(canvas);

var eraserEnabled = false;
pen.onclick = function(){
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
}
eraser.onclick = function(){
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
}
red.onclick = function(){
  context.fillStyle = 'red';
  context.strokeStyle = 'red';
  red.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}
blue.onclick = function(){
  context.strokeStyle = 'blue';
  blue.classList.add('active');
  green.classList.remove('active');
  red.classList.remove('active');
}
green.onclick = function(){
  context.strokeStyle = 'green';
  green.classList.add('active');
  blue.classList.remove('active');
  red.classList.remove('active');
}

function listenToUser(canvas) {
  var using = false;
  var lastPoint = { x: undefined, y: undefined }
  //特性侦测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y };
      }
    }

    canvas.ontouchmove = function (e) {
      var x = e.touches[0].clientX;
      var y = e.touches[0].clientY;
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }

    canvas.ontouchend = function (e) {
      using = false;
    }
  } else {
    canvas.onmousedown = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      using = true;
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y };
      }
    }
    canvas.onmousemove = function (e) {
      var x = e.clientX;
      var y = e.clientY;
      if (!using) { return }
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function (e) {
      using = false;
    }
  }

}
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

function autoSetCanvasSize(canvas) {
  setCanvasSize();
  window.onresize = function () {
    setCanvasSize();
  }
  function setCanvasSize() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}