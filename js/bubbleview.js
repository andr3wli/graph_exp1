 // <!--javascript for the bubbleView -->
    //set up the spotlight
    window.addEventListener("load", eventWindowLoaded, false);
    
    var Debugger = function() {};
    
    Debugger.log = function(message) {
      try {
        console.log(message);
      } catch (exception) {
        return;
      }
    };
    
    function eventWindowLoaded() {
      canvasAppDemo();
    }
    
    function canvasAppDemo() {
      Debugger.log("Drawing Canvas");
    
      var canvas = document.getElementById('canvasTry');
      var ctx = canvas.getContext("2d");
    
      // set to the width and height of the graph
      var w = (canvas.width = 300);
      var h = (canvas.height = 200);
    
      function reOffset() {
        var BB = canvas.getBoundingClientRect();
        offsetX = BB.left;
        offsetY = BB.top;
      }
    
      var offsetX, offsetY;
      reOffset();
    
      window.onscroll = function(e) {
        reOffset();
      };
    
      window.onresize = function(e) {
        reOffset();
      };
    
      canvas.addEventListener("mousemove", mouseMove, false);
      canvas.addEventListener("touchmove", mouseMove, false);
    
      function draw(cx, cy, radius) {
        ctx.save();
        ctx.clearRect(0, 0, w, h);
    
        //radialGradient make the transition between one circle to another cirle
        //it help to smoothly transfer from one location to another location  
        var radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);
    
        radialGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        radialGradient.addColorStop(0.65, "rgba(0, 0, 0, 1)");
        
        ctx.beginPath();
    
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);
    
        ctx.globalCompositeOperation = "destination-out";
    
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = radialGradient;
        ctx.fill();
    
        ctx.restore();
      }
    
      function mouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
    
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
          
        //set the size of revealing circle
        draw(mouseX, mouseY, 20); 
      }
      //draw the initial spotlight   
      draw(w / 2, h / 2, 20);
    }

    // canvas for the experimental conditons: climate and neutral 
    //set up the spotlight
    window.addEventListener("load", eventWindowLoadedClimate, false);

    var Debugger = function() {};

    Debugger.log = function(message) {
      try {
        console.log(message);
      } catch (exception) {
        return;
      }
    };

    function eventWindowLoadedClimate() {
      canvasAppClimate();
    }
    
    //create an empty arrays for the mouse position
    esti_coord = new Array();
    
    function canvasAppClimate() {
      Debugger.log("Drawing Canvas");

      var canvas = document.getElementById('canvasClimate');
      var ctx = canvas.getContext("2d");

      // var w = (canvas.width = window.innerWidth);
      // var h = (canvas.height = window.innerHeight);

      // set to the width and height of the graph
      var w = (canvas.width = 836);
      var h = (canvas.height = 450);

      function reOffset() {
        var BB = canvas.getBoundingClientRect();
        offsetX = BB.left;
        offsetY = BB.top;
      }

      var offsetX, offsetY;
      reOffset();

      window.onscroll = function(e) {
        reOffset();
      };

      window.onresize = function(e) {
        reOffset();
      };

      canvas.addEventListener("mousemove", mouseMove, false);
      canvas.addEventListener("touchmove", mouseMove, false);

      function draw(cx, cy, radius) {
        ctx.save();
        ctx.clearRect(0, 0, w, h);

        //radialGradient make the transition between one circle to another cirle
        //it help to smoothly transfer from one location to another location  
        var radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);

        radialGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        radialGradient.addColorStop(0.65, "rgba(0, 0, 0, 1)");
        
        //Add the shadow contour around the circle  
        //radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, w, h);

        ctx.globalCompositeOperation = "destination-out";

        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
        ctx.fillStyle = radialGradient;
        ctx.fill();

        ctx.restore();
      }

      function mouseMove(e) {
        e.preventDefault();
        e.stopPropagation();

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        var timepermove = new Date().getTime();

        //set the size of revealing circle
        draw(mouseX, mouseY, 40); 

        //record mouseX and mouseY
        esti_coord.push(mouseX, mouseY, timepermove);

        console.log(esti_coord);
        document.formestigraph.estigraphvar.value = esti_coord;

        var timeElapse = esti_coord[esti_coord.length - 1] - esti_coord[2];
        document.formestigraph.estigraphtime.value = timeElapse;
      }
      //draw the initial spotlight   
      draw(w / 2, h / 2, 40);
    }

    // NEUTRAL 
     //set up the spotlight
window.addEventListener("load", eventWindowLoadedNeutral, false);

var Debugger = function() {};

Debugger.log = function(message) {
  try {
    console.log(message);
  } catch (exception) {
    return;
  }
};

function eventWindowLoadedNeutral() {
  canvasAppNeutral();
}

//create an empty arrays for the mouse position
esti_coord = new Array();

function canvasAppNeutral() {
  Debugger.log("Drawing Canvas");

  var canvas = document.getElementById("canvasNeutral");
  var ctx = canvas.getContext("2d");

  // var w = (canvas.width = window.innerWidth);
  // var h = (canvas.height = window.innerHeight);

  // set to the width and height of the graph
  var w = (canvas.width = 836);
  var h = (canvas.height = 450);

  function reOffset() {
    var BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
  }

  var offsetX, offsetY;
  reOffset();

  window.onscroll = function(e) {
    reOffset();
  };

  window.onresize = function(e) {
    reOffset();
  };

  canvas.addEventListener("mousemove", mouseMove, false);
  canvas.addEventListener("touchmove", mouseMove, false);

  function draw(cx, cy, radius) {
    ctx.save();
    ctx.clearRect(0, 0, w, h);

    //radialGradient make the transition between one circle to another cirle
    //it help to smoothly transfer from one location to another location  
    var radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);

    radialGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
    radialGradient.addColorStop(0.65, "rgba(0, 0, 0, 1)");
    
    //Add the shadow contour around the circle  
    //radialGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.beginPath();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    ctx.globalCompositeOperation = "destination-out";

    ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = radialGradient;
    ctx.fill();

    ctx.restore();
  }

  function mouseMove(e) {
    e.preventDefault();
    e.stopPropagation();

    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    var timepermove = new Date().getTime();

    //set the size of revealing circle
    draw(mouseX, mouseY, 40); 

    //record mouseX and mouseY
    esti_coord.push(mouseX, mouseY, timepermove);

    console.log(esti_coord);
    document.formestigraph.estigraphvar.value = esti_coord;

    
    var timeElapse = esti_coord[esti_coord.length - 1] - esti_coord[2];
    document.formestigraph.estigraphtime.value = timeElapse;

  }
  //draw the initial spotlight   
  draw(w / 2, h / 2, 40);
}