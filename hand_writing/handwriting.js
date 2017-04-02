var canvasWidth=Math.min(800,$(window).width()-20);
var canvasHeight=canvasWidth;

var strokeColor="black";
var isMouseDown=false;
var lastLocation={x:0,y:0};
var lastTimestamp=0;
var lastLineWidth=-1;

var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");


canvas.width=canvasWidth;
canvas.height=canvasHeight;

drawGrid();


$("#controller").css("width",canvasWidth+"px");

$("#clear_btn").click(function(e){
	ctx.clearRect(0,0,canvasWidth,canvasHeight);
	drawGrid();

});

$(".color_btn").click(function(e){
		$(".color_btn").removeClass("color_btn_selected");
		$(this).addClass("color_btn_selected");//为当前按钮添加color_btn_selected
		strokeColor=$(this).css("background-color");
});




function beginStroke(point){

	isMouseDown=true;
	lastLocation=windowToCanvas(point.x,point.y)//canvas中的坐标值
	// alert(location.x+","+location.y)
	lastTimestamp=new Date().getTime();
}

function endStroke(){
	isMouseDown=false;
}
function moveStroke(point){


		
		var currentLocation=windowToCanvas(point.x,point.y);
		var s=calculateDistance(currentLocation,lastLocation);
		var currentTimestamp=new Date().getTime();
		var t=currentTimestamp-lastTimestamp;

		var autoLineWidth=calculateLineWidth(t,s);
		//draw
		ctx.beginPath();
		ctx.moveTo(lastLocation.x,lastLocation.y);
		ctx.lineTo(currentLocation.x,currentLocation.y);

		ctx.strokeStyle=strokeColor;
		ctx.lineWidth=autoLineWidth;
		ctx.lineCap="round";
		ctx.lineJoin="round";
		ctx.stroke();

		lastLocation=currentLocation;
		lastTimestamp=currentTimestamp;
		lastLineWidth=autoLineWidth;
}






canvas.onmousedown=function(e){
	e.preventDefault();//阻止默认的事件响应
	beginStroke({x:e.clientX,y:e.clientY})
};

canvas.onmouseup=function(e){
	e.preventDefault();
	endStroke();
};

canvas.onmouseout=function(e){
	e.preventDefault();
	endStroke();
};

canvas.onmousemove=function(e){
	e.preventDefault();
		if(isMouseDown){

			moveStroke({x:e.clientX,y:e.clientY});
	
	}
};

canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	touch=e.touches[0];
	beginStroke({x:touch.pageX,y:touch.pageY});
});

canvas.addEventListener('touchmove',function(e){
	e.preventDefault();
	if (isMouseDown) {
		touch=e.touches[0];
		moveStroke({x:touch.pageX,y:touch.pageY});
	}
	
});

canvas.addEventListener('touchend',function(e){
	e.preventDefault();
	endStroke();
});


function calculateLineWidth(t,s){

	var v=s/t;

	var resultLineWidth;
	if (v<=0.1)
		{resultLineWidth=30;}
	else if(v>=10)
		{resultLineWidth=1;}

	else 
		{resultLineWidth=30-(v-0.1)/(10-0.1)*(30-1)}

	if(lastLineWidth==-1)
		{return resultLineWidth}
	else
		return lastLineWidth*2/3+resultLineWidth*1/3;
}




function  calculateDistance(loc1,loc2){
	return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x)+(loc1.y-loc2.y)*(loc1.y-loc2.y))
}

//获取鼠标在canvas画布上的焦点坐标
function windowToCanvas(x,y){
	var bbox=canvas.getBoundingClientRect();
	return{x:Math.round(x-bbox.left),y:Math.round(y-bbox.top)}
}


//绘制写字方格
function drawGrid(){
	ctx.save();
	ctx.strokeStyle="rgb(230,11,9)"
	//绘制边框
	ctx.beginPath();
	ctx.moveTo(3,3);
	ctx.lineTo(canvasWidth-3,3);
	ctx.lineTo(canvasWidth-3,canvasHeight-3);
	ctx.lineTo(3,canvasHeight-3);
	ctx.closePath();


	ctx.lineWidth=6;
	ctx.stroke();


	// 绘制米子格
	ctx.beginPath();
	ctx.moveTo(0,0);
	ctx.lineTo(canvasWidth,canvasHeight);

	ctx.moveTo(canvasWidth,0);
	ctx.lineTo(0,canvasHeight);

	ctx.moveTo(canvasWidth/2,0);
	ctx.lineTo(canvasWidth/2,canvasHeight);

	ctx.moveTo(0,canvasHeight/2);
	ctx.lineTo(canvasWidth,canvasHeight/2);

	ctx.lineWidth=1;
	ctx.stroke();
	ctx.restore();
}




