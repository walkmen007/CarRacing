function drawRect(x,y, w,h, color){
	//console.log("draw rect");
	context.fillStyle = color;
	context.fillRect(x,y, w,h, color);
}

function createCircle(x,y, r, color){
  context.beginPath();
  context.lineWidth = 2;
  context.fillStyle =  color || 'white';
  context.arc(x, y, r, 0, 2*Math.PI , true);
  context.fill();

}