var canvas;
var ctx;
var w;
var h;

var girlPic =new Image();
var starPic= new Image();
var num=60;
var stars=[];

var lastTime;
var deltaTime;
// 初始化
function init(){
	canvas=document.getElementById("canvas");
	ctx =canvas.getContext("2d");
	drawBackground();

	w=canvas.width;
	h=canvas.height;


	girlPic.src = "http://on891bjlf.bkt.clouddn.com/sunxian/mm10.jpg";
	starPic.src="http://on891bjlf.bkt.clouddn.com/image_sequence/star.png";
	
	//遍历出stars
	for (var i = 0; i < num; i++) {
		
		var obj =new starObj();
		stars.push(obj);
		stars[i].init();
	}

	lastTime=Date.now();
	gameloop();

}


document.body.onload=init;

//动画渲染 刷新canvas画布
function gameloop(){

	window.requestAnimationFrame(gameloop);//两帧之间刷新间隔是根据浏览器性能动态变化的
	
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;



	drawGirl();
	// drawStar();
	drawStars();

}

// 绘制背景
function drawBackground(){
	ctx.beginPath();
	ctx.fillStyle = "#393550";
	ctx.fillRect(0,0,w,h);
}

// 绘制女孩图片
function drawGirl(){
	//drawImage(img,x,y,width,heihgt)
	girlPic.onload=function(){
	ctx.drawImage(girlPic,0,0,w,h);
	}
}


//绘制星星
function drawStar(){
	
	ctx.drawImage(starPic,300,400);
	
}

//定义一个星星的类
//它有x,y的坐标属性  它的原型链上定义了 init和 draw两个方法
var starObj=function(){
	this.x;
	this.y;
	this.picStation;
	this.timer;
	this.xSpeed;
	this.ySpeed;
}

starObj.prototype.update=function(){
	this.x+=this.xSpeed*deltaTime*0.004;
	this.y+=this.ySpeed*deltaTime*0.004;

	//this.x超过范围就init
	if (this.x<10||this.x>500) {
		this.init();
		return;
	}
	//this.y超过范围就init
	if (this.y<200||this.x>650) {
		this.init();
		return;
	}
	this.timer+=deltaTime;
	if(this.timer>50)
	{
		this.picStation+=1;
		this.picStation%=7;
		this.timer=0;
	}
	
}
starObj.prototype.init=function(){
	this.x=Math.random()*500;//Math.random返回的是[0,1)
	this.y=Math.random()*650;
	this.picStation=Math.floor(Math.random()*7);
	this.timer=0;

	this.xSpeed=Math.random()*3-1.5;
	this.ySpeed=Math.random()*3-1.5;
}

starObj.prototype.draw=function(){
	//drawImage(img,sx,sy,swidth,sheight,dx,dy,dwidth,dheight)
	ctx.drawImage(starPic,this.picStation*7,0,7,7,this.x,this.y,7,7);
}

function drawStars(){
	for (var i = 0; i < num; i++) {
		stars[i].update();
		stars[i].draw();


	}
}