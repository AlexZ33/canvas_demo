var window_width=1000;
var window_height=500;
var radius=8;

var margin_left=0;
var margin_top=0;

const endTime=new Date(2015,4,29,18,47,52);

var curShowTimeSeconds=0;

var balls=[];
const colors=["#33b5e5","#0099cc","#aa66cc","##9933cc","#99cc00","#ffbb33","#ff8800","#ff4444","#cc0000"];

window.onload=function()
{
	var canvas=document.getElementById('canvas');
	canvas.width=window_width;
	canvas.height=window_height;

	var context=canvas.getContext('2d');
	curShowTimeSeconds=getCurrentShowTime();

	setInterval(function(){
		render(context);
		update();
	},50);
}

function update()
{
	 var nextShowTimeSeconds = getCurrentShowTime();

    var nextHours = parseInt( nextShowTimeSeconds / 3600);
    var nextMinutes = parseInt( (nextShowTimeSeconds - nextHours * 3600)/60 )
    var nextSeconds = nextShowTimeSeconds % 60

    var curHours = parseInt( curShowTimeSeconds / 3600);
    var curMinutes = parseInt( (curShowTimeSeconds - curHours * 3600)/60 )
    var curSeconds = curShowTimeSeconds % 60

    if( nextSeconds != curSeconds ){
        if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( margin_left + 0 , margin_top , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( margin_left + 15*(radius+1) , margin_top , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( margin_left + 39*(radius+1) , margin_top , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( margin_left + 54*(radius+1) , margin_top , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( margin_left + 78*(radius+1) , margin_top , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( margin_left + 93*(radius+1) , margin_top , parseInt(nextSeconds%10) );
        }

        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();
}

function addBalls(x,y,num)
{	
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1)
			{
				var aBall={
					x:x+j*2*(radius+1)+(radius+1),
					y:y+i*2*(radius+1)+(radius+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*6,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
		};
	};
}

function updateBalls()
{
	for (var i = 0; i < balls.length; i++) {
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if (balls[i].y>=window_height-radius) {
			balls[i].y=window_height-radius;
			balls[i].vy=-balls[i].vy*0.75;
		};
		if (balls[i].x>=window_width-radius) {
			//balls[i].x=window_width-radius;
			//balls[i].vx=-balls[i].vx*0.75;
		};
	};
}

function getCurrentShowTime()
{
	var curTime=new Date();
	var ret=endTime.getTime()-curTime.getTime();
	ret=Math.round(ret/1000);
	return ret>=0?ret:0;
}
function render(ctx)
{
	ctx.clearRect(0,0,window_width,window_height);
	var hours=parseInt(curShowTimeSeconds/3600);
	var minites=parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds=parseInt(curShowTimeSeconds%60);

	renderDigit(margin_left,margin_top,parseInt(hours/10),ctx);
	renderDigit(margin_left+15*(radius+1),margin_top,parseInt(hours%10),ctx);
	renderDigit(margin_left+30*(radius+1),margin_top,10,ctx);//冒号
	renderDigit(margin_left+39*(radius+1),margin_top,parseInt(minites/10),ctx);
	renderDigit(margin_left+54*(radius+1),margin_top,parseInt(minites%10),ctx);
	renderDigit(margin_left+69*(radius+1),margin_top,10,ctx);//冒号
	renderDigit(margin_left+78*(radius+1),margin_top,parseInt(seconds/10),ctx);
	renderDigit(margin_left+93*(radius+1),margin_top,parseInt(seconds%10),ctx);

	for (var i = 0; i < balls.length; i++) {
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,radius,0,2*Math.PI,true);
		ctx.closePath();
		ctx.fill();
	};
}

function renderDigit(x,y,num,ctx)
{
	ctx.fillStyle="rgb(0,102,153)";
	for (var i = 0; i < digit[num].length; i++) {
		for (var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j]==1)
			{
				ctx.beginPath();
				ctx.arc(
					x+j*2*(radius+1)+(radius+1),
					y+i*2*(radius+1)+(radius+1),
					radius,
					0,
					2*Math.PI);
				ctx.closePath();

				ctx.fill();
			}
		};
	};
}