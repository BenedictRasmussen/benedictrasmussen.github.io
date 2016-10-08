///Camera initial conditions and constraints
var cameraX = 0;
var cameraY = 0;
var cameraScale = 10;
var cameraScaleFactor = 1.1;

///Helper code for the camera
var lastX = 0;
var lastY = 0;

var cameraRotateY = 0;

///Middle mouse wheel handling https://www.sitepoint.com/html5-javascript-mouse-wheel/
document.addEventListener("mousewheel", MouseWheelHandler, false);
// Firefox
document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);

function MouseWheelHandler(e) {
    if((e.wheelDelta || -e.detail) > 0)
        cameraRotateY += .1;
    else
        cameraRotateY -= .1;
}

document.onkeyup = function(e){
    if(e.key == "PageUp")
        cameraScale *= cameraScaleFactor;
    if(e.key == "PageDown")
        cameraScale /= cameraScaleFactor;
		
	if(e.key == "w")
		cameraY += 1;
	if(e.key == "s")
		cameraY -= 1;
	if(e.key == "a")
		cameraX += 1;
	if(e.key == "d")
		cameraX -= 1;
		
	if(e.key == "q")
		cameraRotateY += 1;
	if(e.key == "e")
		cameraRotateY -= 1;
		
};

document.getElementById("glcanvas").onmousedown = function(e){

    lastX = e.pageX;
    lastY = e.pageY;

    document.onmousemove = function(e){
        updateCamera(e.pageX - lastX, e.pageY - lastY);
        lastX = e.pageX;
        lastY = e.pageY;
    };
    this.onmouseup = function(){
        document.onmousemove = null;
    }
};


function updateCamera(deltaX, deltaY)
{
    cameraX += deltaX / 20;
    cameraY -= deltaY / 20;
}

