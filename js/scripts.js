window.onload = () => {
    canvasDraw("base");
    canvasParts();
};
  
var model = document.getElementById("container").getAttribute("data-model");


function canvasParts(){
    var parts = document.getElementById("parts");
    var parts_ctx = parts.getContext("2d");

    var img_parts = new Image(); 
    img_parts.src = "img/"+model+"/parts.png";
    img_parts.onload = function() {
        parts_ctx.drawImage(img_parts, 0, 0, parts.width, parts.height);
    };
}

function canvasDraw(canvas_id) {

    var canvas = document.getElementById(canvas_id);
    var canvas_ctx = canvas.getContext("2d");
    var canvas_color_picker = document.getElementById(canvas_id+"_picker");

    var bimg = new Image(); 
    bimg.src = "img/"+model+"/"+canvas_id+".png";

    bimg.onload = function(){
        canvas_ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas_ctx.globalCompositeOperation = "source-over";

        canvas_ctx.fillStyle = canvas_color_picker.value;
        canvas_ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        // set composite mode
        canvas_ctx.globalCompositeOperation = "destination-in";
        // draw image
        canvas_ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
    };
}
