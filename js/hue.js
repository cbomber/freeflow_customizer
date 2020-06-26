var c = document.getElementById('myCanvas');
var background_ctx = c.getContext("2d");

var img = new Image(); img.onload = demo; img.src = "img/caliber_base_color.png";
var img2 = new Image(); img2.onload = demo; img2.src = "img/caliber_parts.png";
    
function demo() { render()}

function render() {
    var hue = +rHue.value, sat = +rSat.value, l = +rL.value;
    background_ctx.globalAlpha = .5;

    background_ctx.clearRect(0, 0, c.width, c.height);
    background_ctx.globalCompositeOperation = "source-over";
    background_ctx.drawImage(img, 0, 0, c.width, c.height);
    background_ctx.drawImage(img2, 0, 0, c.width, c.height);

    if (!!cColor.checked) {
        // use color blending mode
        background_ctx.globalCompositeOperation = "color";
        background_ctx.fillStyle = "hsl(" + hue + "," + sat + "%, 50%)";
        background_ctx.fillRect(0, 0, c.width, c.height);
    }
    else {
        // adjust "lightness"
        background_ctx.globalCompositeOperation = l < 100 ? "color-burn" : "color-dodge";
        // for common slider, to produce a valid value for both directions
        l = l >= 100 ? l - 100 : 100 - (100 - l);
        background_ctx.fillStyle = "hsl(0, 50%, " + l + "%)";
        background_ctx.fillRect(0, 0, c.width, c.height);
        
        // adjust saturation
        background_ctx.globalCompositeOperation = "saturation";
        background_ctx.fillStyle = "hsl(0," + sat + "%, 50%)";
        background_ctx.fillRect(0, 0, c.width, c.height);

        // adjust hue
        background_ctx.globalCompositeOperation = "hue";
        background_ctx.fillStyle = "hsl(" + hue + ",1%, 50%)";
        background_ctx.fillRect(0, 0, c.width, c.height);
    }
    
    // clip
    background_ctx.globalCompositeOperation = "destination-in";
    background_ctx.drawImage(img, 0, 0, c.width, c.height);
    background_ctx.drawImage(img2, 0, 0, c.width, c.height);

    // reset comp. mode to default
    background_ctx.globalCompositeOperation = "source-over";
}

rHue.oninput = rSat.oninput = rL.oninput = cColor.onchange = render;