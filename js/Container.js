/**
 * Created by AlexZ33 on 2017/08/12.
 */

 (function () {
 	cce.Container = function (canvas) {
    	if(canvas == null) {
    		throw Error ("canvas can't be null" );
    	}

    	this.canvas = canvas;
    	this.context = this.canvas.getContext("2d");

    	this._childs = [];
    };

    cce.Container.prototype = {
    	constructor:cce.Container,
    	addChild: function(displayObject){
          displayObject.canvas = this.canvas;
          displayObject.context = this.context;
          this._childs.push(displayObject);
    	},

    	draw:function() {

    	},
    	enableMouse: function() {

    	},
    	enableClick: function() {

    	},



    	_handleMouseMove: function (event, container) {
		    // 这里传入container 主要是为了使用 _windowToCanvas函数
		    var point = container._windowToCanvas(event.clientX, event.clientY);
		    // 获得绑定了 mouseover, mousemove, mouseout 事件的元素对象
		    var array = cce.EventManager.getTargets("mouse");
		    if (array != null) {
		        array.search(point);
		        // 鼠标所在的元素
		        var selectedElements = array.selectedElements;
		        // 鼠标不在的元素
		        var unSelectedElements = array.unSelectedElements;
		        selectedElements.forEach(function (ele) {
		            if (ele.hasListener("mousemove")) {
		                var event = new cce.Event(point.x, point.y, "mousemove", ele);
		                ele.fire("mousemove", event);
		            }
		            // 之前不在区域内，现在在了，说明鼠标进入了
		            if (!ele.inBounds) {
		                ele.inBounds = true;
		                if (ele.hasListener("mouseover")) {
		                    var event = new cce.Event(point.x, point.y, "mouseover", ele);
		                    ele.fire("mouseover", event);
		                }
		            }
		        });
		        unSelectedElements.forEach(function (ele) {
		            // 之前在区域内，现在不在了，说明鼠标离开了
		            if (ele.inBounds) {
		                ele.inBounds = false;
		                if (ele.hasListener("mouseout")) {
		                    var event = new cce.Event(point.x, point.y, "mouseout", ele);
		                    ele.fire("mouseout", event);
		                }
		            }
		        });
		    }
		},
    	_handleClick: function (event, target) {

    	},
    	_windowToCanvas: function  (x,y) {
    		
    	}
    }
}());