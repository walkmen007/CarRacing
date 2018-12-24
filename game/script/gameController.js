
var carObj;

function colorText(text, textX, textY, color){
  context.font = "10px Arial";
  context.fillStyle=color;
  context.fillText(text, textX, textY);
}

function fillGrid(){
	//console.log("fill GRID");
	for(let col = 0; col<MAX_COLOUM; col++){
		var count=0;
		for(let row=0;row<MAX_ROW;row++){
			let index = col*MAX_ROW+row;
			count++;
			if(GRID[index]){
				drawRect(row*CELL_WIDTH,col*CELL_HEIGHT, CELL_WIDTH-1,CELL_HEIGHT-1,'#4267B2');
				colorText(index, row*CELL_WIDTH+8,col*CELL_HEIGHT+10, 'white');
			}
		}
	}
}

function init(){
	drawRect(0,0, width,height, bgColor);
	fillGrid();
    carObj = new RacingCar(60,456,10);
}

function checkForCollision(dir,x,y){
  console.log("X Y original",x,y,);
  var xfactor = dir==3?-10-speed: dir==1?10:0;
  var yfactor = dir==0?-10-speed: dir==2?10:0;
  x = x+xfactor;
  y = y+yfactor;
  var rowX = Math.floor(x/CELL_WIDTH);
  var colY = Math.floor(y/CELL_HEIGHT)*32;
  var cellIndex = rowX + colY;
  console.log("cell index",x,y,rowX, colY, cellIndex,GRID[cellIndex]);
  return GRID[cellIndex]?true:false;
}

function RacingCar(x,y,r){
   this.moveX =x;
   this.moveY =y;
   this.radius = r;
   this.createCircle = function(){
		createCircle(this.moveX,this.moveY, this.radius,'white');
   }
   this.createCircle();
   this.moveCar = function(dir, isMove){
   	    if(isMove){
   	       this.xFactor = dir==0||dir==2 ?0 : dir ==1?1 : -1;
		   this.yFactor = dir==1||dir==3 ?0 : dir ==0?-1 : 1;
		   console.log("this, x,y", this.xFactor, this.yFactor);
		   var isCollision = checkForCollision(dir, this.moveX, this.moveY);
		      if(!isCollision){
		      	if(dir == 0 || dir ==2){
		            this.moveY += this.yFactor*speed;
		      	}else{
		      		this.moveX  += this.xFactor*speed;
		      	}
		      }
   	    }

   	    this.createCircle(); 
	    colorText(this.moveX +' , '+this.moveY, this.moveX,this.moveY-20, 'white');

	}
}

function handleKeyPress(e){
	console.log(e.keyCode);
  	if(e.keyCode === 108){
  		carObj.moveCar(0, true);
  	}
  	else if(e.keyCode === 46){
  		carObj.moveCar(1, true);
  	}
  	else if(e.keyCode === 47){
  		carObj.moveCar(2, true);
  	}
  	else if(e.keyCode === 44){
  		carObj.moveCar(3, true);
  	}else{
  		//console.log("Wrong KEy Press");
  	}
}

function drawAll(){
	drawRect(0,0, width,height, bgColor);
	fillGrid();
	carObj.moveCar()    
}
	
window.onload = function(){
  canvas = document.getElementById('carRacing');
  context = canvas.getContext('2d');
  init();
  setInterval(drawAll, 1000/30);
  document.addEventListener('keypress', handleKeyPress);
  
}